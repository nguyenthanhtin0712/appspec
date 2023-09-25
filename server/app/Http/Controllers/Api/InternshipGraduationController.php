<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubmitRegisterInternshipRequest;
use App\Http\Requests\SubmitRegsiterInternshipOutOfficial;
use App\Http\Resources\Collection;
use App\Http\Resources\InternshipCompanyResoure;
use App\Jobs\SendEmail;
use App\Models\Company;
use App\Models\CompanyPositionDetail;
use App\Models\DisplayConfig;
use App\Models\InternshipGraduation;
use App\Models\JobHolder;
use App\Models\JobholderInternship;
use App\Models\OpenclassTime;
use App\Models\RecruitmentPosition;
use App\Models\RegisterIntershipCompany;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InternshipGraduationController extends Controller
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
        $internshipGraduation = InternshipGraduation::with('openclasstime')->where('internship_graduation_isDelete', 0);
        if ($query) {
            $internshipGraduation->where("openclass_time_id", "LIKE", "%$query%");
        }
        if ($id) {
            $internshipGraduation->where('openclass_time_id', $id);
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
            if ($perPage) {
                $internshipGraduation = $internshipGraduation->paginate($perPage);
            } else {
                $internshipGraduation = $internshipGraduation->paginate(10);
            }
        }
        $internshipGraduationCollection = new Collection($internshipGraduation);
        return $this->sentSuccessResponse($internshipGraduationCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $openclass_semester = $request->input('openclass_semester');
        $openclass_year = $request->input('openclass_year');
        $internship_graduation_start_date = $request->input('internship_graduation_start_date');
        $internship_graduation_end_date = $request->input('internship_graduation_end_date');

        $openclass_time = OpenclassTime::where('openclass_time_semester', $openclass_semester)
            ->where('openclass_time_year', $openclass_year)->first();

        $internshipGraduationCreate = null;
        if ($openclass_time) {
            $valid = InternshipGraduation::find($openclass_time->openclass_time_id);
            if (!$valid) {
                $internshipGraduationCreate = InternshipGraduation::create([
                    'internship_graduation_id' => $openclass_time->openclass_time_id,
                    'internship_graduation_start_date' => $internship_graduation_start_date,
                    'internship_graduation_end_date' => $internship_graduation_end_date
                ]);
            } else {
                $valid->openclasstime;
                return $this->sentErrorResponse($valid, "Đợt thực tập đã tồn tại", Response::HTTP_CONFLICT);
            }
        } else {
            $openclassTimeCreate = OpenclassTime::create([
                'openclass_time_semester' => $openclass_semester,
                'openclass_time_year' => $openclass_year
            ]);
            $internshipGraduationCreate = InternshipGraduation::create([
                'internship_graduation_id' => $openclassTimeCreate->openclass_time_id,
                'internship_graduation_start_date' => $internship_graduation_start_date,
                'internship_graduation_end_date' => $internship_graduation_end_date
            ]);
        }
        $internshipGraduationCreate->openclasstime;
        return $this->sentSuccessResponse($internshipGraduationCreate, "Internship Gradution created", Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $internshipGraduation = InternshipGraduation::with(['openclasstime'])->where('internship_graduation_id', $id)->where('internship_graduation_isDelete', 0)->firstOrFail();
        return $this->sentSuccessResponse($internshipGraduation, 'Displayed internship graduation successfully', Response::HTTP_OK);
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
        $internshipGraduation = InternshipGraduation::find($id);
        $internshipGraduation->update([
            'internship_graduation_start_date' => $request->input('internship_graduation_start_date'),
            'internship_graduation_end_date' => $request->input('internship_graduation_end_date'),
        ]);
        $internshipGraduation->openclasstime;
        return $this->sentSuccessResponse($internshipGraduation, "Update successfully", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $internshipGraduation = InternshipGraduation::where('internship_graduation_id', $id)->firstOrFail();
        $internshipGraduation->internship_graduation_isDelete = 1;
        $internshipGraduation->save();
        return $this->sentSuccessResponse($internshipGraduation, 'Deleted successfully', Response::HTTP_OK);
    }


    public function getInfoInternship()
    {
        $displayConfig = DisplayConfig::find('register_intern')->display_config_value ?? InternshipGraduation::latest()->first()->internship_graduation_id;
        $registerInternship = InternshipGraduation::find($displayConfig);
        return $this->sentSuccessResponse($registerInternship, 'Get infoInternship success', 200);
    }

    public function getCompanyInternshipByUser(Request $request)
    {

        $displayConfig = DisplayConfig::find('register_intern')->display_config_value ?? InternshipGraduation::latest()->first()->internship_graduation_id;
        $companyInternship = RegisterIntershipCompany::leftJoin('companies', 'companies.company_id', 'register_internship_company.company_id')
            ->where('internship_graduation_id', $displayConfig)
            ->where('companies.company_is_official', '1')
            ->get()->map(function ($companyInternship) {
                return [
                    'company_id' => $companyInternship->company_id,
                    'company_name' => Company::find($companyInternship->company_id)->company_name,
                    'company_address' => Company::find($companyInternship->company_id)->company_address,
                    'user_phone' => User::find(Company::find($companyInternship->company_id)->user_id)->user_phone,
                    'user_email' => User::find(Company::find($companyInternship->company_id)->user_id)->user_email,
                    'list_position' => CompanyPositionDetail::where('register_internship_company_id', $companyInternship->register_internship_company_id)->get()->map(function ($positon) {
                        return [
                            'position_id' => $positon->position_id,
                            'position_name' => RecruitmentPosition::find($positon->position_id)->position_name,
                            'position_quantity' => $positon->position_quantity,
                            'position_total_register' => Student::where('company_position_detail_id', $positon->company_position_detail_id)->count()
                        ];
                    })->values()
                ];
            });
        return $this->sentSuccessResponse($companyInternship, "Get displayConfig success", 200);
    }

    public function getCompany($id)
    {
        $companies = RegisterIntershipCompany::with(['positions'])
            ->leftJoin('companies', 'register_internship_company.company_id', '=', 'companies.company_id')
            ->where('internship_graduation_id', $id)
            ->get();
        return $this->sentSuccessResponse(InternshipCompanyResoure::collection($companies), 'Get companies successful', Response::HTTP_OK);
    }

    public function storeRegisterInfo(Request $request)
    {
        $internship_graduation_id = $request->input('internship_graduation_id');
        $register_internship_start_date = $request->input('register_internship_start_date');
        $register_internship_end_date = $request->input('register_internship_end_date');
        $companiesUpdate = collect($request->input('companies'));

        InternshipGraduation::find($internship_graduation_id)->update([
            'register_internship_start_date' => $register_internship_start_date,
            'register_internship_end_date' => $register_internship_end_date
        ]);

        $existingCompanies = RegisterIntershipCompany::with('positions')
            ->where('internship_graduation_id', $internship_graduation_id)
            ->get();

        foreach ($companiesUpdate as $companyUpdate) {
            $company_id = $companyUpdate['company_id'];
            $existingCompany = $existingCompanies->firstWhere('company_id', $company_id);

            if ($existingCompany) {
                // Update existing company
                $existingCompany->update([
                    'company_isInterview' => $companyUpdate['company_isInterview'],
                ]);

                // Create an array to store position IDs for this company
                $existingPositionIds = $existingCompany->positions->pluck('position_id')->toArray();

                // Update positions
                foreach ($companyUpdate['positions'] as $position) {
                    $existingPosition = $existingCompany->positions->firstWhere('position_id', $position['position_id']);
                    if ($existingPosition) {
                        // Update existing position
                        CompanyPositionDetail::where('register_internship_company_id', $existingCompany->register_internship_company_id)
                            ->where('position_id', $position['position_id'])->update([
                                'position_quantity' => $position['position_quantity'],
                            ]);

                        // Remove the position ID from the existingPositionIds array
                        $key = array_search($position['position_id'], $existingPositionIds);
                        if ($key !== false) {
                            unset($existingPositionIds[$key]);
                        }
                    } else {
                        // Create new position
                        CompanyPositionDetail::create([
                            'register_internship_company_id' => $existingCompany->register_internship_company_id,
                            'position_id' => $position['position_id'],
                            'position_quantity' => $position['position_quantity'],
                        ]);
                    }
                }

                // Delete positions that are not in the updated list
                CompanyPositionDetail::where('register_internship_company_id', $existingCompany->register_internship_company_id)
                    ->whereIn('position_id', $existingPositionIds)
                    ->delete();
            } else {
                // Create new company
                $registerInternshipCompany = RegisterIntershipCompany::create([
                    'internship_graduation_id' => $internship_graduation_id,
                    'company_id' => $company_id,
                    'company_isInterview' => $companyUpdate['company_isInterview'],
                ]);

                // Create positions for the new company
                foreach ($companyUpdate['positions'] as $position) {
                    CompanyPositionDetail::create([
                        'register_internship_company_id' => $registerInternshipCompany->register_internship_company_id,
                        'position_id' => $position['position_id'],
                        'position_quantity' => $position['position_quantity'],
                    ]);
                }
            }
        }

        // Delete companies that are not in the updated list
        $companiesToDelete = $existingCompanies->whereNotIn('company_id', $companiesUpdate->pluck('company_id')->toArray());
        foreach ($companiesToDelete as $companyToDelete) {
            $companyToDelete->positions()->delete();
            $companyToDelete->delete();
        }

        return $this->sentSuccessResponse(null, 'Update successfully', Response::HTTP_OK);
    }


    public function getRegisterInternshipByUser()
    {
        $displayConfig = DisplayConfig::find('register_intern')->display_config_value ?? InternshipGraduation::latest()->first()->internship_graduation_id;
        $companyInternship = RegisterIntershipCompany::leftJoin('companies', 'companies.company_id', 'register_internship_company.company_id')
            ->where('internship_graduation_id', $displayConfig)
            ->where('companies.company_is_official', '1')->get()->map(function ($companyInternship) {
                return [
                    'company_id' => Company::find($companyInternship->company_id)->company_id,
                    'company_name' => Company::find($companyInternship->company_id)->company_name,
                    'positions' => CompanyPositionDetail::where('register_internship_company_id', $companyInternship->register_internship_company_id)->get()->map(function ($positon) {
                        return [
                            'position_id' => RecruitmentPosition::find($positon->position_id)->position_id,
                            'position_name' => RecruitmentPosition::find($positon->position_id)->position_name,
                            'position_quantity' => $positon->position_quantity,
                            'position_total_register' => Student::where('company_position_detail_id', $positon->company_position_detail_id)->count()
                        ];
                    })->values()
                ];
            });
        return $this->sentSuccessResponse($companyInternship, "Get RegisterInternship success", 200);
    }

    public function submitRegisterInternship(SubmitRegisterInternshipRequest $request)
    {
        $user = $request->user();
        $position_id = $request->input('position_id');
        $company_id = $request->input('company_id');
        $internship_graduation_id = DisplayConfig::find('register_intern')->display_config_value ?? InternshipGraduation::latest()->first()->internship_graduation_id;
        $register_internship_company_id = (RegisterIntershipCompany::where('internship_graduation_id', $internship_graduation_id)->where('company_id', $company_id)->firstOrFail())->register_internship_company_id;
        $company_position_detail_id = (CompanyPositionDetail::where('position_id', $position_id)->where('register_internship_company_id', $register_internship_company_id)->firstOrFail())->company_position_detail_id;
        $student = Student::where('user_id', $user->user_id)->firstOrFail();
        $student->company_position_detail_id = $company_position_detail_id;
        $student->save();
        return $this->sentSuccessResponse($student, 'getUserSuccess', 200);
    }

    public function submitRegisterInternshipOutOffcail(SubmitRegsiterInternshipOutOfficial $request)
    {
        $user = $request->user();
        $student = Student::where('user_id', $user->user_id)->firstOrFail();
        if ($student->company_position_detail_id != null) {
            $companyPositionDetail = CompanyPositionDetail::find($student->company_position_detail_id);
            $registerInternshipCompany = RegisterIntershipCompany::find($companyPositionDetail->register_internship_company_id);
            $company = Company::find($registerInternshipCompany->company_id);
            $position = RecruitmentPosition::find($companyPositionDetail->position_id);
            // if($company->company_is_official == 0){
            //     $companyPositionDetail->delete();
            //     $registerInternshipCompany->delete();
            //     $position->delete();
            //     $company->delete();
            // }
        }
        $company_name = $request->input('company_name');
        $company_address = $request->input('company_address');
        $position_name = $request->input('position_name');
        $company = Company::create([
            'company_name' => $company_name,
            'company_address' => $company_address,
            'company_is_official' => '0'
        ]);
        $position = RecruitmentPosition::create([
            'position_name' => $position_name,
            'company_id' => $company->company_id
        ]);
        $internship_graduation_id = DisplayConfig::find('register_intern')->display_config_value ?? InternshipGraduation::latest()->first()->internship_graduation_id;
        $registerInternshipCopmany = RegisterIntershipCompany::create([
            'internship_graduation_id' => $internship_graduation_id,
            'company_id' => $company->company_id,
            'company_isInterview' => '0'
        ]);
        $companyPositionDetail = CompanyPositionDetail::create([
            'register_internship_company_id' => $registerInternshipCopmany->register_internship_company_id,
            'position_id' => $position->position_id,
            'position_quantity' => '1'
        ]);
        $student->company_position_detail_id = $companyPositionDetail->company_position_detail_id;
        $student->save();
        return $this->sentSuccessResponse($student, "Reigster interhsip success", 200);
    }

    public function registerResultStudent(Request $request)
    {

        $displayConfig = DisplayConfig::find('register_intern')->display_config_value ?? InternshipGraduation::latest()->value('internship_graduation_id');

        $studentsQuery = Student::select(
            'students.student_code',
            'users.user_firstname',
            'users.user_lastname',
            'recruitment_positions.position_name',
            'companies.company_name',
            'jobholder_internships.jobholder_code'
        )
            ->leftJoin('users', 'users.user_id', '=', 'students.user_id')
            ->leftJoin('company_position_detail', 'company_position_detail.company_position_detail_id', '=', 'students.company_position_detail_id')
            ->leftJoin('register_internship_company', 'register_internship_company.register_internship_company_id', '=', 'company_position_detail.register_internship_company_id')
            ->leftJoin('companies', 'companies.company_id', '=', 'register_internship_company.company_id')
            ->leftJoin('recruitment_positions', 'recruitment_positions.position_id', '=', 'company_position_detail.position_id')
            ->leftjoin('jobholder_internships', 'jobholder_internships.jobholder_internship_id', 'students.jobholder_internship_id')
            ->where('student_isDelete', '0')
            ->where('register_internship_company.internship_graduation_id', $displayConfig);

        $query = $request->input('query');
        $id = $request->input('id');
        $sortBy = $request->input('sortBy');
        $sortOrder = $request->input('sortOrder', 'asc');
        $filters = $request->input('filters');

        if ($query) {
            $studentsQuery->where('student_code', 'LIKE', "%$query%")
            ->orWhereRaw("CONCAT(user_firstname, ' ', user_lastname) LIKE '%$query%'");
        }
        if ($id) {
            $studentsQuery->where('user_id', $id);
        }
        if ($sortBy) {
            $studentsQuery->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $field = $filter['id'];
                    $value = $filter['value'];
                    $studentsQuery->where($field, 'LIKE', "%$value%");
                }
            }
        }

        $perPage = $request->input('perPage', 10);
        $all = $request->input('all', false);

        $students = $studentsQuery->get();

        $formatStudent = function ($student) {
            $jobholder = JobHolder::find($student->jobholder_code);
            $jobholderUser = $jobholder ? User::find($jobholder->user_id) : null;
            return [
                'student_code' => $student->student_code,
                'user_firstname' => $student->user_firstname,
                'user_lastname' => $student->user_lastname,
                'position_name' => $student->position_name,
                'company_name' => $student->company_name,
                'jobholder_name' => $jobholderUser ? "{$jobholderUser->user_firstname} {$jobholderUser->user_lastname}" : null,
            ];
        };

        $formattedStudents = $students->map($formatStudent);

        if (!$all) {
            $paginatedStudents = $formattedStudents->paginate($perPage);
            $data = [
                "data" => [
                    "result" => $paginatedStudents->items(),
                    "meta" => [
                        "total" => $paginatedStudents->total(),
                        "current_page" => $paginatedStudents->currentPage(),
                        "last_page" => $paginatedStudents->lastPage(),
                        "per_page" => $paginatedStudents->perPage(),
                    ],
                ],
                "message" => "Get data success",
                'status' => 200
            ];
            return response()->json($data);
        }

        return $this->sentSuccessResponse($formattedStudents, 'Get data success', 200);
    }

    public function getResult() {
        
    }

    public function assignmentInternshipStudent(Request $request){
        $displayConfig = $request->input('id');
        $studentsQuery = Student::select(
            'students.student_code',
            'users.user_firstname',
            'users.user_lastname',
            'recruitment_positions.position_name',
            'companies.company_name',
            'jobholder_internships.jobholder_code'
        )
            ->leftJoin('users', 'users.user_id', '=', 'students.user_id')
            ->leftJoin('company_position_detail', 'company_position_detail.company_position_detail_id', '=', 'students.company_position_detail_id')
            ->leftJoin('register_internship_company', 'register_internship_company.register_internship_company_id', '=', 'company_position_detail.register_internship_company_id')
            ->leftJoin('companies', 'companies.company_id', '=', 'register_internship_company.company_id')
            ->leftJoin('recruitment_positions', 'recruitment_positions.position_id', '=', 'company_position_detail.position_id')
            ->leftjoin('jobholder_internships', 'jobholder_internships.jobholder_internship_id', 'students.jobholder_internship_id')
            ->where('student_isDelete', '0')
            ->where('register_internship_company.internship_graduation_id', $displayConfig);

        $query = $request->input('query');
        $sortBy = $request->input('sortBy');
        $sortOrder = $request->input('sortOrder', 'asc');
        $filters = $request->input('filters');
        $status = $request->input('status');
        if ($query) {
            $studentsQuery->where('student_code', 'LIKE', "%$query%")
            ->orWhereRaw("CONCAT(user_firstname, ' ', user_lastname) LIKE '%$query%'");
        }
        if ($sortBy) {
            $studentsQuery->orderBy($sortBy, $sortOrder);
        }
        if ($status == 1) {
            $studentsQuery->whereNotNull('students.jobholder_internship_id');
        }
        if ($status == 2) {
            $studentsQuery->whereNull('students.jobholder_internship_id');
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $field = $filter['id'];
                    $value = $filter['value'];
                    $studentsQuery->where($field, 'LIKE', "%$value%");
                }
            }
        }

        $perPage = $request->input('perPage', 10);
        $all = $request->input('all', false);

        $students = $studentsQuery->get();

        $formatStudent = function ($student) {
            $jobholder = JobHolder::find($student->jobholder_code);
            $jobholderUser = $jobholder ? User::find($jobholder->user_id) : null;
            return [
                'student_code' => $student->student_code,
                'user_firstname' => $student->user_firstname,
                'user_lastname' => $student->user_lastname,
                'position_name' => $student->position_name,
                'company_name' => $student->company_name,
                'jobholder_name' => $jobholderUser ? "{$jobholderUser->user_firstname} {$jobholderUser->user_lastname}" : null,
            ];
        };

        $formattedStudents = $students->map($formatStudent);

        if (!$all) {
            $paginatedStudents = $formattedStudents->paginate($perPage);
            $data = [
                "data" => [
                    "result" => $paginatedStudents->items(),
                    "meta" => [
                        "total" => $paginatedStudents->total(),
                        "current_page" => $paginatedStudents->currentPage(),
                        "last_page" => $paginatedStudents->lastPage(),
                        "per_page" => $paginatedStudents->perPage(),
                    ],
                ],
                "message" => "Get data success",
                'status' => 200
            ];
            return response()->json($data);
        }

        return $this->sentSuccessResponse($formattedStudents, 'Get data success', 200);
    }

    public function getJobholderAssinmentInteship($id){
        $jobholderInternship = JobholderInternship::leftJoin('job_holders', 'job_holders.jobholder_code', '=','jobholder_internships.jobholder_code')
        ->leftJoin('users', 'users.user_id', 'job_holders.user_id')
        ->where('internship_graduation_id', $id)->get()->map(function($jobholder){
            return [
                'jobholder_code' => $jobholder->jobholder_code,
                'jobholder_name' => $jobholder->user_firstname . ' ' . $jobholder->user_lastname,
                'total' => Student::leftJoin('company_position_detail', 'company_position_detail.company_position_detail_id', '=', 'students.company_position_detail_id')
                    ->leftJoin('register_internship_company', 'register_internship_company.register_internship_company_id', '=', 'company_position_detail.register_internship_company_id')
                    ->leftJoin('companies', 'companies.company_id', '=', 'register_internship_company.company_id')
                    ->leftJoin('recruitment_positions', 'recruitment_positions.position_id', '=', 'company_position_detail.position_id')
                    ->leftjoin('jobholder_internships', 'jobholder_internships.jobholder_internship_id', 'students.jobholder_internship_id')
                    ->where('student_isDelete', '0')
                    ->where('register_internship_company.internship_graduation_id', $jobholder->internship_graduation_id)
                    ->where('jobholder_internships.jobholder_code', $jobholder->jobholder_code)
                    ->count()
            ];
        });
        return $this->sentSuccessResponse($jobholderInternship, 'Get data success', 200);
    }

    public function changeJobholder(Request $request){
        $id = $request->input('id');
        $jobholder_code = $request->input('jobholder_code');
        $jobholder_internship_id = JobholderInternship::where('jobholder_code', $jobholder_code)->where('internship_graduation_id', $id)->first()->jobholder_internship_id;
        $students = $request->input('students');
        foreach ($students as $student_id) {
            $student = Student::where('student_code', $student_id)->first();
            $student->jobholder_internship_id = $jobholder_internship_id;
            $student->save();
        }
        return response()->json(['message' => 'Change specialty successful'], 200);
    }

    public function queryJobholder(Request $request){
        $query = $request->input('query');
        $id = $request->input('id');
        $jobholders = JobHolder::leftJoin('users', 'users.user_id', 'job_holders.user_id')
        ->select('job_holders.jobholder_code', 'users.user_firstname', 'users.user_lastname');
        if($query){
            $jobholders = $jobholders->whereRaw("CONCAT(user_firstname, ' ', user_lastname) LIKE '%$query%'");
        }
        $jobholders= $jobholders->get()->map(function($jobholder) use ($id) {
            return [
                'jobholder_code' => $jobholder->jobholder_code,
                'jobholder_name' => $jobholder->user_firstname.' '.$jobholder->user_lastname,
                'jobholderJoinInternship' => JobholderInternship::where('jobholder_code', $jobholder->jobholder_code)
                ->where('internship_graduation_id', $id)->first() ? 1 : 0,
            ];
        });
        return $this->sentSuccessResponse($jobholders, 'get Jobholders', 200);
    }

    public function addJobholderIternship(Request $request){
        $id = $request->input('id');
        $jobholder_code = $request->input('jobholder_code');
        $jobholder_internship = JobholderInternship::where('jobholder_code', $jobholder_code)->where('internship_graduation_id', $id)->first();
        if($jobholder_internship){
            $jobholder_internship->delete();
        } else {
            $jobholder_internship = JobholderInternship::create([
                'jobholder_code' => $jobholder_code,
                'internship_graduation_id' => $id
            ]);
        }
        return $this->sentSuccessResponse($jobholder_internship, "Change success", 200);
    }


    public function testEmail()
    {
        $message = [
            'type' => 'Create task',
            'content' => 'has been created!',
        ];
        SendEmail::dispatch($message, [
            'musicanime2501@gmail.com'
        ])->delay(now()->addMinute(1));
    }
}
