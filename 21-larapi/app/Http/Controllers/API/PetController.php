<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Pet;
use Illuminate\Http\Request;

class PetController extends Controller
{
    public function index()
    {
        $pets = Pet::all();

        if ($pets->isEmpty()) {
            return response()->json(['message' => 'No pets found 🐶'], 404);
        } else {
            return response()->json([
                'mesagge' => 'Successfull Query 🐶',
                'pets' => $pets,
            ], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validación correcta
            $validated = $request->validate([
                'name' => 'required|string',
                'kind' => 'required|string',
                'weight' => 'required|numeric',
                'age' => 'required|numeric',
                'breed' => 'required|string',
                'location' => 'required|string',
                'description' => 'required|string',
            ]);

            // Crear el registro si todo está bien
            $pet = Pet::create($validated);

            return response()->json([
                'message' => 'Pet created successfully 🐶',
                'pet' => $pet,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {

            // Responder error de validación
            return response()->json([
                'message' => 'Error in the request 🐶',
                'errors' => $e->errors(),
            ], 400);
        }
    }

    // return response()->json([
    //     'message' => 'Successful Query 🐶',
    //     'request' => $request->all(),
    // ], 200);

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $pet = Pet::find($request->id);
        if ($pet) {
            return response()->json([
                'message' => 'Successfull Query 🐶',
                'pet' => $pet,
            ], 200);
        } else {
            return response()->json(['error' => 'Pet not found 🐾'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, string $id)
{
    $pet = Pet::find($id);

    if (!$pet) {
        return response()->json([
            'error' => 'Pet not found 🐾'
        ], 404);
    }

    $validated = $request->validate([
        'name'        => 'sometimes|string',
        'kind'        => 'sometimes|string',
        'weight'      => 'sometimes|numeric',
        'age'         => 'sometimes|numeric',
        'breed'       => 'sometimes|string',
        'location'    => 'sometimes|string',
        'description' => 'sometimes|string',
        'status'      => 'sometimes|string',
        'active'      => 'sometimes|boolean',
    ]);

    $pet->update($validated);

    return response()->json([
        'message' => 'Pet updated successfully 🐶',
        'pet' => $pet,
    ], 200);
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pet = Pet::find($id); // Se usa $id correctamente

        if ($pet) {

            if ($pet->delete()) {
                return response()->json([
                    'message' => 'Pet was successfully deleted! 🐶',
                    'pet' => $pet,
                ], 200);
            }
        }

        return response()->json([
            'error' => 'Pet not found 🐾',
        ], 404);
    }
}
