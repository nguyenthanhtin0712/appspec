<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubmitRegisterInternshipRequest;
use App\Http\Resources\Collection;
use App\Http\Resources\InternshipCompanyResoure;
use App\Models\Company;
use App\Models\CompanyPositionDetail;
use App\Models\DisplayConfig;
use App\Models\InternshipGraduation;
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
        $companyInternship = RegisterIntershipCompany::where('internship_graduation_id', $displayConfig)->get()->map(function ($companyInternship) {
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
        $companiesUpdate = collect($request->input('companies'));
        
        $existingCompanies = RegisterIntershipCompany::where('internship_graduation_id', $internship_graduation_id)
            ->leftJoin('company_position_detail', 'register_internship_company.register_internship_company_id', '=', 'company_position_detail.register_internship_company_id');

        // Tách thành mảng company_id để xác định những phần tử nào cần thêm / cần xoá / cần chỉnh sửa
        $listIdUpdate = $companiesUpdate->pluck('company_id');
        $listIdCompany = $existingCompanies->pluck('company_id');

        // tách dữ liệu
        $companiesCreate = $listIdUpdate->diff($listIdCompany)->unique();
        $companiesDelete = $listIdCompany->diff($listIdUpdate)->unique();
        $intersect = $listIdUpdate->intersect($listIdCompany)->unique();

        // intersect
        foreach ($intersect as $company) {
            // Xử lý dữ liệu - Tách ra danh sách vị trí cần thêm / cần xoá
            $positionIdUpdate = [];
            $positionList = $companiesUpdate->where('company_id', $company)->first()['positions'];
            foreach ($positionList as $position) {
                array_push($positionIdUpdate, $position['position_id']);
            }
            $positionIdDB = [];
            foreach ($existingCompanies->get() as $position) {
                if ($position['company_id'] === $company) {
                    array_push($positionIdDB, $position['position_id']);
                }
            };

            // Lọc danh sách id vị trí
            $positionCreate = array_diff($positionIdUpdate, $positionIdDB);
            $positionDelete = array_diff($positionIdDB, $positionIdUpdate);
            $positionIntersect = array_intersect($positionIdUpdate, $positionIdDB);

            // Cập nhật trường is_Interview
            $company_record_update = $companiesUpdate->where('company_id', $company)->first();
            $isInternview = $company_record_update['company_isInterview'];

            $registerIntershipCompany = RegisterIntershipCompany::where('internship_graduation_id', $internship_graduation_id)
                ->where('company_id', $company);
            $registerIntershipCompany->update([
                'company_isInterview' => $isInternview
            ]);

            // Cập nhật vị trí
            $arrPo = $company_record_update['positions'];
            foreach ($positionIntersect as $position_id) {
                $position_quantity = 0;
                foreach ($arrPo as $positionItem) {
                    if ($positionItem['position_id'] == $position_id) {
                        $position_quantity = $positionItem['position_quantity'];
                        break;
                    }
                }
                $query = clone $existingCompanies;
                $instance = $query->where('position_id', $position_id)->first();
                $com = CompanyPositionDetail::find($instance->company_position_detail_id);
                $com->update([
                    "position_quantity" => $position_quantity
                ]);
            }

            // Delete position
            foreach ($positionDelete as $position_id) {
                $query = clone $existingCompanies;
                $instance = $query->where('position_id', $position_id)->first();
                $com = CompanyPositionDetail::find($instance->company_position_detail_id);
                if ($com) $com->delete();
            }

            // Create

            foreach ($positionCreate as $position_id) {
                foreach ($arrPo as $positionItem) {
                    if ($positionItem['position_id'] == $position_id) {
                        $query = clone $existingCompanies;
                        $instance = $query->where('company_id', $company)->first();
                        CompanyPositionDetail::create([
                            "register_internship_company_id" => $instance->register_internship_company_id,
                            "position_id" => $positionItem['position_id'],
                            "position_quantity" => $positionItem['position_quantity'],
                        ]);
                        break;
                    }
                }
            }
        }

        // Delete company
        foreach ($companiesDelete as $company) {
            $instance = $existingCompanies->where('company_id', $company);
            $instance->delete();
        }

        // Create
        foreach ($companiesCreate as $company) {
            $instance = $companiesUpdate->where('company_id', $company)->first();
            $registerInternship_Company = RegisterIntershipCompany::create([
                'internship_graduation_id' => $internship_graduation_id,
                ...$instance
            ]);
            foreach ($instance['positions'] as $position) {
                CompanyPositionDetail::create([
                    'register_internship_company_id' => $registerInternship_Company->register_internship_company_id,
                    ...$position
                ]);
            }
        }

        return $this->sentSuccessResponse(null, 'Update successfully', Response::HTTP_OK);
    }

    public function getRegisterInternshipByUser()
    {
        $displayConfig = DisplayConfig::find('register_intern')->display_config_value ?? InternshipGraduation::latest()->first()->internship_graduation_id;
        $companyInternship = RegisterIntershipCompany::where('internship_graduation_id', $displayConfig)->get()->map(function ($companyInternship) {
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
}
