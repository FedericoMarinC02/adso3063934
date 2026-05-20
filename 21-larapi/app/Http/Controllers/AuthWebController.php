<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\User;

class AuthWebController extends Controller
{
    public function login(Request $request)
    {
        $v = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($v->fails()) {
            return back()->withErrors($v)->withInput();
        }

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return back()->withErrors(['email' => 'Las credenciales no coinciden.'])->withInput();
        }

        $token = Str::random(60);
        $user->api_token = $token;
        $user->save();

        return redirect()->route('auth.logout.view')->with('api_token', $token);
    }

    public function logout(Request $request)
    {
        $token = $request->input('token') ?? $request->session()->pull('api_token');

        if ($token) {
            $user = User::where('api_token', $token)->first();
            if ($user) {
                $user->api_token = null;
                $user->save();
            }
        }

        return redirect()->route('auth.login.view')->with('status', 'Sesión cerrada');
    }
}
