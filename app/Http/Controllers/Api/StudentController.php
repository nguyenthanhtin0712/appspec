<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddFileStudentRequest;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\Collection;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $student;

    public function __construct(Student $student)
    {
        $this->student = $student;
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
        $students = $this->student->query();
        $students = $this->student->query()
        ->leftJoin('users', 'students.user_id', '=', 'users.user_id')
        ->leftJoin('majors', 'students.major_id', '=', 'majors.major_id')
        ->select('students.*', 'users.user_firstname', 'users.user_lastname', 'users.user_birthday','users.user_gender','majors.major_name');
        $students->where("student_isDelete", "0");
        if ($query) {
            $students->where("student_code", "LIKE", "%$query%");
        }
        if ($id) {
            $students->where('user_id', $id);
        }
        if ($sortBy) {
            $students->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $students->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }
        if($all && $all==true){
            $students = $students->get();
        } else {
            if ($perPage) {
                $students = $students->paginate($perPage);
            } else {
                $students = $students->paginate(10);
            }
        }
        $studentCollection = new Collection($students);
        return $this->sentSuccessResponse($studentCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStudentRequest $request)
    {
        $dataCreate = $request->all();
        $student = $this->student->create($dataCreate);
        $studentResoure = new StudentResource($student);
        return $this->sentSuccessResponse($studentResoure, "Create student success", Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $student = $this->student->where('user_id', $id)->firstOrFail();
        if ($student->student_isDelete == 1) {
            return response()->json([
                'message' => 'Student is deleted',
            ], 404);
        } else {
            $studentWithUser = $this->student->query()
                ->leftJoin('users', 'users.user_id', '=', 'students.user_id')
                ->leftJoin('majors', 'students.major_id', '=', 'majors.major_id')
                ->select('students.*', 'users.user_firstname', 'users.user_lastname', 'users.user_birthday','users.user_gender','majors.major_name')
                ->where('students.user_id', $id)
                ->firstOrFail();
            $studentResource = new StudentResource($studentWithUser);
            return $this->sentSuccessResponse($studentResource, "Get student success", Response::HTTP_OK);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStudentRequest $request, $id)
    {
        $student = $this->student->where('user_id', $id)->firstOrFail();
        $dataUpdate = $request->all();
        $student->update($dataUpdate);
        $studentResource = new StudentResource($student);
        return $this->sentSuccessResponse($studentResource, "Update student success", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $student = $this->student->where('user_id', $id)->firstOrFail();
        $student->student_isDelete = 1;
        $student->save();
        $studentResoure = new StudentResource($student);
        return $this->sentSuccessResponse($studentResoure, "Delete user success", Response::HTTP_OK);
    }

    //Hàm import sinh viên đầu khóa khi tham gia hệ thống
    public function addFileStudent(AddFileStudentRequest $request){
        $data = $request->input('data');

    }


    //Hàm import sinh viên đăng ký chuyên ngành
    public function addFileStudentSpecialty(){

    }
}
