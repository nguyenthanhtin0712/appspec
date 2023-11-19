<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Helpers\Helper;
use App\Http\Requests\ForgetPassword;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\LoginResource;
use App\Jobs\SendEmail;
use App\Models\PasswordReset;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\URL;

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

    public function forget_password(ForgetPassword $request)
    {
        PasswordReset::where('created_at', '<=', now()->subMinutes(5))->delete();
        $checkSend = PasswordReset::where('email', $request->user_email)->first();
        if($checkSend){
            return $this->sentSuccessResponse("", "Gửi mail thành công", 200);
        }
        $user = User::where('user_email', $request->user_email)->first();
        if ($user) {
            $token = Str::random(40);
            $url = 'http://localhost:3000/auth/forgot-password?token=' . $token;
            $message['url'] = $url;
            $message['subject'] = 'Liên hệ từ trang đăng ký chuyên ngành';
            $message['view'] = 'mails.mail-forgot-password';
            SendEmail::dispatch($message, [
                $request->user_email
            ])->delay(now()->addMinute(0));
            $foget_pass = PasswordReset::create([
                'email' => $request->user_email,
                'token' => $token
            ]);
            return $this->sentSuccessResponse("", "Gửi mail thành công", 200);
        } else {
            return $this->sentErrorResponse('',"Email không tồn tại trong hệ thống", 400);
        }
    }
}
