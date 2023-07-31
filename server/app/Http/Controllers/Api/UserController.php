<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\Collection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Http\Request;


class UserController extends Controller
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $user_id = $request->input('id');
        $sortBy = $request->input('sortBy');
        $sortOrder = $request->input('sortOrder', 'asc');
        $filters = $request->input('filters');
        $users = $this->user->query();

        $users->where('user_isDelete', '0');

        if ($query) {
            $users->where(function ($q) use ($query) {
                $q->whereRaw("CONCAT(user_firstname, ' ', user_lastname) LIKE '%$query%'");
            });
        }
        if ($user_id) {
            $users->where('user_id', $user_id);
        }
        if ($sortBy) {
            $users->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $users->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }
        if ($perPage) {
            $users = $users->paginate($perPage);
        } else {
            $users = $users->paginate(10);
        }
        $userCollection = new Collection($users);
        return $this->sentSuccessResponse($userCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $dataCreate = $request->all();
        $user = $this->user->create($dataCreate);
        $userResoure = new UserResource($user);
        return $this->sentSuccessResponse($userResoure, "Create user success", Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = $this->user->where('user_id', $id)->firstOrFail();
        if ($user->user_isDelete == 1) {
            return response()->json([
                'message' => 'User is deleted',
            ], 404);
        } else {
            $userResoure = new UserResource($user);
            return $this->sentSuccessResponse($userResoure, "Get user success", Response::HTTP_OK);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, $id)
    {
        $user = $this->user->where('user_id', $id)->firstOrFail();
        $dataUpdate = $request->all();
        $user->update($dataUpdate);
        $userResource = new UserResource($user);
        return $this->sentSuccessResponse($userResource, "Update user success", Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $user = $this->user->where('user_id', $id)->firstOrFail();
        $user->user_isDelete = 1;
        $user->save();
        $userResoure = new UserResource($user);
        return $this->sentSuccessResponse($userResoure, "Delete user success", Response::HTTP_OK);
    }
}
