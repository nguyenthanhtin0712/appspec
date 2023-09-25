<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Collection;
use App\Models\OpenClassSubject;
use App\Models\OpenClassSubjectCourse;
use App\Models\OpenclassTime;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SubjectScheduleController extends Controller
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
        $subjects = OpenclassTime::has('subjects');

        if ($query) {
            $subjects->where(function ($queryBuilder) use ($query) {
                $queryBuilder->orWhere("openclass_time_year", "LIKE", "%$query%")
                    ->orWhere("openclass_time_semester", "LIKE", "%$query%");
            });
        }

        if ($id) {
            $subjects->where('subject_id', $id);
        }
        if ($sortBy) {
            $subjects->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $subjects->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }

        if ($all && $all == true) {
            $subjects = $subjects->get();
        } else {
            if ($perPage) {
                $subjects = $subjects->paginate($perPage);
            } else {
                $subjects = $subjects->paginate(10);
            }
        }


        $subjectCollection = new Collection($subjects);
        return $this->sentSuccessResponse($subjectCollection, "Get data success", Response::HTTP_OK);
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
        $subjects = $request->input('subjects');

        $openClassTime = OpenclassTime::where('openclass_time_semester', $openclass_time_semester)
            ->where('openclass_time_year', $openclass_time_year)->first();

        if (!$openClassTime) {
            $openClassTime = OpenclassTime::create([
                'openclass_time_semester' => $openclass_time_semester,
                'openclass_time_year' => $openclass_time_year
            ]);
        } else {
            OpenClassSubject::where('openclass_time_id', $openClassTime->openclass_time_id)
                ->delete();
        }

        foreach ($subjects as $subject) {
            $openClassSubjectCreated = OpenClassSubject::create([
                'openclass_time_id' => $openClassTime->openclass_time_id,
                'subject_id' => $subject['subject_id'],
                'openclass_totalgroup' => $subject['openclass_totalgroup'],
                'openclass_totalstudent' => $subject['openclass_totalstudent'],
            ]);

            $courses = $this->handleCourseString($subject['openclass_course']);
            foreach ($courses as $course) {
                OpenClassSubjectCourse::create([
                    'openclass_subject_id' => $openClassSubjectCreated->openclass_subject_id,
                    'openclass_subject_for_course' => $course
                ]);
            }
        }
        return $this->sentSuccessResponse($openClassTime, 'Create subject schedule successfully', Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $openClassTime = OpenclassTime::findOrFail($id);
        $subjectSchedule = OpenClassSubject::where('openclass_time_id', $openClassTime->openclass_time_id)
            ->leftJoin('subjects', 'subjects.subject_id', '=', 'openclass_subject.subject_id')
            ->select("openclass_subject_id", "subjects.subject_id", "subject_LT", "academic_field_id", "subject_TH", "subject_BT", "openclass_totalgroup", "openclass_totalstudent", "subject_name", "subject_credit")
            ->get();

        $subjects = $subjectSchedule->map(function ($subject) {
            $course = OpenClassSubjectCourse::where('openclass_subject_id', $subject->openclass_subject_id)
                ->get()
                ->map(function ($course) {
                    return $course->openclass_subject_for_course;
                });
            $subject->openclass_subject_for_course = implode(', ', $course->toArray());
            return $subject;
        });

        $result = [
            "infomation" => $openClassTime,
            "subjects" => $subjects
        ];

        return $this->sentSuccessResponse($result, "Get subject schedule successfully", Response::HTTP_OK);
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
        OpenClassSubject::where('openclass_time_id', $id)->delete();
        return $this->sentSuccessResponse($openClassTime, 'Deleted subject schedule successfully', Response::HTTP_OK);
    }

    public function handleCourseString($string)
    {
        $result = [];
        if (trim($string) == "ALL" || $string == "") {
            array_push($result, $string);
        } else {
            $parts = explode("+", $string);
            for ($i = 0; $i < count($parts); $i++) {
                $parts[$i] = trim($parts[$i]);
                if (is_numeric($parts[$i])) {
                    $parts[$i] .= "CNTT";
                }
            }
            $result = $parts;
        }
        return $result;
    }
}
