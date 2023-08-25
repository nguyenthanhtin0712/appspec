<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRecruitmentPositionRequest;
use App\Http\Resources\Collection;
use App\Models\RecruitmentPosition;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RecruitmentPositionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
        $companyId = $request->input('companyId');
        $positions = RecruitmentPosition::where('company_id', $companyId);
        $positions = $positions->get();
        $positionCollection = new Collection($positions);
        return $this->sentSuccessResponse($positionCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRecruitmentPositionRequest $request)
    {
        $positionCreate = $request->all();
        $position = RecruitmentPosition::create($positionCreate);
        return $this->sentSuccessResponse($position, 'Created posotion successfully', Response::HTTP_OK);
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
