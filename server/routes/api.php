<?php

use App\Http\Controllers\Api\AcademicFieldController;
use App\Http\Controllers\Api\DegreeController;
use App\Http\Controllers\Api\EmployerController;
use App\Http\Controllers\Api\JobHolderController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogoutController;
use App\Http\Controllers\Api\MajorController;
use App\Http\Controllers\Api\RecruitmentPositionController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\RegisterSpecialtyController;
use App\Http\Controllers\Api\SpecialtyController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\TeacherController;
use App\Http\Controllers\Api\TitleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\DisplayConfigController;
use App\Http\Resources\LoginResource;
use App\Models\JobHolder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//Authentication api

//Này đăng nhập bằng email, mssv và password
Route::post('login', [LoginController::class, 'login']);
Route::post('register', [RegisterController::class, 'register']);

// Cái đăng nhập bằng accessToken
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return new LoginResource($request->user());
});

Route::middleware(['auth:api'])->group(function () {

    //Login vào rồi mới logout được
    Route::get('logout', [LogoutController::class, 'logout']);
    //Users
    Route::get('users', [UserController::class, 'index'])->middleware('check_user_role_permission:user.view');
    Route::post('users', [UserController::class, 'store'])->middleware('check_user_role_permission:user.create');
    Route::get('/users/{id}', [UserController::class, 'show'])->middleware('check_user_role_permission:user.view');
    Route::put('/users/{id}', [UserController::class, 'update'])->middleware('check_user_role_permission:user.update');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware('check_user_role_permission:user.delete');

    //Major controller api
    Route::get('majors', [MajorController::class, 'index'])->middleware('check_user_role_permission:major.view');
    Route::get('/majors/specialties', [MajorController::class, 'getAllSpecialty'])->middleware('check_user_role_permission:major.view');
    Route::post('majors', [MajorController::class, 'store'])->middleware('check_user_role_permission:major.create');
    Route::get('/majors/{id}', [MajorController::class, 'show'])->middleware('check_user_role_permission:major.view');
    Route::put('/majors/{id}', [MajorController::class, 'update'])->middleware('check_user_role_permission:major.update');
    Route::delete('/majors/{id}', [MajorController::class, 'destroy'])->middleware('check_user_role_permission:major.delete');

    //Specialty controller api
    Route::get('specialties', [SpecialtyController::class, 'index'])->middleware('check_user_role_permission:specialty.view');
    Route::post('specialties', [SpecialtyController::class, 'store'])->middleware('check_user_role_permission:specialty.create');
    Route::get('/specialties/{id}', [SpecialtyController::class, 'show'])->middleware('check_user_role_permission:specialty.view');
    Route::put('/specialties/{id}', [SpecialtyController::class, 'update'])->middleware('check_user_role_permission:specialty.update');
    Route::delete('/specialties/{id}', [SpecialtyController::class, 'destroy'])->middleware('check_user_role_permission:specialty.delete');

    //Student controller api
    Route::get('students', [StudentController::class, 'index'])->middleware('check_user_role_permission:student.view');
    Route::post('students', [StudentController::class, 'store'])->middleware('check_user_role_permission:student.create');
    Route::get('/students/{id}', [StudentController::class, 'show'])->middleware('check_user_role_permission:student.view');
    Route::put('/students/{id}', [StudentController::class, 'update'])->middleware('check_user_role_permission:student.update');
    Route::delete('/students/{id}', [StudentController::class, 'destroy'])->middleware('check_user_role_permission:student.delete');
    Route::get('student', [StudentController::class, 'getInfoCurrent']);
    //Import sinh viên đầu khóa vào hệ thóng
    Route::post('/addFileStudents', [StudentController::class, 'addFileStudent'])->middleware('check_user_role_permission:student.create');
    Route::post('/addScoreStudents', [StudentController::class, 'addScoreStudent'])->middleware('check_user_role_permission:student.create');

    //Teacher controller api
    Route::get('teachers', [TeacherController::class, 'index'])->middleware('check_user_role_permission:teacher.view');
    Route::post('teachers', [TeacherController::class, 'store'])->middleware('check_user_role_permission:teacher.create');
    Route::get('/teachers/{id}', [TeacherController::class, 'show'])->middleware('check_user_role_permission:teacher.view');
    Route::put('/teachers/{id}', [TeacherController::class, 'update'])->middleware('check_user_role_permission:teacher.update');
    Route::delete('/teachers/{id}', [TeacherController::class, 'destroy'])->middleware('check_user_role_permission:teacher.delete');

    //Employer controller api
    Route::get('employers', [EmployerController::class, 'index'])->middleware('check_user_role_permission:employer.view');
    Route::post('employers', [EmployerController::class, 'store'])->middleware('check_user_role_permission:employer.create');
    Route::get('/employers/{id}', [EmployerController::class, 'show'])->middleware('check_user_role_permission:employer.view');
    Route::put('/employers/{id}', [EmployerController::class, 'update'])->middleware('check_user_role_permission:employer.update');
    Route::delete('/employers/{id}', [EmployerController::class, 'destroy'])->middleware('check_user_role_permission:employer.delete');

    // Register Specialty api
    Route::get('register-specialties/admin', [RegisterSpecialtyController::class, 'index'])->middleware('check_user_role_permission:register_specialty.view');
    Route::post('register-specialties/admin', [RegisterSpecialtyController::class, 'store'])->middleware('check_user_role_permission:register_specialty.create');
    Route::get('/register-specialties/admin/{id}', [RegisterSpecialtyController::class, 'show'])->middleware('check_user_role_permission:register_specialty.view');
    Route::put('/register-specialties/admin/{id}', [RegisterSpecialtyController::class, 'update'])->middleware('check_user_role_permission:register_specialty.update');
    Route::delete('/register-specialties/admin/{id}', [RegisterSpecialtyController::class, 'destroy'])->middleware('check_user_role_permission:register_specialty.delete');

    Route::get('register-specialties/register', [RegisterSpecialtyController::class, 'getSpecialtiesForRegister']);
    Route::post('register-specialties/register', [RegisterSpecialtyController::class, 'submitRegisterSpecialty']);
    Route::post('register-specialties/change', [RegisterSpecialtyController::class, 'changeSpecialty']);
    Route::post('register-specialties/export', [RegisterSpecialtyController::class, 'getStudentOfSpecialty']);

    // Config page
    Route::get('configs', [DisplayConfigController::class, 'index']);
    Route::put('/configs/{id}', [DisplayConfigController::class, 'update']);
});
Route::get('register-specialties/result', [RegisterSpecialtyController::class, 'getResult']);
Route::get('register-specialties', [RegisterSpecialtyController::class, 'getRegisterSpecialtyByUser']);
Route::get('recruitment-positions', [RecruitmentPositionController::class, 'index']);
Route::get('academic-fields', [AcademicFieldController::class, 'index']);
Route::get('titles', [TitleController::class, 'index']);
Route::get('degrees', [DegreeController::class, 'index']);
Route::get('jobholders', [JobHolderController::class, 'index']);
