<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSpecialtyRequest;
use App\Http\Requests\UpdateSpecialtyRequest;
use App\Http\Resources\Collection;
use App\Http\Resources\SpecialtyResource;
use App\Models\Major;
use App\Models\Specialty;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SpecialtyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    protected $specialty;

    public function __construct(Specialty $specialty)
    {
        $this->specialty = $specialty;
    }

    public function index(Request $request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $sortBy = $request->input('sortBy');
        $sortOrder = $request->input('sortOrder', 'asc');
        $filters = $request->input('filters');
        $specialtys = $this->specialty->query();
        $specialtys = $this->specialty->query()->leftJoin('majors', 'specialties.major_id', '=', 'majors.major_id')->select('specialties.*', 'majors.major_name');
        $specialtys->where("specialty_isDelete", "0");
        if ($query) {
            $specialtys->where("specailty_name", "LIKE", "%$query%");
        }
        if ($id) {
            $specialtys->where('specailty_id', $id);
        }
        if ($sortBy) {
            $specialtys->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $specialtys->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }
        if ($all && $all == true) {
            $specialtys = $specialtys->get();
        } else {
            $specialtys = $specialtys->paginate($perPage ?? 10);
        }

        $specialtyCollection = new Collection($specialtys);
        return $this->sentSuccessResponse($specialtyCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSpecialtyRequest $request)
    {
        $dataCreate = $request->all();
        $dataCreate['specialty_isDelete'] = 0;
        $specialty = $this->specialty->create($dataCreate);
        $major_name = Major::findOrFail($specialty->major_id);
        $specialty->major_name = $major_name->major_name;
        $specialtyResource = new SpecialtyResource($specialty);
        return $this->sentSuccessResponse($specialtyResource, "Create specialty success", Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $specialty = $this->specialty->where('specialty_id', $id)->firstOrFail();
            if ($specialty->specialty_isDelete == 1) {
                return response()->json([
                    'message' => 'Specialty is deleted',
                ], 404);
            } else {
                $specialtyWithMajor = $this->specialty->query()
                    ->leftJoin('majors', 'specialties.major_id', '=', 'majors.major_id')
                    ->select('specialties.*', 'majors.major_name')
                    ->where('specialties.specialty_id', $id)
                    ->firstOrFail();
                $specialtyResource = new SpecialtyResource($specialtyWithMajor);
                return $this->sentSuccessResponse($specialtyResource, "Get specialty success", Response::HTTP_OK);
            }
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Specialty not found',
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSpecialtyRequest $request, $id)
    {
        $specialty = $this->specialty->where('specialty_id', $id)->firstOrFail();
        $dataUpdate = $request->all();
        $specialty->update($dataUpdate);
        $major_name = Major::findOrFail($specialty->major_id);
        $specialty->major_name = $major_name->major_name;
        $specialtyResource = new SpecialtyResource($specialty);
        return $this->sentSuccessResponse($specialtyResource, "Update specialty success", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $specialty = $this->specialty->where('specialty_id', $id)->firstOrFail();
        $specialty->specialty_isDelete = 1;
        $specialty->save();
        $specialtyResoure = new specialtyResource($specialty);
        return $this->sentSuccessResponse($specialtyResoure, "Delete specialty success", Response::HTTP_OK);
    }
}
