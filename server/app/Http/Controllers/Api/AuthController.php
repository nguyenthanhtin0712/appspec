<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Helpers\Helper;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\LoginResource;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;


class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        $user = User::where('user_email', $credentials['email'])->first();
        if ($user && Hash::check($credentials['password'], $user->user_password)) {
            Auth::login($user);
            return new LoginResource($user);
        }
        $student = Student::where('student_code', $credentials['email'])->first();
        if ($student) {
            $user = User::find($student->user_id);
            if ($user && Hash::check($credentials['password'], $user->user_password)) {
                Auth::login($user);
                return new LoginResource($user);
            }
        }
        return Helper::sendError("Tên đăng nhập hoặc mật khẩu không đúng", 401);
    }

    public function logout()
    {
        $accessToken = Auth::user()->token();
        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();
        return response()->json(['message' => 'Logout success']);
    }

    public function refreshToken(Request $request)
    {
        $user = Auth::user();
        $token = $user->createToken('user')->accessToken;
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
}
