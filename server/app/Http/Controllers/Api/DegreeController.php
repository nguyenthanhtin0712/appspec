<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Collection;
use App\Models\Degree;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DegreeController extends Controller
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
        $degree = Degree::query();
        $degree->where("degree_isDelete", "0");
        if ($query) {
            $degree->where("degree_name", "LIKE", "%$query%");
        }
        if ($id) {
            $degree->where('degree_id', $id);
        }
        if ($sortBy) {
            $degree->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $degree->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }
        if ($all && $all == true) {
            $degree = $degree->get();
        } else {
            if ($perPage) {
                $degree = $degree->paginate($perPage);
            } else {
                $degree = $degree->paginate(10);
            }
        }
        $degreeCollection = new Collection($degree);
        return $this->sentSuccessResponse($degreeCollection, "Get data success", Response::HTTP_OK);
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
}
