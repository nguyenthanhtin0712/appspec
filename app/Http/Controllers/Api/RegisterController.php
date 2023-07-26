<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RegisterController extends Controller
{
    public function register(RegisterRequest $request){
        $user = User::create([
                'user_email' => $request->user_email,
                'user_firstname' => $request->user_firstname,
                'user_lastname' => $request->user_lastname,
                'user_phone' => $request->user_phone,
                'user_avatar' => $request->user_avatar,
                'user_password' => bcrypt($request->user_password),
                'user_gender' => $request->user_gender,
                'user_status' => $request->user_status,
                'user_birthday' => $request->user_birthday,
        ]);
    
        $user_role = Role::where(['name' => 'users'])->first();

        if($user_role){
            $user->assignRole($user_role);
        }

        return new UserResource($user);
    }
}
