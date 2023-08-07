<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRegisterSpecialtyRequest;
use App\Http\Resources\Collection;
use App\Http\Resources\RegisterSpecialtyResource;
use App\Models\DisplayConfig;
use App\Models\RegisterSpecialty;
use App\Models\Specialty;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;

use function PHPSTORM_META\map;

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
        $registerSpecialty = RegisterSpecialty::find($id);
        if (!$registerSpecialty || $registerSpecialty->register_specialty_isDelete == 1) {
            return response()->json([
                'message' => 'Resource unavailable',
            ], 404);
        } else {
            $registerSpecialtyResoure = new RegisterSpecialtyResource($registerSpecialty);
            return $this->sentSuccessResponse($registerSpecialtyResoure, "Get data success", Response::HTTP_OK);
        }
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

    public function getRegisterSpecialtyByUser()
    {
        $displayConfig = DisplayConfig::find('REGISTER_SPECIALTY')->display_config_value;
        $registerSpecialty = RegisterSpecialty::with(['specialty.major', 'specialty.student'])->find($displayConfig);
        $groupedSpecialties = $registerSpecialty->specialty->groupBy('major.major_id')->map(function ($specialties) use ($displayConfig) {
            $major = $specialties->first()->major;
            $specialtiesData = $specialties->map(function ($value) use ($displayConfig) {
                return [
                    "specialty_id" => $value->specialty_id,
                    "specialty_name" => $value->specialty_name,
                    "specialty_quantity" => $value->pivot->specialty_quantity,
                    "specialty_registered" => $value->student->where('register_specialty_id', $displayConfig)->count()
                ];
            });
            return [
                "major_id" => $major->major_id,
                "major_name" => $major->major_name,
                "specialties" => $specialtiesData->all(),
            ];
        });

        $selectedColumns = $registerSpecialty->only([
            'register_specialty_id',
            'register_specialty_name',
            'register_specialty_start_date',
            'register_specialty_end_date'
        ]);

        $selectedColumns['register_specialty_detail'] = $groupedSpecialties->values()->all();

        return $this->sentSuccessResponse($selectedColumns, "Get data success", Response::HTTP_OK);
    }

    public function getSpecialtiesForRegister(Request $request)
    {
        $displayConfig = DisplayConfig::find('REGISTER_SPECIALTY')->display_config_value;
        $major_id = $request->user()->student->major_id;

        $registerSpecialty = RegisterSpecialty::with(['specialty' => function ($query) use ($major_id) {
            $query->where('major_id', $major_id);
        }])->find($displayConfig);

        $specialtyInfo = $registerSpecialty->specialty->map(function ($specialty) use ($displayConfig) {
            return [
                'specialty_id' => $specialty->specialty_id,
                'specialty_name' => $specialty->specialty_name,
                'specialty_quantity' => $specialty->pivot->specialty_quantity,
                'specialty_registered' => Student::where('register_specialty_id', $displayConfig)->where('specialty_id', $specialty->specialty_id)->count()
            ];
        });

        $result = [
            'register_specialty_name' => $registerSpecialty->register_specialty_name,
            'register_specialty_start_date' => $registerSpecialty->register_specialty_start_date,
            'register_specialty_end_date' => $registerSpecialty->register_specialty_end_date,
            'major_id' => $major_id,
            'statistic' => $specialtyInfo
        ];
        return $this->sentSuccessResponse($result, "Get data success", Response::HTTP_OK);
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

    public function changeSpecialty(Request $request)
    {
        $students = $request->input('students');
        $specialty_id = $request->input('specialty_id');
        foreach ($students as $student_id) {
            $student = Student::where('student_code', $student_id)->first();
            $student->specialty_id = $specialty_id;
            $student->save();
            echo json_encode($student);
        }
    }

    public function getMajorsResult(Request $request)
    {
        $id = $request->input('id', DisplayConfig::find('REGISTER_SPECIALTY')->display_config_value);
        $registerSpecialty = RegisterSpecialty::with(['specialty.major'])->find($id);
        $majors = $registerSpecialty->specialty->pluck('major')->unique()->values();
        $result = $majors->map->only(['major_id', 'major_name']);
        return $this->sentSuccessResponse($result, "Get data success", Response::HTTP_OK);
    }

    public function getResult(Request $request)
    {
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $sortBy = $request->input('sortBy');
        $register_specialty_id = $request->input('id') ?? DisplayConfig::find('REGISTER_SPECIALTY')->display_config_value;
        $sortOrder = $request->input('sortOrder', 'asc');
        $filters = $request->input('filters');
        $major_id = $request->input('majorId');

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
            ->where('students.register_specialty_id', $register_specialty_id)
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
        $dataStudent = $queryBuilder->paginate($perPage);

        $statistic = RegisterSpecialty::find($register_specialty_id)->specialty
            ->filter(function ($specialty) use ($major_id) {
                return $specialty->major->major_id === $major_id;
            })
            ->map(function ($specialty) use ($register_specialty_id) {
                return [
                    'specialty_id' => $specialty->specialty_id,
                    'specialty_name' => $specialty->specialty_name,
                    'specialty_quantity' => $specialty->pivot->specialty_quantity,
                    'specialty_registered' => Student::where('register_specialty_id', $register_specialty_id)->where('specialty_id', $specialty->specialty_id)->count()
                ];
            })->values();

        $registerSpecialtiesCollection = new Collection($dataStudent);
        $dataResult = [
            'statistic' => $statistic,
            'students' =>   $registerSpecialtiesCollection
        ];

        return $this->sentSuccessResponse($dataResult, "Get data success", Response::HTTP_OK);
    }
}
