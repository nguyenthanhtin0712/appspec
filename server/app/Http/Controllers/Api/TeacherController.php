<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Http\Resources\Collection;
use App\Http\Resources\TeacherResource;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    protected $teacher;

    public function __construct(Teacher $teacher)
    {
        $this->teacher = $teacher;
    }

    public function index(Request $request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $sortBy = $request->input('sortBy');
        $sortOrder = $request->input('sortOrder', 'asc');
        $filters = $request->input('filters');
        $teachers = $this->teacher->query()
        ->leftJoin('specialties', 'teachers.teacher_spec', '=', 'specialties.specialty_id');
        $teachers->where("teacher_isDelete", "0");
        if ($query) {
            $teachers->where("teacher_name", "LIKE", "%$query%");
        }
        if ($id) {
            $teachers->where('teacher_id', $id);
        }
        if ($sortBy) {
            $teachers->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $teachers->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }

        if($all && $all==true){
            $teachers = $teachers->get();
        } else {
            if ($perPage) {
                $teachers = $teachers->paginate($perPage);
            } else {
                $teachers = $teachers->paginate(10);
            }
        }
        $teacherCollection = new Collection($teachers);
        return $this->sentSuccessResponse($teacherCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTeacherRequest $request)
    {
        $dataCreate = $request->all();
        $dataCreate['teacher_isDelete'] = 0;
        $teacher = $this->teacher->create($dataCreate);
        $teacherResource = new TeacherResource($teacher);
        return $this->sentSuccessResponse($teacherResource, "Create teacher success", Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $teacher = $this->teacher->where('teacher_id', $id)->firstOrFail();
        if ($teacher->teacher_isDelete == 1) {
            return response()->json([
                'message' => 'teacher is deleted',
            ], 404);
        } else {
            $teacherResoure = new TeacherResource($teacher);
            return $this->sentSuccessResponse($teacherResoure, "Get teacher success", Response::HTTP_OK);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTeacherRequest $request, $id)
    {
        $teacher = $this->teacher->where('teacher_id', $id)->firstOrFail();
        $dataUpdate = $request->all();
        $teacher->update($dataUpdate);
        $teacherResource = new TeacherResource($teacher);
        return $this->sentSuccessResponse($teacherResource, "Update teacher success", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $teacher = $this->teacher->where('teacher_id', $id)->firstOrFail();
        $teacher->teacher_isDelete = 1;
        $teacher->save();
        $teacherResoure = new TeacherResource($teacher);
        return $this->sentSuccessResponse($teacherResoure, "Delete user success", Response::HTTP_OK);
    }
}
