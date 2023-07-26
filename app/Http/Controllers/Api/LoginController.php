<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Helpers\Helper;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\TokenRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\LoginResource;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {   
    $credentials = $request->only('email', 'password');

    $user = User::where('user_email', $credentials['email'])->first();

    if (!$user || !Hash::check($credentials['password'], $user->user_password)) {
        return Helper::sendError("Invalid email or password", 401);
    }

    // Authentication successful
    Auth::login($user);

    // Send response
    return new LoginResource($user);
    }
}
