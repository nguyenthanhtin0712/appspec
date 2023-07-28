<?php

use App\Http\Controllers\Api\EmployerController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogoutController;
use App\Http\Controllers\Api\MajorController;
use App\Http\Controllers\Api\RegisterController;
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
});


Route::get('students', [StudentController::class, 'index']);
Route::post('student', [StudentController::class, 'store']);
Route::get('/student/{id}', [StudentController::class, 'show']);
Route::put('/student/{id}', [StudentController::class, 'update']);
Route::delete('/student/{id}', [StudentController::class, 'destroy']);

Route::get('teachers', [TeacherController::class, 'index']);
Route::post('teacher', [TeacherController::class, 'store']);
Route::get('/teacher/{id}', [TeacherController::class, 'show']);
Route::put('/teacher/{id}', [TeacherController::class, 'update']);
Route::delete('/teacher/{id}', [TeacherController::class, 'destroy']);

Route::get('employers', [EmployerController::class, 'index']);
Route::post('employer', [EmployerController::class, 'store']);
Route::get('/employer/{id}', [EmployerController::class, 'show']);
Route::put('/employer/{id}', [EmployerController::class, 'update']);
Route::delete('/employer/{id}', [EmployerController::class, 'destroy']);