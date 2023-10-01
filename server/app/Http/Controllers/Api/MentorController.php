<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMentorRequest;
use App\Models\Mentor;
use App\Models\Student;
use Illuminate\Http\Request;

class MentorController extends Controller
{
    
    public function addMentorStudent(StoreMentorRequest $request)
    {
        $user = $request->user();
        $mentor_name = $request->input('mentor_name');
        $mentor_email = $request->input('mentor_email');
        $mentor_phone = $request->input('mentor_phone');
        $mentor = Mentor::firstOrCreate([
            'mentor_name' => $mentor_name,
            'mentor_email' => $mentor_email,
            'mentor_phone' => $mentor_phone,
        ]);
        $student = Student::where('user_id', $user->user_id)->update([
            'mentor_code' => $mentor->mentor_code
        ]);
        $student = Student::where('user_id', $user->user_id)->first();
        return $this->sentSuccessResponse($student, "Add mentor success", 200);
    }

}
