<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of all users.
     * Solo admin y cliente pueden ver el listado.
     */
    public function index(Request $request)
    {
        try {
            $user = $request->user();

            // Validar que el usuario esté autenticado
            if (!$user) {
                return response()->json([
                    'message' => 'Unauthorized 🚫',
                    'error' => 'User not authenticated'
                ], 401);
            }

            $users = User::all();

            if ($users->isEmpty()) {
                return response()->json([
                    'message' => 'No users found 👥',
                ], 404);
            }

            return response()->json([
                'message' => 'Successful Query 👥',
                'users' => $users,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error retrieving users 👥',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created user in storage.
     * Solo admin puede crear usuarios.
     */
    public function store(Request $request)
    {
        try {
            $user = $request->user();

            // Validar que el usuario esté autenticado
            if (!$user) {
                return response()->json([
                    'message' => 'Unauthorized 🚫',
                    'error' => 'User not authenticated'
                ], 401);
            }

            // Validar que sea admin
            if ($user->role !== 'admin') {
                return response()->json([
                    'message' => 'Forbidden 🚫',
                    'error' => 'Only admins can create users'
                ], 403);
            }

            // Validación correcta
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|unique:users',
                'password' => 'required|string|min:8',
                'role' => 'required|in:admin,cliente',
            ]);

            // Encriptar la contraseña
            $validated['password'] = Hash::make($validated['password']);

            // Crear el registro
            $newUser = User::create($validated);

            return response()->json([
                'message' => 'User created successfully 👥',
                'user' => $newUser,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Error in the request 👥',
                'errors' => $e->errors(),
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating user 👥',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified user.
     * Solo admin y cliente pueden ver usuarios.
     */
    public function show(Request $request, string $id)
    {
        try {
            $user = $request->user();

            // Validar que el usuario esté autenticado
            if (!$user) {
                return response()->json([
                    'message' => 'Unauthorized 🚫',
                    'error' => 'User not authenticated'
                ], 401);
            }

            $userToShow = User::find($id);

            if (!$userToShow) {
                return response()->json([
                    'message' => 'User not found 👥',
                    'error' => 'The requested user does not exist'
                ], 404);
            }

            return response()->json([
                'message' => 'Successful Query 👥',
                'user' => $userToShow,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error retrieving user 👥',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified user in storage.
     * Solo admin puede editar usuarios.
     */
    public function update(Request $request, string $id)
    {
        try {
            $user = $request->user();

            // Validar que el usuario esté autenticado
            if (!$user) {
                return response()->json([
                    'message' => 'Unauthorized 🚫',
                    'error' => 'User not authenticated'
                ], 401);
            }

            // Validar que sea admin
            if ($user->role !== 'admin') {
                return response()->json([
                    'message' => 'Forbidden 🚫',
                    'error' => 'Only admins can update users'
                ], 403);
            }

            $userToUpdate = User::find($id);

            if (!$userToUpdate) {
                return response()->json([
                    'message' => 'User not found 👥',
                    'error' => 'The user to update does not exist'
                ], 404);
            }

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|string|email|unique:users,email,' . $id,
                'password' => 'sometimes|string|min:8',
                'role' => 'sometimes|in:admin,cliente',
            ]);

            // Encriptar la contraseña si se proporciona
            if (isset($validated['password'])) {
                $validated['password'] = Hash::make($validated['password']);
            }

            $userToUpdate->update($validated);

            return response()->json([
                'message' => 'User updated successfully 👥',
                'user' => $userToUpdate,
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Error in the request 👥',
                'errors' => $e->errors(),
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating user 👥',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified user from storage.
     * Solo admin puede eliminar usuarios.
     */
    public function destroy(Request $request, string $id)
    {
        try {
            $user = $request->user();

            // Validar que el usuario esté autenticado
            if (!$user) {
                return response()->json([
                    'message' => 'Unauthorized 🚫',
                    'error' => 'User not authenticated'
                ], 401);
            }

            // Validar que sea admin
            if ($user->role !== 'admin') {
                return response()->json([
                    'message' => 'Forbidden 🚫',
                    'error' => 'Only admins can delete users'
                ], 403);
            }

            $userToDelete = User::find($id);

            if (!$userToDelete) {
                return response()->json([
                    'message' => 'User not found 👥',
                    'error' => 'The user to delete does not exist'
                ], 404);
            }

            if ($userToDelete->delete()) {
                return response()->json([
                    'message' => 'User was successfully deleted! 👥',
                    'user' => $userToDelete,
                ], 200);
            }

            return response()->json([
                'message' => 'Error deleting user 👥',
                'error' => 'Could not delete the user'
            ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting user 👥',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
