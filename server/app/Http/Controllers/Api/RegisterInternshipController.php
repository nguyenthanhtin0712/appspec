<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Collection;
use App\Http\Resources\InternshipCompanyResoure;
use App\Models\Company;
use App\Models\CompanyPositionDetail;
use App\Models\DisplayConfig;
use App\Models\RecruitmentPosition;
use App\Models\RegisterInternship;
use App\Models\RegisterIntershipCompany;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RegisterInternshipController extends Controller
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
        $intern_registration = RegisterInternship::with('internship_graduation', 'internship_graduation.openclasstime')
            ->where("register_internship_isDelete", "0")->latest();
        if ($query) {
            $intern_registration->where("register_internship_id", "LIKE", "%$query%");
        }
        if ($id) {
            $intern_registration->where('register_internship_id', $id);
        }
        if ($sortBy) {
            $intern_registration->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $intern_registration->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }
        if ($all && $all == true) {
            $intern_registration = $intern_registration->get();
        } else {
            if ($perPage) {
                $intern_registration = $intern_registration->paginate($perPage);
            } else {
                $intern_registration = $intern_registration->paginate(10);
            }
        }
        $intern_registrationCollection = new Collection($intern_registration);
        return $this->sentSuccessResponse($intern_registrationCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $registerInterData = $request->except(['companies', 'submit']);
        RegisterIntershipCompany::where('register_internship_id', $registerInterData['register_internship_id'])
            ->delete();
        $registerInternCreated = RegisterInternship::create($registerInterData);
        foreach ($request->input('companies') as $company) {
            $com = RegisterIntershipCompany::create([
                'register_internship_id' => $registerInternCreated->register_internship_id,
                'company_id' => $company['company_id'],
                'company_isInterview' => $company['company_isInterview']
            ]);
            foreach ($company['positions'] as $position) {
                CompanyPositionDetail::create([
                    'register_internship_company_id' => $com->register_internship_company_id,
                    'position_id' => $position['position_id'],
                    'position_quantity' => $position['position_quantity'],
                ]);
            }
        }
        return $this->sentSuccessResponse($registerInternCreated, "Created successful", Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $register_internship = RegisterInternship::with('internship_graduation', 'internship_graduation.openclasstime')
            ->where("register_internship_id", "$id")->firstOrFail();
        if ($register_internship->register_internship_isDelete == 1) {
            return response()->json([
                'message' => 'Register_internship is deleted',
            ], 404);
        } else {
            return $this->sentSuccessResponse($register_internship, "Get register_internship success", Response::HTTP_OK);
        }
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

    public function getCompany($id)
    {
        $companies = RegisterIntershipCompany::with(['positions'])
            ->leftJoin('companies', 'register_internship_company.company_id', '=', 'companies.company_id')
            ->where('register_internship_id', $id)
            ->get();

        return $this->sentSuccessResponse(InternshipCompanyResoure::collection($companies), 'Get companies successful', Response::HTTP_OK);
    }
    
    public function getStudentOfInternship($id)
    {
        $students = Student::query()
        ->leftJoin('users','users.user_id','=','students.user_id')
        ->leftJoin('company_position_detail','students.company_position_detail_id','=','company_position_detail.company_position_detail_id')
        ->leftJoin('recruitment_positions', 'company_position_detail.position_id','=','recruitment_positions.position_id')
        ->leftJoin('register_internship_company', 'company_position_detail.register_internship_company_id','=','register_internship_company.register_internship_company_id')
        ->where('register_internship_company.register_internship_id', "$id")
        ->get();
        return $this->sentSuccessResponse($students, "Get students in intership success", Response::HTTP_OK);
    }

    public function getInfoInternship(){
        $displayConfig = DisplayConfig::find('register_intern')->display_config_value ?? RegisterInternship::latest()->first()->register_internship_id;

        $registerInternship = RegisterInternship::find($displayConfig);
        return $this->sentSuccessResponse($registerInternship, 'Get infoInternship success', 200);
    }

    public function getCompanyInternshipByUser(){
        $displayConfig = DisplayConfig::find('register_intern')->display_config_value ?? RegisterInternship::latest()->first()->register_internship_id;
        $companyInternship = RegisterIntershipCompany::where('register_internship_id', $displayConfig)->get()->map(function($companyInternship){
            return [
                'company_name' => Company::find($companyInternship->company_id)->company_name,
                'company_address' => Company::find($companyInternship->company_id)->company_address,
                'user_phone' => User::find(Company::find($companyInternship->company_id)->user_id)->user_phone,
                'user_email' => User::find(Company::find($companyInternship->company_id)->user_id)->user_email,
                'list_position' => CompanyPositionDetail::where('register_internship_company_id',$companyInternship->register_internship_company_id)->get()->map(function ($positon) {
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
}
