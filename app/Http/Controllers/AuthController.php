<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    // Register and create user, validate and return the new user instance inside the response
    public function store(Request $request)
    {

        $data = $request->validate([
            'name' => ['required', 'min:5'],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => 'bail|required|confirmed|min:8'
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
           'user' => $user,
           'token' => $token
        ]);
    }

    // Login an existing user
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email|string|exists:users,email',
            'password' => 'required',

        ]);

        if (!Auth::attempt($credentials)) {
            return response([
                'error' => 'The email/password combination does not exist'
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }
}
