<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RegisterOpenClassController extends Controller
{
    public function register(Request $request)
    {
        $student_code = $request->user()->student->student_code;

        echo json_encode([...$request->all(), "student_code" => $student_code]);
    }
}
