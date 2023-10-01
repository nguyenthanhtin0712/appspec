<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OpenclassTime;
use App\Models\WarnedDismissedStudent;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class WarnedDissmissedStudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $openclass_time_semester = $request->input('openclass_time_semester');
        $openclass_time_year = $request->input('openclass_time_year');
        $students = $request->input('students');

        $openClassTime = OpenclassTime::firstOrCreate(
            [
                'openclass_time_semester' => $openclass_time_semester,
                'openclass_time_year' => $openclass_time_year
            ]
        );

        WarnedDismissedStudent::where('openclass_time_id', $openClassTime->openclass_time_id)->delete();

        foreach ($students as $student) {
            WarnedDismissedStudent::create([
                "openclass_time_id" => $openClassTime->openclass_time_id,
                ...$student
            ]);
        }

        return $this->sentSuccessResponse($openClassTime, 'Data saved successfully', Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $sortBy = $request->input('sortBy');
        $sortOrder = $request->input('sortOrder', 'asc');
        $filters = $request->input('filters');

        $students = WarnedDismissedStudent::where('openclass_time_id', $id)
            ->join('students', 'warned_dismissed_student.student_id', '=', 'students.student_code')
            ->join('users', 'students.user_id', '=', 'users.user_id')
            ->select(
                'warned_dismissed_student.*',
                'students.student_code',
                'students.student_class',
                'students.major_id',
                'students.student_course',
                'users.user_firstname',
                'users.user_lastname',
                'users.user_birthday'
            )
            ->get();



        // $students = WarnedDismissedStudent::where('openclass_time_id', $id)
        //     ->whereDoesntHave('student')
        //     ->select('student_id')
        //     ->get();
        echo json_encode($students);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $openClassTime = OpenclassTime::findOrFail($id);
        WarnedDismissedStudent::where('openclass_time_id', $id)->delete();
        return $this->sentSuccessResponse($openClassTime, 'Deleted successfully', Response::HTTP_OK);
    }
}
