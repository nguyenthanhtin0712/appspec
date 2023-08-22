<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Collection;
use App\Models\RegisterInternship;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RegisterInternshipController extends Controller
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
        $intern_registration = RegisterInternship::with('internship_graduation', 'internship_graduation.openclasstime')
        ->where("register_internship_isDelete", "0")->latest();
        if ($query) {
            $intern_registration->where("register_internship_id", "LIKE", "%$query%");
        }
        if ($id) {
            $intern_registration->where('register_internship_id', $id);
        }
        if ($sortBy) {
            $intern_registration->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $intern_registration->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }
        if ($all && $all == true) {
            $intern_registration = $intern_registration->get();
        } else {
            if ($perPage) {
                $intern_registration = $intern_registration->paginate($perPage);
            } else {
                $intern_registration = $intern_registration->paginate(10);
            }
        }
        $intern_registrationCollection = new Collection($intern_registration);
        return $this->sentSuccessResponse($intern_registrationCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
