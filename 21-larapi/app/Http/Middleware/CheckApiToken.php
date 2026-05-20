<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class CheckApiToken
{
    public function handle(Request $request, Closure $next)
    {
        $token = null;

        // Buscar token en header Authorization: Bearer <token>
        $authHeader = $request->header('Authorization');
        if ($authHeader && preg_match('/Bearer\s+(.*)/', $authHeader, $m)) {
            $token = $m[1];
        }

        // Fallback: buscar en campo 'token' del request (form o JSON)
        if (!$token) {
            $token = $request->input('token');
        }

        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token requerido - proporcione un token válido',
                'details' => 'Envíe el token en el header Authorization: Bearer <token> o como parámetro token'
            ], 401);
        }

        $user = User::where('api_token', $token)->first();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token inválido o expirado',
                'details' => 'El token proporcionado no existe o ha sido invalidado. Por favor, inicie sesión nuevamente.'
            ], 401);
        }

        // Guardar el usuario en el request para uso posterior
        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        return $next($request);
    }
}
