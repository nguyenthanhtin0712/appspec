<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Collection;
use App\Models\InternshipGraduation;
use App\Models\JobHolder;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GradingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user_id = $request->user()->user_id;
        $jobholder_code = JobHolder::where('user_id', "$user_id")->first()->jobholder_code;
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $sortBy = $request->input('sortBy');
        $sortOrder = $request->input('sortOrder', 'asc');
        $filters = $request->input('filters');
        $internshipGraduation = InternshipGraduation::with('openclasstime')->leftJoin('jobholder_internships', 'jobholder_internships.internship_graduation_id', 'internship_graduations.internship_graduation_id')->where('jobholder_code', $jobholder_code)->where('internship_graduation_isDelete', 0);
        if ($query) {
            $internshipGraduation->where("openclass_time_id", "LIKE", "%$query%");
        }
        if ($sortBy) {
            $internshipGraduation->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $internshipGraduation->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }
        if ($all && $all == true) {
            $internshipGraduation = $internshipGraduation->get();
        } else {
            $internshipGraduation = $internshipGraduation->paginate($perPage ?? 10);
        }
        $internshipGraduationCollection = new Collection($internshipGraduation);
        return $this->sentSuccessResponse($internshipGraduationCollection, "Get data success", Response::HTTP_OK);
    }

    public function getSutdentGrading(Request $request, $id)
    {
        $user_id = $request->user()->user_id;
        $jobholder_code = JobHolder::where('user_id', "$user_id")->first()->jobholder_code;
        $students = Student::leftJoin('users', 'users.user_id', '=', 'students.user_id')
            ->leftJoin('company_position_detail', 'company_position_detail.company_position_detail_id', '=', 'students.company_position_detail_id')
            ->leftJoin('register_internship_company', 'register_internship_company.register_internship_company_id', '=', 'company_position_detail.register_internship_company_id')
            ->leftJoin('companies', 'companies.company_id', '=', 'register_internship_company.company_id')
            ->leftJoin('recruitment_positions', 'recruitment_positions.position_id', '=', 'company_position_detail.position_id')
            ->leftjoin('jobholder_internships', 'jobholder_internships.jobholder_internship_id', 'students.jobholder_internship_id')
            ->where('students.internship_graduation_id', $id)
            ->where('jobholder_internships.jobholder_code', $jobholder_code)
            ->get();
        $formatStudent = function ($student) {
            return [
                'student_code' => $student->student_code,
                'user_firstname' => $student->user_firstname,
                'user_lastname' => $student->user_lastname,
                'position_name' => $student->position_name,
                'company_name' => $student->company_name,
                'internship_score' => $student->internship_score
            ];
        };
        $formattedStudents = $students->map($formatStudent);
        return $this->sentSuccessResponse($formattedStudents, "Lấy thành công danh sách sinh viên để chấm điểm", 200);
    }

    public function updateGrade(Request $request)
    {
        $students = $request->input('students');

        foreach ($students as $item) {
            foreach ($item as $key => $value) {
                Student::where('student_code', $key)->update(['internship_score' => $value]);
            }
        }

        return response()->json(['message' => 'Cập nhật điểm thành công']);
    }
}
