<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Collection;
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
        //
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

    public function getUnregisteredInternshipGraduations()
    {
        $unregisteredGraduations = InternshipGraduation::whereDoesntHave('register_internship')->with('openclasstime')->get();
        $flattenedData = $unregisteredGraduations->map(function ($graduation) {
            $flattenedItem = [
                ...$graduation->toArray(),
                ...$graduation->openclasstime->toArray()
            ];
            unset($flattenedItem['openclasstime']);
            return $flattenedItem;
        })->toArray();
        return $this->sentSuccessResponse($flattenedData, 'Get data successfuly', Response::HTTP_OK);
    }

    
    public function getInfoInternship(){
        $displayConfig = DisplayConfig::find('register_intern')->display_config_value ?? InternshipGraduation::latest()->first()->internship_graduation_id;
        $registerInternship = InternshipGraduation::find($displayConfig);
        return $this->sentSuccessResponse($registerInternship, 'Get infoInternship success', 200);
    }

    public function getCompanyInternshipByUser(){
        $displayConfig = DisplayConfig::find('register_intern')->display_config_value ?? InternshipGraduation::latest()->first()->internship_graduation_id;
        $companyInternship = RegisterIntershipCompany::where('internship_graduation_id', $displayConfig)->get()->map(function($companyInternship){
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

    public function getRegisterInternshipByUser(){
        $displayConfig = DisplayConfig::find('register_intern')->display_config_value ?? InternshipGraduation::latest()->first()->internship_graduation_id;
        $companyInternship = RegisterIntershipCompany::where('internship_graduation_id', $displayConfig)->get()->map(function($companyInternship){
            return [
                'company_id' => Company::find($companyInternship->company_id)->company_id,
                'company_name' => Company::find($companyInternship->company_id)->company_name,
                'positions' => CompanyPositionDetail::where('register_internship_company_id',$companyInternship->register_internship_company_id)->get()->map(function ($positon) {
                    return [
                        'position_id' => RecruitmentPosition::find($positon->position_id)->position_id,
                        'position_name' => RecruitmentPosition::find($positon->position_id)->position_name,
                    ];
                })->values()
            ];
        });
        return $this->sentSuccessResponse($companyInternship, "Get RegisterInternship success", 200);
    }

    public function submitRegisterInternship(Request $request){
        $user = $request->user();
        return $this->sentSuccessResponse($user, 'getUserSuccess', 200);
    }
}
