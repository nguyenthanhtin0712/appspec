<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Collection;
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
    public function index(Request $request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $sortBy = $request->input('sortBy');
        $sortOrder = $request->input('sortOrder', 'asc');
        $filters = $request->input('filters');
        $warnedPeriod = OpenclassTime::has('warned_student');

        if ($query) {
            $warnedPeriod->where(function ($queryBuilder) use ($query) {
                $queryBuilder->orWhere("openclass_time_year", "LIKE", "%$query%")
                    ->orWhere("openclass_time_semester", "LIKE", "%$query%");
            });
        }

        if ($id) {
            $warnedPeriod->where('subject_id', $id);
        }
        if ($sortBy) {
            $warnedPeriod->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $warnedPeriod->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }

        if ($all && $all == true) {
            $warnedPeriod = $warnedPeriod->get();
        } else {
            $warnedPeriod = $warnedPeriod->paginate($perPage ?? 10);
        }

        $warnedPeriodCollection = new Collection($warnedPeriod);
        return $this->sentSuccessResponse($warnedPeriodCollection, "Get data success", Response::HTTP_OK);
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
        $majorId = $request->input('majorId');
        $studentCourse = $request->input('studentCourse');
        $studentQuery = $request->input('studentQuery');


        $students = WarnedDismissedStudent::where('openclass_time_id', $id)
            ->join('students', 'warned_dismissed_student.student_code', '=', 'students.student_code')
            ->join('users', 'students.user_id', '=', 'users.user_id')
            ->select(
                'warned_dismissed_student.*',
                'students.student_class',
                'students.major_id',
                'students.student_course',
                'users.user_firstname',
                'users.user_lastname',
                'users.user_birthday'
            );

        if ($majorId) {
            $students->where("students.major_id", $majorId);
        }
        if ($studentCourse) {
            $students->where('students.student_course', $studentCourse);
        }
        if ($studentQuery) {
            $students->where(function ($queryBuilder) use ($studentQuery) {
                $queryBuilder->where("user_lastname", "LIKE", "%$studentQuery%")
                    ->orWhere("user_firstname", "LIKE", "%$studentQuery%")
                    ->orWhere("students.student_code", "LIKE", "%$studentQuery%");
            });
        }

        if ($all && $all == true) {
            $students = $students->get();
        } else {
            $students = $students->paginate($perPage ?? 10);
        }
        //whereDoesntHave('student')

        $studentsCollection = new Collection($students);
        return $this->sentSuccessResponse($studentsCollection, "Get data success", Response::HTTP_OK);
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
