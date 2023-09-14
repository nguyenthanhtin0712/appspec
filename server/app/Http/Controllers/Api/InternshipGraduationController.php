<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubmitRegisterInternshipRequest;
use App\Http\Requests\SubmitRegisterSpecialtyRequest;
use App\Http\Requests\SubmitRegsiterInternshipOutOfficial;
use App\Http\Resources\Collection;
use App\Http\Resources\InternshipCompanyResoure;
use App\Models\Company;
use App\Models\CompanyPositionDetail;
use App\Models\DisplayConfig;
use App\Models\InternshipGraduation;
use App\Models\RecruitmentPosition;
use App\Models\RegisterInternship;
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
        $jobholder = InternshipGraduation::with('openclasstime');
        if ($query) {
            $jobholder->where("openclass_time_id", "LIKE", "%$query%");
        }
        if ($id) {
            $jobholder->where('openclass_time_id', $id);
        }
        if ($sortBy) {
            $jobholder->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $jobholder->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }
        if ($all && $all == true) {
            $jobholder = $jobholder->get();
        } else {
            if ($perPage) {
                $jobholder = $jobholder->paginate($perPage);
            } else {
                $jobholder = $jobholder->paginate(10);
            }
        }
        $jobholderCollection = new Collection($jobholder);
        return $this->sentSuccessResponse($jobholderCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        InternshipGraduation::find($id);
        $internshipGraduation = InternshipGraduation::where('internship_graduation_id', $id)->where('internship_graduation_isDelete', 0)->firstOrFail();
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
        //
    }


    public function getInfoInternship()
    {
        $displayConfig = DisplayConfig::find('register_intern')->display_config_value ?? InternshipGraduation::latest()->first()->internship_graduation_id;
        $registerInternship = InternshipGraduation::find($displayConfig);
        return $this->sentSuccessResponse($registerInternship, 'Get infoInternship success', 200);
    }

    public function getCompanyInternshipByUser()
    {
        $displayConfig = DisplayConfig::find('register_intern')->display_config_value ?? InternshipGraduation::latest()->first()->internship_graduation_id;
        $companyInternship = RegisterIntershipCompany::
        leftJoin('companies', 'companies.company_id', 'register_internship_company.company_id')
        ->where('internship_graduation_id', $displayConfig)
        ->where('companies.company_is_official', '1')
        ->get()->map(function ($companyInternship) {
            return [
                'company_name' => Company::find($companyInternship->company_id)->company_name,
                'company_address' => Company::find($companyInternship->company_id)->company_address,
                'user_phone' => User::find(Company::find($companyInternship->company_id)->user_id)->user_phone,
                'user_email' => User::find(Company::find($companyInternship->company_id)->user_id)->user_email,
                'list_position' => CompanyPositionDetail::where('register_internship_company_id', $companyInternship->register_internship_company_id)->get()->map(function ($positon) {
                    return [
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
        $companiesDB = RegisterIntershipCompany::where('internship_graduation_id', $internship_graduation_id)
            ->with('companies.positions');
        $companiesUpdate = collect($request->input('companies'));

        $listIdUpdate = $companiesUpdate->pluck('company_id');
        $listIdCompany = $companiesDB->pluck('company_id');

        $companiesCreate = $listIdUpdate->diff($listIdCompany);
        $companiesDelete = $listIdCompany->diff($listIdUpdate);

        // echo json_encode($companiesCreate);
        // echo json_encode($companiesDelete);

        // echo json_encode($companiesDB->get());

        // Delete company
        foreach ($companiesDelete as $company) {
            $instance = $companiesDB->where('company_id', $company);
            $instance->delete();
        }

        echo json_encode($companiesUpdate);

        // foreach ($companiesCreate as $company) {
        //     $companiesUpdate->where()
        // }
    }

    public function getRegisterInternshipByUser()
    {
        $displayConfig = DisplayConfig::find('register_intern')->display_config_value ?? InternshipGraduation::latest()->first()->internship_graduation_id;
        $companyInternship = RegisterIntershipCompany::
        leftJoin('companies', 'companies.company_id', 'register_internship_company.company_id')
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

    public function submitRegisterInternshipOutOffcail(SubmitRegsiterInternshipOutOfficial $request){
        $user = $request->user();
        $company_name = $request->input('company_name');
        $company_address = $request->input('company_address');
        $position_name = $request->input('position_name');
        $company = Company::create([
            'company_name' => $company_name,
            'company_address' => $company_address,
        ]);
        $position = RecruitmentPosition::create([
            'position_name' => $position_name,
            'company_id' => $company->company_id
        ]);
        
    }

    public function registerResultStudent(Request $request)
    {
    $displayConfig = DisplayConfig::find('register_intern')->display_config_value ?? InternshipGraduation::latest()->first()->internship_graduation_id;

    $students = Student::leftJoin('users', 'users.user_id', '=', 'students.user_id')
        ->leftJoin('company_position_detail', 'company_position_detail.company_position_detail_id', '=', 'students.company_position_detail_id')
        ->leftJoin('register_internship_company', 'register_internship_company.register_internship_company_id', '=', 'company_position_detail.register_internship_company_id')
        ->leftJoin('companies', 'companies.company_id', '=', 'register_internship_company.company_id')
        ->leftJoin('recruitment_positions', 'recruitment_positions.position_id', '=', 'company_position_detail.position_id')
        ->leftJoin('job_holders', 'students.jobholder_code', '=', 'job_holders.jobholder_code')
        ->select('students.student_code', 'users.user_firstname', 'users.user_lastname', 'recruitment_positions.position_name', 'companies.company_name')
        ->where('student_isDelete', '0')
        ->where('register_internship_company.internship_graduation_id', $displayConfig);

    $query = $request->input('query');
    $id = $request->input('id');
    $sortBy = $request->input('sortBy');
    $sortOrder = $request->input('sortOrder', 'asc');
    $filters = $request->input('filters');

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
    $perPage = $request->input('perPage', 10);

    if ($request->input('all')) {
        $students = $students->get();
    } else {
        $students = $students->paginate($perPage);
    }
    $studentCollection = new Collection($students);
    return $this->sentSuccessResponse($studentCollection, 'regsiterResultStudent', 200);
    }

}
