<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInternshipCompanyRequest;
use App\Http\Requests\UpdateInternshipCompanyRequest;
use App\Http\Resources\Collection;
use App\Models\InternshipCompany;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InternCompanyController extends Controller
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
        $company = InternshipCompany::where("company_isDelete", "0");
        if ($query) {
            $company->where("company_name", "LIKE", "%$query%");
        }
        if ($id) {
            $company->where('company_id', $id);
        }
        if ($sortBy) {
            $company->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $company->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }
        if ($all && $all == true) {
            $company = $company->get();
        } else {
            if ($perPage) {
                $company = $company->paginate($perPage);
            } else {
                $company = $company->paginate(10);
            }
        }
        $companyCollection = new Collection($company);
        return $this->sentSuccessResponse($companyCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreInternshipCompanyRequest $request)
    {
        $company_name = $request->input('company_name');
        $company_phone = $request->input('company_phone');
        $company_address = $request->input('company_address');
        $company_host = $request->input('company_host');
        $company_is_official = $request->input('company_is_official');
        $company = InternshipCompany::create([
            'company_name' => "$company_name",
            'company_phone' => "$company_phone",
            'company_address' => "$company_address",
            'company_host' => "$company_host",
            'company_is_official' => "$company_is_official",
        ]);
        return $this->sentSuccessResponse($company, "Add company success", Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $comapny = InternshipCompany::where('company_id', $id)->firstOrFail();
        if ($comapny->comapny_isDelete == 1) {
            return response()->json([
                'message' => 'Comapny is deleted',
            ], 404);
        } else {
            return $this->sentSuccessResponse($comapny, "Get company success", Response::HTTP_OK);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateInternshipCompanyRequest $request, $id)
    {
        $company_name = $request->input('company_name');
        $company_phone = $request->input('company_phone');
        $company_address = $request->input('company_address');
        $company_host = $request->input('company_host');
        $company_is_official = $request->input('company_is_official');
        $comapny = InternshipCompany::where('company_id', $id)->firstOrFail();
        $comapny->company_name = $company_name;
        $comapny->company_phone = $company_phone;
        $comapny->company_address = $company_address;
        $comapny->company_host = $company_host;
        $comapny->company_is_official = $company_is_official;
        $comapny->save();
        return $this->sentSuccessResponse($comapny, "Update company success", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $company = InternshipCompany::where('company_id', $id)->firstOrFail();
        $company->company_isDelete = 1;
        $company->save();
        return $this->sentSuccessResponse($company, "Delete user success", Response::HTTP_OK);
    }
}
