<?php

use App\Http\Controllers\Api\EmployerController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogoutController;
use App\Http\Controllers\Api\MajorController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\RegisterSpecialtyController;
use App\Http\Controllers\Api\SpecialtyController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\TeacherController;
use App\Http\Controllers\Api\UserController;
use App\Http\Resources\LoginResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//Authentication api

//Này đăng nhập bằng email và password
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
    Route::post('user', [UserController::class, 'store'])->middleware('check_user_role_permission:user.create');
    Route::get('/user/{id}', [UserController::class, 'show'])->middleware('check_user_role_permission:user.view');
    Route::put('/user/{id}', [UserController::class, 'update'])->middleware('check_user_role_permission:user.update');
    Route::delete('/user/{id}', [UserController::class, 'destroy'])->middleware('check_user_role_permission:user.delete');

    //Major controller api
    Route::get('majors', [MajorController::class, 'index'])->middleware('check_user_role_permission:major.view');
    Route::get('/majors/specialties', [MajorController::class, 'getAllSpecialty'])->middleware('check_user_role_permission:major.view');
    Route::post('major', [MajorController::class, 'store'])->middleware('check_user_role_permission:major.create');
    Route::get('/major/{id}', [MajorController::class, 'show'])->middleware('check_user_role_permission:major.view');
    Route::put('/major/{id}', [MajorController::class, 'update'])->middleware('check_user_role_permission:major.update');
    Route::delete('/major/{id}', [MajorController::class, 'destroy'])->middleware('check_user_role_permission:major.delete');

    //Specialty controller api
    Route::get('specialties', [SpecialtyController::class, 'index'])->middleware('check_user_role_permission:specialty.view');
    Route::post('specialty', [SpecialtyController::class, 'store'])->middleware('check_user_role_permission:specialty.create');
    Route::get('/specialty/{id}', [SpecialtyController::class, 'show'])->middleware('check_user_role_permission:specialty.view');
    Route::put('/specialty/{id}', [SpecialtyController::class, 'update'])->middleware('check_user_role_permission:specialty.update');
    Route::delete('/specialty/{id}', [SpecialtyController::class, 'destroy'])->middleware('check_user_role_permission:specialty.delete');

    //Student controller api
    Route::get('students', [StudentController::class, 'index'])->middleware('check_user_role_permission:student.view');
    Route::post('student', [StudentController::class, 'store'])->middleware('check_user_role_permission:student.create');
    Route::get('/student/{id}', [StudentController::class, 'show'])->middleware('check_user_role_permission:student.view');
    Route::put('/student/{id}', [StudentController::class, 'update'])->middleware('check_user_role_permission:student.update');
    Route::delete('/student/{id}', [StudentController::class, 'destroy'])->middleware('check_user_role_permission:student.delete');
    //Import sinh viên đầu khóa vào hệ thóng
    Route::post('/addFileStudent', [StudentController::class, 'addFileStudent'])->middleware('check_user_role_permission:student.create');

    //Teacher controller api
    Route::get('teachers', [TeacherController::class, 'index'])->middleware('check_user_role_permission:teacher.view');
    Route::post('teacher', [TeacherController::class, 'store'])->middleware('check_user_role_permission:teacher.create');
    Route::get('/teacher/{id}', [TeacherController::class, 'show'])->middleware('check_user_role_permission:teacher.view');
    Route::put('/teacher/{id}', [TeacherController::class, 'update'])->middleware('check_user_role_permission:teacher.update');
    Route::delete('/teacher/{id}', [TeacherController::class, 'destroy'])->middleware('check_user_role_permission:teacher.delete');

    //Employer controller api
    Route::get('employers', [EmployerController::class, 'index'])->middleware('check_user_role_permission:employer.view');
    Route::post('employer', [EmployerController::class, 'store'])->middleware('check_user_role_permission:employer.create');
    Route::get('/employer/{id}', [EmployerController::class, 'show'])->middleware('check_user_role_permission:employer.view');
    Route::put('/employer/{id}', [EmployerController::class, 'update'])->middleware('check_user_role_permission:employer.update');
    Route::delete('/employer/{id}', [EmployerController::class, 'destroy'])->middleware('check_user_role_permission:employer.delete');

    // Register Specialty api
    Route::get('register_specialties/admin', [RegisterSpecialtyController::class, 'index'])->middleware('check_user_role_permission:register_specialty.view');
    Route::post('register_specialty/admin', [RegisterSpecialtyController::class, 'store'])->middleware('check_user_role_permission:register_specialty.create');
    Route::get('/register_specialty/admin/{id}', [RegisterSpecialtyController::class, 'show'])->middleware('check_user_role_permission:register_specialty.view');
    Route::put('/register_specialty/admin/{id}', [EmployerCRegisterSpecialtyControllerontroller::class, 'update'])->middleware('check_user_role_permission:register_specialty.update');
    Route::delete('/register_specialty/admin/{id}', [RegisterSpecialtyController::class, 'destroy'])->middleware('check_user_role_permission:register_specialty.delete');

    Route::get('register_specialties/user', [RegisterSpecialtyController::class, 'getRegisterSpecialtyByUser']);
    Route::post('register_specialty/user', [RegisterSpecialtyController::class, 'submitRegisterSpecialty']);
});
