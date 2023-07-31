<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddFileStudentRequest;
use App\Http\Requests\AddScoreStudentRequest;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\Collection;
use App\Http\Resources\StudentResource;
use App\Models\Major;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

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
        $students = $this->student->query()
            ->leftJoin('users', 'students.user_id', '=', 'users.user_id')
            ->leftJoin('majors', 'students.major_id', '=', 'majors.major_id')
            ->select('students.*', 'users.user_firstname', 'users.user_lastname', 'users.user_birthday', 'users.user_gender', 'majors.major_name');
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
        if ($all && $all == true) {
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
        $student_code = $request->input('student_code');
        $student_class = $request->input('student_class');
        $student_course = $request->input('student_course');
        $major_id = $request->input('major_id');
        $user_gender = $request->input('user_gender');
        $user_birthday = $request->input('user_birthday');
        $user_firstname = $request->input('user_firstname');
        $user_lastname = $request->input('user_lastname');
        $user_password = $request->input('user_password');
        $user = User::create([
            'user_firstname' => "$user_firstname",
            'user_lastname' => "$user_lastname",
            'user_password' => bcrypt($user_password),
            'user_gender' => "$user_gender",
            'user_birthday' => "$user_birthday",
        ]);
        Student::create([
            'user_id' => $user->user_id,
            'student_code' => "$student_code",
            'student_class' => "$student_class",
            'student_course' => "$student_course",
            'major_id' => $major_id,
        ]);
        $studentWithUser = $this->student->query()
            ->leftJoin('users', 'users.user_id', '=', 'students.user_id')
            ->leftJoin('majors', 'students.major_id', '=', 'majors.major_id')
            ->select('students.*', 'users.user_firstname', 'users.user_lastname', 'users.user_birthday', 'users.user_gender', 'majors.major_name')
            ->where('students.user_id', $user->user_id)
            ->firstOrFail();
        return $this->sentSuccessResponse($studentWithUser, "Create student success", Response::HTTP_OK);
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
                ->select('students.*', 'users.user_firstname', 'users.user_lastname', 'users.user_birthday', 'users.user_gender', 'majors.major_name')
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
        $student = $this->student->where('user_id', $id)->first();
        $student->student_isDelete = 1;
        $student->save();
        $studentResoure = new StudentResource($student);
        return $this->sentSuccessResponse($studentResoure, "Delete user success", Response::HTTP_OK);
    }

    public function getInfoCurrent(Request $request)
    {
        $student = $request->user()->student;
        if ($student) {
            return $this->sentSuccessResponse($student, "Get data student success", Response::HTTP_OK);
        }
        return $this->sentErrorResponse($student, "Not Found Info", Response::HTTP_NOT_FOUND);
    }

    //Hàm import sinh viên đầu khóa khi tham gia hệ thống
    public function addFileStudent(AddFileStudentRequest $request)
    {
        $data = $request->input('data');
        $password = $request->input('password');
        $result = array();
        $majorCodes = array_column($data, 'major_id');
        $majors = Major::whereIn('major_id', $majorCodes)->get()->keyBy('major_id');
        $password = bcrypt($password);
        foreach ($data as $row) {
            $student_code = $row['student_code'];
            $checkStudent = Student::where('student_code', '=', "$student_code")->first();
            if ($checkStudent) {
                continue;
            }
            $major_id = trim($row['major_id']);
            $major = $majors[$major_id];
            if (!$major) {
                return "Không tìm thấy major trong cơ sở dữ liệu!";
            }
            $user_firstname = $row['user_firstname'];
            $user_lastname = $row['user_lastname'];
            $user_gender = $row['user_gender'];

            // Chuyển đổi chuỗi ngày tháng thành đối tượng DateTime
            $user_birthday = \DateTime::createFromFormat('d/m/Y', $row['user_birthday'])->format('Y-m-d');
            $student_class = $row['student_class'];
            $student_course = $row['student_course'];
            $student_code = $row['student_code'];
            $user = User::create([
                'user_firstname' => "$user_firstname",
                'user_lastname' => "$user_lastname",
                'user_password' => $password,
                'user_gender' => "$user_gender",
                'user_birthday' => "$user_birthday",
            ]);
            Student::create([
                'user_id' => $user->user_id,
                'student_code' => "$student_code",
                'student_class' => "$student_class",
                'student_course' => "$student_course",
                'major_id' => $major->major_id,
            ]);
            $studentWithUser = $this->student->query()
                ->leftJoin('users', 'users.user_id', '=', 'students.user_id')
                ->leftJoin('majors', 'students.major_id', '=', 'majors.major_id')
                ->select('students.*', 'users.user_firstname', 'users.user_lastname', 'users.user_birthday', 'users.user_gender', 'majors.major_name')
                ->where('students.user_id', $user->user_id)
                ->firstOrFail();
            array_push($result, $studentWithUser);
        }
        $studentCollection = new Collection($result);
        return $this->sentSuccessResponse($studentCollection, "Add student success", Response::HTTP_OK);
    }

    //Hàm import sinh viên đăng ký chuyên ngành
    public function addScoreStudent(AddScoreStudentRequest $request)
    {
        $data = $request->input('data');
        $students = Student::whereIn('student_code', array_column($data, 'student_code'))->get();
        $updatedCount = 0;

        foreach ($data as $row) {
            $studentCode = $row['student_code'];
            $studentScore = trim($row['student_score']);

            $student = $students->where('student_code', $studentCode)->first();

            if ($student) {
                $student->student_score = $studentScore;
                $student->save();
                $updatedCount++;
            }
        }
        return $this->sentSuccessResponse("Cập nhật $updatedCount sinh viên!", "Add student success", Response::HTTP_OK);
    }
}
