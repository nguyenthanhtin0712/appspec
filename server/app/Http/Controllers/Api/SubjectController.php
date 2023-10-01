<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Resources\Collection;
use App\Http\Resources\SubjectResource;
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
            $subjects = $subjects->paginate($perPage ?? 10);
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
}
