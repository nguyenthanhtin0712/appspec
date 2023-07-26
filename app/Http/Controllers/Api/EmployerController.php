<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployerRequest;
use App\Http\Requests\UpdateEmployerRequest;
use App\Http\Resources\Collection;
use App\Http\Resources\EmployerResource;
use App\Models\Employer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class EmployerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    protected $employer;

    public function __construct(Employer $employer)
    {
        $this->employer = $employer;
    }

    public function index(Request $request)
    {
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $sortBy = $request->input('sortBy');
        $sortOrder = $request->input('sortOrder', 'asc');
        $filters = $request->input('filters');
        $employers = $this->employer->query();
        $employers->where("employer_isDelete", "0");
        if ($query) {
            $employers->where("employer_name", "LIKE", "%$query%");
        }
        if ($id) {
            $employers->where('employer_id', $id);
        }
        if ($sortBy) {
            $employers->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $employers->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }
        if ($perPage) {
            $employers = $employers->paginate($perPage);
        } else {
            $employers = $employers->paginate(10);
        }
        $employerCollection = new Collection($employers);
        return $this->sentSuccessResponse($employerCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEmployerRequest $request)
    {
        $dataCreate = $request->all();
        $dataCreate['employer_isDelete'] = 0;
        $employer = $this->employer->create($dataCreate);
        $employerResource = new EmployerResource($employer);
        return $this->sentSuccessResponse($employerResource, "Create employer success", Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $employer = $this->employer->where('user_id', $id)->firstOrFail();
        if ($employer->employer_isDelete == 1) {
            return response()->json([
                'message' => 'employer is deleted',
            ], 404);
        } else {
            $employerResoure = new EmployerResource($employer);
            return $this->sentSuccessResponse($employerResoure, "Get employer success", Response::HTTP_OK);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEmployerRequest $request, $id)
    {
        $employer = $this->employer->where('user_id', $id)->firstOrFail();
        $dataUpdate = $request->all();
        $employer->update($dataUpdate);
        $employerResource = new EmployerResource($employer);
        return $this->sentSuccessResponse($employerResource, "Update employer success", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $employer = $this->employer->where('user_id', $id)->firstOrFail();
        $employer->employer_isDelete = 1;
        $employer->save();
        $employerResoure = new EmployerResource($employer);
        return $this->sentSuccessResponse($employerResoure, "Delete user success", Response::HTTP_OK);
    }
}
