<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangeInfoRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Resources\ProfileResource;
use App\Models\JobHolder;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $studentWithUser = Student::query()
            ->with('major', 'specialty')
            ->leftJoin('users', 'users.user_id', '=', 'students.user_id')
            ->leftJoin('majors', 'students.major_id', '=', 'majors.major_id')
            ->select('students.*', 'users.user_firstname', 'users.user_lastname', 'users.*', 'majors.major_name')
            ->where('students.user_id', $user->user_id)
            ->first();
        if($studentWithUser){
            $studentResource = new ProfileResource($studentWithUser);
            return $studentResource;
        }

        $jobholderWithuser = JobHolder::query()
        ->where('job_holders.user_id', $user->user_id)->first();
        if($jobholderWithuser){
            return $jobholderWithuser;
        }
        return $user;
    }

    public function change_password(ChangePasswordRequest $request)
    {
        $user = $request->user();
        if (Hash::check($request->old_password, $user->user_password)) {
            $user->user_password = Hash::make($request->password);
            $user->save();
            return $this->sentSuccessResponse(null, "Passowrd successfully updated", 200);
        } else {
            return $this->sentErrorResponse(null, "Old passsword does not matched", 400);
        }
    }

    public function change_info(ChangeInfoRequest $request)
    {
        $user = $request->user();
        $user->user_email = $request->user_email;
        $user->user_phone = $request->user_phone;
        $user->save();
        return $this->sentSuccessResponse($user, "Change information success", 200);
    }
}
