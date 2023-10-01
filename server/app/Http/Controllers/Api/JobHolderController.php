<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobholderRequest;
use App\Http\Resources\Collection;
use App\Models\JobHolder;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class JobHolderController extends Controller
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
        $jobholder = JobHolder::with('user', 'title', 'academic_field')
            ->where("jobholder_isDelete", "0");
        if ($query) {
            $jobholder->where("jobholder_code", "LIKE", "%$query%");
        }
        if ($id) {
            $jobholder->where('jobholder_code', $id);
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
            $jobholder = $jobholder->paginate($perPage ?? 10);
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
    public function store(StoreJobholderRequest $request)
    {
        $user_gender = $request->input('user_gender');
        $user_birthday = $request->input('user_birthday');
        $user_firstname = $request->input('user_firstname');
        $user_lastname = $request->input('user_lastname');
        $user_password = $request->input('user_password');
        $user_email = $request->input('user_email');
        $user_phone = $request->input('user_phone');
        $user = User::create([
            'user_firstname' => "$user_firstname",
            'user_lastname' => "$user_lastname",
            'user_password' => bcrypt($user_password),
            'user_gender' => "$user_gender",
            'user_birthday' => "$user_birthday",
            'user_email' => "$user_email",
            'user_phone' => "$user_phone",
        ]);
        $jobholder_code = $request->input('jobholder_code');
        $jobholder_position = $request->input('jobholder_position');
        $jobholder_specialty = $request->input('jobholder_specialty');
        $jobholder_type = $request->input('jobholder_type');
        $jobholder_unit = $request->input('jobholder_unit');
        $jobholder_degree = $request->input('jobholder_degree');
        $academic_field_id = $request->input('academic_field_id');
        $jobholder_isLeader = $request->input('jobholder_isLeader');

        $title_id = $request->input('title_id');
        JobHolder::create([
            'user_id' => "$user->user_id",
            'jobholder_code' => "$jobholder_code",
            'jobholder_position' => "$jobholder_position",
            'jobholder_specialty' => "$jobholder_specialty",
            'jobholder_type' => "$jobholder_type",
            'jobholder_unit' => "$jobholder_unit",
            'jobholder_degree' => "$jobholder_degree",
            'academic_field_id' => "$academic_field_id",
            'title_id' => "$title_id",
            'jobholder_isLeader' => "$jobholder_isLeader"
        ]);
        $jobholder = JobHolder::with('user', 'title', 'academic_field')
            ->where("jobholder_code", "$jobholder_code")->firstOrFail();
        return $this->sentSuccessResponse($jobholder, "Get data success", Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $jobholder = JobHolder::with('user', 'title', 'academic_field')
            ->where("jobholder_code", "$id")->firstOrFail();
        if ($jobholder->jobholder_isDelete == 1) {
            return response()->json([
                'message' => 'Jobholder is deleted',
            ], 404);
        } else {
            return $this->sentSuccessResponse($jobholder, "Get jobholder success", Response::HTTP_OK);
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
        $user = User::find($id);
        $user_gender = $request->input('user_gender');
        $user_birthday = $request->input('user_birthday');
        $user_firstname = $request->input('user_firstname');
        $user_lastname = $request->input('user_lastname');
        $user_email = $request->input('user_email');
        $user_phone = $request->input('user_phone');
        $user->user_gender = $user_gender;
        $user->user_birthday = $user_birthday;
        $user->user_firstname = $user_firstname;
        $user->user_lastname = $user_lastname;
        $user->user_email = $user_email;
        $user->user_phone = $user_phone;
        $user->save();
        $jobholder = JobHolder::where('user_id', "$id")->first();
        $jobholder_code = $request->input('jobholder_code');
        $jobholder_position = $request->input('jobholder_position');
        $jobholder_specialty = $request->input('jobholder_specialty');
        $jobholder_type = $request->input('jobholder_type');
        $jobholder_unit = $request->input('jobholder_unit');
        $jobholder_degree = $request->input('jobholder_degree');
        $academic_field_id = $request->input('academic_field_id');
        $jobholder_isLeader = $request->input('jobholder_isLeader');
        $jobholder->jobholder_code = $jobholder_code;
        $jobholder->jobholder_position = $jobholder_position;
        $jobholder->jobholder_specialty = $jobholder_specialty;
        $jobholder->jobholder_unit = $jobholder_unit;
        $jobholder->jobholder_type = $jobholder_type;
        $jobholder->jobholder_degree = $jobholder_degree;
        $jobholder->academic_field_id = $academic_field_id;
        $jobholder->jobholder_isLeader = $jobholder_isLeader;
        $jobholder->save();
        $jobholder = JobHolder::with('user', 'title', 'academic_field')
            ->where("jobholder_code", "$jobholder_code")->firstOrFail();
        return $this->sentSuccessResponse($jobholder, "Update jobholder success", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $jobholder = JobHolder::with('user', 'title', 'academic_field')
            ->where("jobholder_code", "$id")->firstOrFail();
        $jobholder->jobholder_isDelete = 1;
        $jobholder->save();
        return $this->sentSuccessResponse($jobholder, "Delete jobholder success", Response::HTTP_OK);
    }
}
