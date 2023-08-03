<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRegisterSpecialtyRequest;
use App\Http\Resources\Collection;
use App\Http\Resources\RegisterSpecialtyResource;
use App\Http\Resources\ResultRegisterSpecialtyResource;
use App\Models\DisplayConfig;
use App\Models\RegisterSpecialty;
use App\Models\RegisterSpecialtyDetail;
use App\Models\Specialty;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;

class RegisterSpecialtyController extends Controller
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
        $registerSpecialties = RegisterSpecialty::query();
        $registerSpecialties->where("register_specialty_isDelete", "0");
        if ($query) {
            $registerSpecialties->where("register_specialty_name", "LIKE", "%$query%");
        }
        if ($id) {
            $registerSpecialties->where('register_specialty_id', $id);
        }
        if ($sortBy) {
            $registerSpecialties->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $registerSpecialties->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }
        if ($all && $all == true) {
            $registerSpecialties = $registerSpecialties->get();
        } else {
            if ($perPage) {
                $registerSpecialties = $registerSpecialties->paginate($perPage);
            } else {
                $registerSpecialties = $registerSpecialties->paginate(10);
            }
        }
        $registerSpecialtiesCollection = new Collection($registerSpecialties);
        return $this->sentSuccessResponse($registerSpecialtiesCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRegisterSpecialtyRequest $request)
    {
        $dataCreate =  $request->all();
        $registerSpecialty = RegisterSpecialty::create($dataCreate);
        if ($request->has('register_specialty_detail')) {
            $registerSpecialty->specialty()->attach($request->input('register_specialty_detail'));
        }
        $registerSpecialtyResource = new RegisterSpecialtyResource($registerSpecialty);
        return $this->sentSuccessResponse($registerSpecialtyResource, "Create register specialty success", Response::HTTP_OK);
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
        $registerSpecialty = RegisterSpecialty::find($id);
        $registerSpecialty->register_specialty_isDelete = 1;
        $registerSpecialty->save();
        $registerSpecialtyResource = new RegisterSpecialtyResource($registerSpecialty);
        return $this->sentSuccessResponse($registerSpecialtyResource, "Delete success", Response::HTTP_OK);
    }

    public function getRegisterSpecialtyByUser(Request $request)
    {
        $displayConfig = DisplayConfig::find('REGISTER_SPECIALTY')->display_config_value;
        $registerSpecialty = RegisterSpecialty::with('specialty.major')->find($displayConfig);
        $arrDetail = [];
        foreach ($registerSpecialty->specialty as $value) {
            $majorId = $value->major->major_id;
            if (!isset($arrDetail[$majorId])) {
                $arrDetail[$majorId] = [
                    'major_id' => $value->major->major_id,
                    'major_name' => $value->major->major_name,
                    'specialties' => [],
                ];
            }

            $specialtyRegisteredCount = Specialty::find($value->specialty_id)->student->whereBetween('specialty_date', [
                Carbon::parse($registerSpecialty->register_specialty_start_date),
                Carbon::parse($registerSpecialty->register_specialty_end_date)
            ])->count();

            $arrDetail[$majorId]['specialties'][] = [
                "specialty_id" => $value->specialty_id,
                "specialty_name" => $value->specialty_name,
                "specialty_quantity" => $value->pivot->specialty_quantity,
                "specialty_registered" => $specialtyRegisteredCount
            ];
        }
        $selectedColumns = $registerSpecialty->only([
            'register_specialty_id',
            'register_specialty_name',
            'register_specialty_start_date',
            'register_specialty_end_date',
            'register_specialty_course'
        ]);
        $selectedColumns['user_major_id'] = $request->user() ? $request->user()->student->major_id : null;
        $selectedColumns['register_specialty_detail'] = array_values($arrDetail);
        return $this->sentSuccessResponse($selectedColumns, "Get data success", Response::HTTP_OK);
    }

    public function submitRegisterSpecialty(Request $request)
    {
        $specialty_id = $request->input('specialty_id');
        $student = $request->user()->student;
        $student->specialty_id = $specialty_id;
        $student->specialty_date = Carbon::now()->toDateTimeString();
        $student->save();
        return response()->json(['message' => 'Register specialty successful'], 200);
    }

    public function getResult(Request $request)
    {
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $sortBy = $request->input('sortBy');
        $sortOrder = $request->input('sortOrder', 'asc');
        $filters = $request->input('filters');
        $major_id = $request->user()->student->major_id;
        $displayConfig = DisplayConfig::find('REGISTER_SPECIALTY')->display_config_value;
        $registerSpecialty = RegisterSpecialty::find($displayConfig);

        $queryBuilder = Student::select(
            'students.student_code',
            'students.student_class',
            'students.student_score',
            'students.specialty_date',
            'specialties.specialty_name',
            'users.user_firstname',
            'users.user_lastname'
        )
            ->leftJoin('users', 'users.user_id', '=', 'students.user_id')
            ->where('students.student_course', $registerSpecialty->register_specialty_course)
            ->whereNotNull('students.student_score')
            ->where('students.major_id', $major_id)
            ->leftJoin('specialties', 'specialties.specialty_id', '=', 'students.specialty_id');


        if ($query) {
            $queryBuilder->where(function ($queryBuilder) use ($query) {
                $queryBuilder->where("user_lastname", "LIKE", "%$query%")
                    ->orWhere("user_firstname", "LIKE", "%$query%")
                    ->orWhere("student_code", "LIKE", "%$query%");
            });
        }
        if ($id) {
            $queryBuilder->where('student_code', $id);
        }
        if ($sortBy) {
            $queryBuilder->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $queryBuilder->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }

        $perPage = $perPage ?? 10;
        $dataResult = $queryBuilder->paginate($perPage);

        $registerSpecialtiesCollection = new Collection($dataResult);
        return $this->sentSuccessResponse($registerSpecialtiesCollection, "Get data success", Response::HTTP_OK);
    }
}