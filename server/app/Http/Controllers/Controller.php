<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function sentSuccessResponse($data = '', $message='success',$status = 200){
        return \response()->json([
            'data' => $data,
            'message' => $message,
            'status' => $status
        ]);
    }

    public function sentErrorResponse($data = '', $message='error',$status = 400){
        return \response()->json([
            'data' => $data,
            'message' => $message,
            'status' => $status
        ]);
    }
}