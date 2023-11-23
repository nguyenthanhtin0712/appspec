<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\JobHolder;
use App\Models\JobPost;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StatisticsController extends Controller
{
    public function index(Request $request)
    {
        $job_holder_number = JobHolder::where('jobholder_isDelete', 0)->count();
        $company_number = Company::where('company_isDelete', 0)->where('company_is_official', 1)->count();
        $page_number = Page::where('page_isDelete', 0)->count();
        $job_post_number = JobPost::where('job_post_isDelete', 0)->count();

        $result = [
            "job_holder_number" => $job_holder_number,
            "company_number" => $company_number,
            "page_number" => $page_number,
            "job_post_number" => $job_post_number,
        ];

        return $this->sentSuccessResponse($result, "Get data success", Response::HTTP_OK);
    }
}
