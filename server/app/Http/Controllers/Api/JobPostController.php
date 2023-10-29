<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Collection;
use App\Http\Resources\JobPostResource;
use App\Models\JobPost;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class JobPostController extends Controller
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
        $posts = JobPost::leftJoin('users', 'users.user_id', 'job_posts.user_id')
            ->selectRaw('job_post_id, job_post_title, job_post_confirm, CONCAT(user_firstname, " ", user_lastname) as author_name, job_posts.created_at, job_posts.updated_at')
            ->orderBy('created_at', 'desc');
        $posts->where("job_post_isDelete", "0");
        if ($query) {
            $posts->where("job_post_title", "LIKE", "%$query%");
        }
        if ($id) {
            $posts->where('job_post_id', $id);
        }
        if ($sortBy) {
            $posts->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $posts->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }

        if ($all && $all == true) {
            $posts = $posts->get();
        } else {
            $posts = $posts->paginate($perPage ?? 10);
        }

        $subjectCollection = new Collection($posts);
        return $this->sentSuccessResponse($subjectCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user_id = $request->user()->user_id;
        $dataCreate = $request->all();
        $posts = JobPost::create([...$dataCreate, 'user_id' => $user_id]);
        return $this->sentSuccessResponse($posts, "Create job post successfully", Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = JobPost::where('job_post_id', $id)->where('job_post_isDelete', 0)
            ->firstOrFail()
            ->makeHidden('job_post_isDelete', 'user_id');
        return $this->sentSuccessResponse($post, 'Get post successfully', Response::HTTP_OK);
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
        $post = JobPost::where('job_post_id', $id)->firstOrFail();
        $dataUpdate = $request->all();
        $post->update($dataUpdate);
        $jobpost = new JobPostResource($post);
        return $this->sentSuccessResponse($jobpost, "Update post success", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = JobPost::where('job_post_id', $id)->where('job_post_isDelete', 0)->firstOrFail();
        $post->job_post_isDelete = 1;
        $post->save();
        $jobpost = new JobPostResource($post);
        return $this->sentSuccessResponse($jobpost, 'Deleted post successfully', Response::HTTP_OK);
    }

    public function confirmPost(Request $request, $id)
    {
        $value = $request->input('confirm');
        $post = JobPost::findOrFail($id);
        $post->job_post_confirm = $value;
        $post->save();
        $jobpost = new JobPostResource($post);
        return $this->sentSuccessResponse($jobpost, 'Update state successfully', Response::HTTP_OK);
    }

    public function getUserPosts(Request $request)
    {
        $user_id = $request->user()->user_id;
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $sortBy = $request->input('sortBy');
        $sortOrder = $request->input('sortOrder', 'asc');
        $filters = $request->input('filters');
        $posts = JobPost::select('job_post_id', 'job_post_title', 'job_post_confirm', 'created_at', 'updated_at')->orderBy('updated_at', 'desc');
        $posts->where('user_id', $user_id)->where("job_post_isDelete", "0");
        if ($query) {
            $posts->where("job_post_title", "LIKE", "%$query%");
        }
        if ($id) {
            $posts->where('job_post_id', $id);
        }
        if ($sortBy) {
            $posts->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $posts->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }

        if ($all && $all == true) {
            $posts = $posts->get();
        } else {
            $posts = $posts->paginate($perPage ?? 10);
        }

        $subjectCollection = new Collection($posts);
        return $this->sentSuccessResponse($subjectCollection, "Get data success", Response::HTTP_OK);
    }
}
