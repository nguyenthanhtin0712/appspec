<?php

use App\Http\Controllers\Api\AcademicFieldController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\JobHolderController;
use App\Http\Controllers\Api\MajorController;
use App\Http\Controllers\Api\RecruitmentPositionController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\RegisterSpecialtyController;
use App\Http\Controllers\Api\SpecialtyController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\TitleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\DisplayConfigController;
use App\Http\Controllers\Api\SubjectController;
use App\Http\Controllers\Api\InternshipGraduationController;
use App\Http\Controllers\Api\SubjectScheduleController;
use App\Http\Resources\LoginResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//Authentication api

//Này đăng nhập bằng email, mssv và password
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [RegisterController::class, 'register']);
// Route::post('refresh', [AuthController::class, 'refreshToken']);

// Cái đăng nhập bằng accessToken
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return new LoginResource($request->user());
});

Route::middleware(['auth:api'])->group(function () {

    //Login vào rồi mới logout được
    Route::get('logout', [AuthController::class, 'logout']);
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

    //Title api
    Route::get('titles', [TitleController::class, 'index'])->middleware('check_user_role_permission:title.view');
    Route::post('titles', [TitleController::class, 'store'])->middleware('check_user_role_permission:title.create');
    Route::get('titles/{id}', [TitleController::class, 'show'])->middleware('check_user_role_permission:title.view');
    Route::put('titles/{id}', [TitleController::class, 'update'])->middleware('check_user_role_permission:title.update');
    Route::delete('titles/{id}', [TitleController::class, 'destroy'])->middleware('check_user_role_permission:title.delete');

    // Company api
    Route::get('jobholders', [JobHolderController::class, 'index'])->middleware('check_user_role_permission:jobholder.view');
    Route::post('jobholders', [JobHolderController::class, 'store'])->middleware('check_user_role_permission:jobholder.create');
    Route::get('jobholders/{id}', [JobHolderController::class, 'show'])->middleware('check_user_role_permission:jobholder.view');
    Route::put('jobholders/{id}', [JobHolderController::class, 'update'])->middleware('check_user_role_permission:jobholder.update');
    Route::delete('jobholders/{id}', [JobHolderController::class, 'destroy'])->middleware('check_user_role_permission:jobholder.delete');

    // Jobholder api
    Route::get('companies', [CompanyController::class, 'index'])->middleware('check_user_role_permission:company.view');
    Route::post('companies', [CompanyController::class, 'store'])->middleware('check_user_role_permission:company.view');
    Route::get('companies/{id}', [CompanyController::class, 'show'])->middleware('check_user_role_permission:company.view');
    Route::put('companies/{id}', [CompanyController::class, 'update'])->middleware('check_user_role_permission:company.view');
    Route::delete('companies/{id}', [CompanyController::class, 'destroy'])->middleware('check_user_role_permission:company.view');

    // Subject api
    Route::get('subjects', [SubjectController::class, 'index'])->middleware('check_user_role_permission:title.view');
    Route::post('subjects', [SubjectController::class, 'store'])->middleware('check_user_role_permission:subject.create');
    Route::get('subjects/{id}', [SubjectController::class, 'show'])->middleware('check_user_role_permission:subject.view');
    Route::put('subjects/{id}', [SubjectController::class, 'update'])->middleware('check_user_role_permission:subject.update');
    Route::delete('subjects/{id}', [SubjectController::class, 'destroy'])->middleware('check_user_role_permission:subject.delete');

    Route::get('subjects-schedule', [SubjectScheduleController::class, 'index'])->middleware('check_user_role_permission:subject_schedule.view');
    Route::post('subjects-schedule', [SubjectScheduleController::class, 'store'])->middleware('check_user_role_permission:subject_schedule.create');
    Route::get('subjects-schedule/{id}', [SubjectScheduleController::class, 'show'])->middleware('check_user_role_permission:subject_schedule.view');
    Route::delete('subjects-schedule/{id}', [SubjectScheduleController::class, 'destroy'])->middleware('check_user_role_permission:subject_schedule.delete');


    //Internship Graduation
    Route::post('internship-graduations/register', [InternshipGraduationController::class, 'submitRegisterInternship']);
    Route::post('internship-graduations', [InternshipGraduationController::class, 'store']);
    Route::delete('internship-graduations/{id}', [InternshipGraduationController::class, 'destroy']);
    Route::put('internship-graduations/{id}', [InternshipGraduationController::class, 'update']);
    Route::post('internship-graduations/register-out-offcial', [InternshipGraduationController::class, 'submitRegisterInternshipOutOffcail']);

    // Academic_field api
    Route::get('academic-fields', [AcademicFieldController::class, 'index'])->middleware('check_user_role_permission:academic_field.view');;

    // Config page
    Route::get('configs', [DisplayConfigController::class, 'index']);
    Route::put('/configs/{id}', [DisplayConfigController::class, 'update']);
});

Route::get('test-email', [InternshipGraduationController::class, 'testEmail']);


Route::get('register-specialties/result', [RegisterSpecialtyController::class, 'getResult']);
Route::get('register-specialties', [RegisterSpecialtyController::class, 'getRegisterSpecialtyByUser']);

Route::get('recruitment-positions', [RecruitmentPositionController::class, 'index']);
Route::post('recruitment-positions', [RecruitmentPositionController::class, 'store']);

Route::get('internship-graduations', [InternshipGraduationController::class, 'index']);
Route::get('company-internships', [InternshipGraduationController::class, 'getCompanyInternshipByUser']);
Route::get('register-internship/infoInternship', [InternshipGraduationController::class, 'getInfoInternship']);
Route::get('internship-graduations/{id}', [InternshipGraduationController::class, 'show']);
Route::get('internship-graduations/company/{id}', [InternshipGraduationController::class, 'getCompany']);
Route::post('internship-graduations/register-info', [InternshipGraduationController::class, 'storeRegisterInfo']);
Route::get('register-internships', [InternshipGraduationController::class, 'getRegisterInternshipByUser']);
Route::get('register-internships/result', [InternshipGraduationController::class, 'registerResultStudent']);
Route::get('register-internships/assignmentInternship', [InternshipGraduationController::class, 'assignmentInternshipStudent']);
Route::get('register-internships/jobholder/{id}', [InternshipGraduationController::class, 'getJobholderAssinmentInteship']);
Route::post('register-internships/jobholder', [InternshipGraduationController::class, 'changeJobholder']);
Route::get('register-internships/queryJobholder', [InternshipGraduationController::class, 'queryJobholder']);
Route::post('register-internships/addJobholderIternship', [InternshipGraduationController::class, 'addJobholderIternship']);
Route::get('contacts', [ContactController::class, 'index']);
