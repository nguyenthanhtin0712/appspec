<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function change_password(ChangePasswordRequest $request)
    {
        $user = $request->user();
        if (Hash::check($request->old_password, $user->user_password)) {
            $user->user_password = Hash::make($request->password);
            $user->save();
            return $this->sentSuccessResponse('', "Passowrd successfully updated", 200);
        } else {
            return $this->sentErrorResponse('', "Old passsword does not matched", 400);
        }
    }
}
