<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $v = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($v->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validación fallida',
                'errors' => $v->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Credenciales inválidas',
                'details' => 'El email o password no son correctos'
            ], 401);
        }

        $token = Str::random(30);
        $user->api_token = $token;
        $user->save();

        // Siempre JSON con status 200 para API
        return response()->json([
            'status' => 'success',
            'message' => 'Sesión iniciada correctamente',
            'token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ]
        ], 200);
    }

    public function logout(Request $request)
    {
        $token = null;

        // check header
        $authHeader = $request->header('Authorization');
        if ($authHeader && preg_match('/Bearer\s+(.*)/', $authHeader, $m)) {
            $token = $m[1];
        }

        // fallback to input
        if (! $token) {
            $token = $request->input('token');
        }

        if ($token) {
            $user = User::where('api_token', $token)->first();
            if ($user) {
                $user->api_token = null;
                $user->save();
                
                return response()->json([
                    'status' => 'success',
                    'message' => 'Sesión cerrada exitosamente',
                    'details' => 'El token ha sido destruido. Requiere token nuevamente para acceder a los recursos.'
                ], 200);
            }
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Token no proporcionado o inválido',
            'details' => 'No se pudo cerrar la sesión'
        ], 400);
    }
}
