<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RegisterOpenClass;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RegisterOpenClassController extends Controller
{
    public function register(Request $request)
    {
        $student_code = $request->user()->student->student_code;
        $semester = $request->input('semester');
        $year = $request->input('year');
        $subject_id = $request->input('subject_id');

        $existingRegistration = RegisterOpenClass::where('student_code', $student_code)
            ->where('semester', $semester)
            ->where('year', $year)
            ->where('subject_id', $subject_id)
            ->first();

        if (!$existingRegistration) {
            $result = RegisterOpenClass::create([
                ...$request->all(),
                "student_code" => $student_code
            ]);
            return $this->sentSuccessResponse($result, 'Created successfully', Response::HTTP_OK);
        }
        return $this->sentErrorResponse($existingRegistration, 'Bạn đã đăng ký môn học ở học kỳ này', Response::HTTP_BAD_REQUEST);
    }


    public function history(Request $request)
    {
        $student_code = $request->user()->student->student_code;
        $list = RegisterOpenClass::where('student_code', $student_code)
            ->leftJoin('subjects', 'subjects.subject_id', 'register_open_class.subject_id')
            ->select('id', 'semester', 'year', 'subjects.subject_id', 'subject_name')
            ->get();
        return response()->json($list, 200);
    }

    public function statistical(Request $request)
    {
        $semester = $request->input('semester');
        $year = $request->input('year');

        $query = RegisterOpenClass::leftJoin('subjects', 'subjects.subject_id', '=', 'register_open_class.subject_id')
            ->selectRaw('register_open_class.subject_id, subjects.subject_name, COUNT(*) as student_count')
            ->groupBy('register_open_class.subject_id', 'subject_name');

        if ($semester !== null) {
            $query->where('register_open_class.semester', $semester);
        }

        if ($year !== null) {
            $query->where('register_open_class.year', $year);
        }

        $results = $query->get();

        return $this->sentSuccessResponse($results, 'Get data success', Response::HTTP_OK);;
    }
}
