<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTitleRequest;
use App\Http\Requests\UpdateTitleRequest;
use App\Http\Resources\Collection;
use App\Models\Title;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TitleController extends Controller
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
        $titles = Title::query();
        $titles->where("title_isDelete", "0");
        if ($query) {
            $titles->where("title_name", "LIKE", "%$query%");
        }
        if ($id) {
            $titles->where('title_id', $id);
        }
        if ($sortBy) {
            $titles->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $titles->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }
        if ($all && $all == true) {
            $titles = $titles->get();
        } else {
            $titles = $titles->paginate($perPage ?? 10);
        }
        $titlesCollection = new Collection($titles);
        return $this->sentSuccessResponse($titlesCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTitleRequest $request)
    {
        $dataCreate = $request->all();
        $dataCreate['title_isDelete'] = 0;
        $title = Title::create($dataCreate);
        return $this->sentSuccessResponse($title, "Create title success", Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $title = Title::where('title_id', $id)->firstOrFail();
        if ($title->title_isDelete == 1) {
            return response()->json([
                'message' => 'Title is deleted',
            ], 404);
        } else {
            return $this->sentSuccessResponse($title, "Get title success", Response::HTTP_OK);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTitleRequest $request, $id)
    {
        $title = Title::where('title_id', $id)->firstOrFail();
        $dataUpdate = $request->all();
        $title->update($dataUpdate);
        return $this->sentSuccessResponse($title, "Update title success", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $title = Title::where('title_id', $id)->firstOrFail();
        $title->title_isDelete = 1;
        $title->save();
        return $this->sentSuccessResponse($title, "Delete title success", Response::HTTP_OK);
    }
}
