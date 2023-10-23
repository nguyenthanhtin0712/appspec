<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Collection;
use App\Models\InternshipGraduation;
use App\Models\JobHolder;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GradingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $user_id = $request->user()->user_id;
      $jobholder_code = JobHolder::where('user_id', "$user_id")->first()->jobholder_code;
      $all = $request->input('all');
      $perPage = $request->input('perPage');
      $query = $request->input('query');
      $sortBy = $request->input('sortBy');
      $sortOrder = $request->input('sortOrder', 'asc');
      $filters = $request->input('filters');
      $internshipGraduation = InternshipGraduation::with('openclasstime')->leftJoin('jobholder_internships', 'jobholder_internships.internship_graduation_id' ,'internship_graduations.internship_graduation_id')->where('jobholder_code', $jobholder_code)->where('internship_graduation_isDelete', 0);
      if ($query) {
          $internshipGraduation->where("openclass_time_id", "LIKE", "%$query%");
      }
      if ($sortBy) {
          $internshipGraduation->orderBy($sortBy, $sortOrder);
      }
      if ($filters) {
          $filters = json_decode($filters, true);
          if (is_array($filters)) {
              foreach ($filters as $filter) {
                  $id = $filter['id'];
                  $value = $filter['value'];
                  $internshipGraduation->where($id, 'LIKE', '%' . $value . '%');
              }
          }
      }
      if ($all && $all == true) {
          $internshipGraduation = $internshipGraduation->get();
      } else {
          $internshipGraduation = $internshipGraduation->paginate($perPage ?? 10);
      }
      $internshipGraduationCollection = new Collection($internshipGraduation);
      return $this->sentSuccessResponse($internshipGraduationCollection, "Get data success", Response::HTTP_OK);
    }

    
}
