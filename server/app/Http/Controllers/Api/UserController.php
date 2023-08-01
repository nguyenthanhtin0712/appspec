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

    public function uploadImage()
    {
        // Only these origins are allowed to upload images 
        $accepted_origins = array("http://localhost", "https://www.codexworld.com");

        // Set the upload folder 
        $imageFolder = "uploads/";

        if (isset($_SERVER['HTTP_ORIGIN'])) {
            // same-origin requests won't set an origin. If the origin is set, it must be valid. 
            if (in_array($_SERVER['HTTP_ORIGIN'], $accepted_origins)) {
                header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
            } else {
                header("HTTP/1.1 403 Origin Denied");
                return;
            }
        }

        // Don't attempt to process the upload on an OPTIONS request 
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            header("Access-Control-Allow-Methods: POST, OPTIONS");
            return;
        }

        reset($_FILES);
        $temp = current($_FILES);
        if (is_uploaded_file($temp['tmp_name'])) {
            /* 
      If your script needs to receive cookies, set images_upload_credentials : true in 
      the configuration and enable the following two headers. 
    */
            // header('Access-Control-Allow-Credentials: true'); 
            // header('P3P: CP="There is no P3P policy."'); 

            // Sanitize input 
            if (preg_match("/([^\w\s\d\-_~,;:\[\]\(\).])|([\.]{2,})/", $temp['name'])) {
                header("HTTP/1.1 400 Invalid file name.");
                return;
            }

            // Verify extension 
            if (!in_array(strtolower(pathinfo($temp['name'], PATHINFO_EXTENSION)), array("gif", "jpg", "jpeg", "png"))) {
                header("HTTP/1.1 400 Invalid extension.");
                return;
            }

            // Accept upload if there was no origin, or if it is an accepted origin 
            $filetowrite = $imageFolder . $temp['name'];
            if (move_uploaded_file($temp['tmp_name'], $filetowrite)) {
                // Determine the base URL 
                $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on' ? "https://" : "http://";
                $baseurl = $protocol . $_SERVER["HTTP_HOST"] . rtrim(dirname($_SERVER['REQUEST_URI']), "/") . "/";

                // Respond to the successful upload with JSON. 
                // Use a location key to specify the path to the saved image resource. 
                // { location : '/your/uploaded/image/file'} 
                echo json_encode(array('location' => $baseurl . $filetowrite));
            } else {
                header("HTTP/1.1 400 Upload failed.");
                return;
            }
        } else {
            // Notify editor that the upload failed 
            header("HTTP/1.1 500 Server Error");
        }
    }
}
