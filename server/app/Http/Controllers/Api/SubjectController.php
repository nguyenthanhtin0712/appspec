<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Resources\Collection;
use App\Http\Resources\SubjectResource;
use App\Models\OpenClassSubject;
use App\Models\OpenClassSubjectCourse;
use App\Models\OpenclassTime;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SubjectController extends Controller
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
        $subjects = Subject::query();
        $subjects->where("subject_isDelete", "0");
        if ($query) {
            $subjects->where("subject_name", "LIKE", "%$query%");
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

        $subjects->with(['subject_previous']);

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
    public function store(StoreSubjectRequest $request)
    {
        $subjectCreate = $request->except('subject_previous');
        $subject = Subject::create($subjectCreate);
        if ($request->has('subject_previous')) {
            $subject->subject_previous()->attach($request->input('subject_previous'));
        }
        $subjectResource = new SubjectResource($subject);
        return $this->sentSuccessResponse($subjectResource, 'Created subject successfully', Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $subject = Subject::where('subject_id', $id)->where('subject_isDelete', 0)->firstOrFail();
        $subjectResource = new SubjectResource($subject);
        return $this->sentSuccessResponse($subjectResource, 'Displayed subject successfully', Response::HTTP_OK);
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
        $subject = Subject::findOrFail($id);

        $subjectData = $request->except('subject_previous');
        $subject->update($subjectData);

        if ($request->has('subject_previous')) {
            $subjectPreviousIds = $request->input('subject_previous');
            $subject->subject_previous()->sync($subjectPreviousIds);
        } else {
            $subject->subject_previous()->detach();
        }

        $subjectResource = new SubjectResource($subject);
        return $this->sentSuccessResponse($subjectResource, 'Updated subject successfully', Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $subject = Subject::where('subject_id', $id)->firstOrFail();
        $subject->subject_isDelete = 1;
        $subject->save();
        $subjectResource = new SubjectResource($subject);
        return $this->sentSuccessResponse($subjectResource, 'Deleted subject successfully', Response::HTTP_OK);
    }

    public function storeSchedule(Request $request)
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
        return response()->json(['message' => 'Create subject schedule successfully',], 200);
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
