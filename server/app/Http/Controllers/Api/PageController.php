<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;
use App\Http\Resources\Collection;
use App\Http\Resources\PageResource;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PageController extends Controller
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
        $pages = Page::select('page_id', 'page_slug', 'page_title', 'created_at', 'updated_at')->orderBy('updated_at', 'desc');
        $pages->where("page_isDelete", "0");
        if ($query) {
            $pages->where("page_name", "LIKE", "%$query%");
        }
        if ($id) {
            $pages->where('page_id', $id);
        }
        if ($sortBy) {
            $pages->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $pages->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }

        if ($all && $all == true) {
            $pages = $pages->get();
        } else {
            $pages = $pages->paginate($perPage ?? 10);
        }

        $subjectCollection = new Collection($pages);
        return $this->sentSuccessResponse($subjectCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePageRequest $request)
    {
        $dataCreate = $request->all();
        $page = Page::create($dataCreate);
        return $this->sentSuccessResponse($page, "Create page successfully", Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $page = Page::where('page_id', $id)->where('page_isDelete', 0)->firstOrFail()->makeHidden('page_isDelete');
        return $this->sentSuccessResponse($page, 'Get page content successfully', Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePageRequest $request, $id)
    {
        $page = Page::where('page_id', $id)->firstOrFail();
        $dataUpdate = $request->all();
        $page->update($dataUpdate);
        $pageResource = new PageResource($page);
        return $this->sentSuccessResponse($pageResource, "Update page success", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $page = Page::where('page_id', $id)->where('page_isDelete', 0)->firstOrFail();
        $page->page_isDelete = 1;
        $page->save();
        $pageResource = new PageResource($page);
        return $this->sentSuccessResponse($pageResource, 'Deleted page successfully', Response::HTTP_OK);
    }

    public function viewPage($slug)
    {
        $page = Page::where('page_slug', $slug)->where('page_isDelete', 0)->firstOrFail()->makeHidden('page_isDelete');
        return $this->sentSuccessResponse($page, 'Get page content successfully', Response::HTTP_OK);
    }
}
