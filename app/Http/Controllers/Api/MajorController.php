<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMajorRequest;
use App\Http\Requests\UpdateMajorRequest;
use App\Http\Resources\Collection;
use App\Http\Resources\MajorResource;
use App\Models\Major;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class MajorController extends Controller
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
        $majors = Major::query();
        $majors->where("major_isDelete", "0");
        if ($query) {
            $majors->where("major_name", "LIKE", "%$query%");
        }
        if ($id) {
            $majors->where('major_id', $id);
        }
        if ($sortBy) {
            $majors->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $majors->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }
        if ($all && $all == true) {
            $majors = $majors->get();
        } else {
            if ($perPage) {
                $majors = $majors->paginate($perPage);
            } else {
                $majors = $majors->paginate(10);
            }
        }
        $userCollection = new Collection($majors);
        return $this->sentSuccessResponse($userCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMajorRequest $request)
    {
        $dataCreate = $request->all();
        $dataCreate['major_isDelete'] = 0;
        $major = Major::create($dataCreate);
        $majorResource = new MajorResource($major);
        return $this->sentSuccessResponse($majorResource, "Create major success", Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $major = Major::where('major_id', $id)->firstOrFail();
        if ($major->major_isDelete == 1) {
            return response()->json([
                'message' => 'Major is deleted',
            ], 404);
        } else {
            $majorResoure = new MajorResource($major);
            return $this->sentSuccessResponse($majorResoure, "Get major success", Response::HTTP_OK);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMajorRequest $request, $id)
    {
        $major = Major::where('major_id', $id)->firstOrFail();
        $dataUpdate = $request->all();
        $major->update($dataUpdate);
        $majorResource = new MajorResource($major);
        return $this->sentSuccessResponse($majorResource, "Update major success", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $major = Major::where('major_id', $id)->firstOrFail();
        $major->major_isDelete = 1;
        $major->save();
        $majorResoure = new MajorResource($major);
        return $this->sentSuccessResponse($majorResoure, "Delete user success", Response::HTTP_OK);
    }

    public function getAllSpecialty()
    {
        $majors = Major::with(['specialties' => function ($query) {
            $query->where('specialty_isDelete', 0);
        }])->get();

        return $this->sentSuccessResponse($majors, "Get data success", Response::HTTP_OK);
    }
}