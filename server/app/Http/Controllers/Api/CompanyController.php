<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Http\Resources\Collection;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CompanyController extends Controller
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
        $company = Company::with("user")
            ->where("company_isDelete", "0");
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
            $company = $company->paginate($perPage ?? 10);
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
    public function store(StoreCompanyRequest $request)
    {
        $user_firstname = $request->input('user_firstname');
        $user_lastname = $request->input('user_lastname');
        $user_email = $request->input('user_email');
        $user_phone = $request->input('user_phone');
        $user_password = $request->input('user_password');
        $user = User::create([
            'user_firstname' => "$user_firstname",
            'user_lastname' => "$user_lastname",
            'user_email' => "$user_email",
            'user_phone' => "$user_phone",
            'user_password' => "$user_password"
        ]);
        $company_name = $request->input('company_name');
        $company_address = $request->input('company_address');
        $company_host = $request->input('company_host');
        $company_is_official = $request->input('company_is_official');
        $company = Company::create([
            'company_name' => "$company_name",
            'user_id' => "$user->user_id",
            'company_address' => "$company_address",
            'company_host' => "$company_host",
            'company_is_official' => "$company_is_official",
        ]);
        $result = Company::with('user')
            ->where('company_id', $company->company_id)->firstOrFail();
        return $this->sentSuccessResponse($result, "Add company success", Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $comapny = Company::where('company_id', $id)->firstOrFail();
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
    public function update(UpdateCompanyRequest $request, $id)
    {
        $company_name = $request->input('company_name');
        $company_address = $request->input('company_address');
        $company_host = $request->input('company_host');
        $company_is_official = $request->input('company_is_official');
        $comapny = Company::where('company_id', $id)->firstOrFail();
        $comapny->company_name = $company_name;
        $comapny->company_address = $company_address;
        $comapny->company_host = $company_host;
        $comapny->company_is_official = $company_is_official;
        $comapny->save();
        $user = User::find($comapny->user_id);
        $user_firstname = $request->input('user_firstname');
        $user_lastname = $request->input('user_lastname');
        $user_email = $request->input('user_email');
        $user_phone = $request->input('user_phone');
        $user->user_firstname = $user_firstname;
        $user->user_lastname = $user_lastname;
        $user->user_email = $user_email;
        $user->user_phone = $user_phone;
        $user->save();
        $company = Company::with('user')->where('company_id', $id)->firstOrFail();
        return $this->sentSuccessResponse($company, "Update company success", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $company = Company::where('company_id', $id)->firstOrFail();
        $company->company_isDelete = 1;
        $company->save();
        return $this->sentSuccessResponse($company, "Delete user success", Response::HTTP_OK);
    }
}
