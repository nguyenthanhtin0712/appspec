<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Resources\SubjectResource;
use App\Models\Subject;
use App\Models\SubjectPrerequisite;
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
        $subject = Subject::find(841047)->subject_previous->pluck('subject_id');
        echo json_encode($subject);
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
        if ($request->has('subject_preivous')) {
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
        $subjectUpdate = $request->all();
        $subject = Subject::where('subject_id',$id)->firstOrFail();
        $subject->update($subjectUpdate);
        $subjectResource = new SubjectResource($subject);
        return $this->sentSuccessResponse($subjectResource, "Updated subject successfully", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $subject = Subject::where('subject_id',$id)->firstOrFail();
        $subject->subject_isDelete = 1;
        $subject->save();
        $subjectResource = new SubjectResource($subject);
        return $this->sentSuccessResponse($subjectResource, 'Deleted subject successfully', Response::HTTP_OK);
    }
}
