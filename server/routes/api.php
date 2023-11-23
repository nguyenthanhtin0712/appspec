<?php

use App\Http\Controllers\Api\AcademicFieldController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\ContactConfigController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DisplayConfigController;
use App\Http\Controllers\Api\GradingController;
use App\Http\Controllers\Api\JobHolderController;
use App\Http\Controllers\Api\MajorController;
use App\Http\Controllers\Api\RecruitmentPositionController;
use App\Http\Controllers\Api\RegisterSpecialtyController;
use App\Http\Controllers\Api\SpecialtyController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\TitleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\SubjectController;
use App\Http\Controllers\Api\InternshipGraduationController;
use App\Http\Controllers\Api\JobPostController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\RegisterOpenClassController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\SubjectScheduleController;
use App\Http\Controllers\Api\WarnedDissmissedStudentController;
use App\Http\Resources\LoginResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//Authentication api

//Này đăng nhập bằng email, mssv và password
// Route::post('register', [RegisterController::class, 'register']);
// Route::post('refresh', [AuthController::class, 'refreshToken']);
Route::post('login', [AuthController::class, 'login']);
Route::post('login-google', [AuthController::class, 'login_google']);
Route::post('forget-password', [AuthController::class, 'forget_password']);
Route::post('check-token', [AuthController::class, 'check_token']);
Route::post('change-password-token', [AuthController::class, 'change_password_token']);

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
    Route::get('register-specialties/admin', [RegisterSpecialtyController::class, 'index'])->middleware('check_user_role_permission:register_spec.view');
    Route::post('register-specialties/admin', [RegisterSpecialtyController::class, 'store'])->middleware('check_user_role_permission:register_spec.create');
    Route::get('/register-specialties/admin/{id}', [RegisterSpecialtyController::class, 'show'])->middleware('check_user_role_permission:register_spec.view');
    Route::put('/register-specialties/admin/{id}', [RegisterSpecialtyController::class, 'update'])->middleware('check_user_role_permission:register_spec.update');
    Route::delete('/register-specialties/admin/{id}', [RegisterSpecialtyController::class, 'destroy'])->middleware('check_user_role_permission:register_spec.delete');

    Route::get('register-specialties/register', [RegisterSpecialtyController::class, 'getSpecialtiesForRegister'])->middleware('check_user_role_permission:register_spec.register');
    Route::post('register-specialties/register', [RegisterSpecialtyController::class, 'submitRegisterSpecialty'])->middleware('check_user_role_permission:register_spec.register');
    Route::post('register-specialties/change', [RegisterSpecialtyController::class, 'changeSpecialty'])->middleware('check_user_role_permission:register_spec.divide');
    Route::post('register-specialties/export', [RegisterSpecialtyController::class, 'getStudentOfSpecialty'])->middleware('check_user_role_permission:register_spec.divide');

    //Title api
    Route::get('titles', [TitleController::class, 'index'])->middleware('check_user_role_permission:title.view');
    Route::post('titles', [TitleController::class, 'store'])->middleware('check_user_role_permission:title.create');
    Route::get('titles/{id}', [TitleController::class, 'show'])->middleware('check_user_role_permission:title.view');
    Route::put('titles/{id}', [TitleController::class, 'update'])->middleware('check_user_role_permission:title.update');
    Route::delete('titles/{id}', [TitleController::class, 'destroy'])->middleware('check_user_role_permission:title.delete');

    // Company 
    Route::get('jobholders', [JobHolderController::class, 'index'])->middleware('check_user_role_permission:jobholder.view');
    Route::post('jobholders', [JobHolderController::class, 'store'])->middleware('check_user_role_permission:jobholder.create');
    Route::get('jobholders/{id}', [JobHolderController::class, 'show'])->middleware('check_user_role_permission:jobholder.view');
    Route::put('jobholders/{id}', [JobHolderController::class, 'update'])->middleware('check_user_role_permission:jobholder.update');
    Route::delete('jobholders/{id}', [JobHolderController::class, 'destroy'])->middleware('check_user_role_permission:jobholder.delete');

    // Recuitment-position
    Route::get('recruitment-positions', [RecruitmentPositionController::class, 'index']);
    Route::post('recruitment-positions', [RecruitmentPositionController::class, 'store']);

    // Jobholder api
    Route::get('companies', [CompanyController::class, 'index'])->middleware('check_user_role_permission:company.view');
    Route::post('companies', [CompanyController::class, 'store'])->middleware('check_user_role_permission:company.view');
    Route::get('companies/{id}', [CompanyController::class, 'show'])->middleware('check_user_role_permission:company.view');
    Route::put('companies/{id}', [CompanyController::class, 'update'])->middleware('check_user_role_permission:company.view');
    Route::delete('companies/{id}', [CompanyController::class, 'destroy'])->middleware('check_user_role_permission:company.view');

    // Subject api
    Route::get('subjects', [SubjectController::class, 'index']);
    Route::post('subjects', [SubjectController::class, 'store'])->middleware('check_user_role_permission:subject.create');
    Route::get('subjects/{id}', [SubjectController::class, 'show'])->middleware('check_user_role_permission:subject.view');
    Route::put('subjects/{id}', [SubjectController::class, 'update'])->middleware('check_user_role_permission:subject.update');
    Route::delete('subjects/{id}', [SubjectController::class, 'destroy'])->middleware('check_user_role_permission:subject.delete');

    // Subject schedule
    Route::post('subjects-schedule', [SubjectScheduleController::class, 'store'])->middleware('check_user_role_permission:subject_schedule.create');
    Route::delete('subjects-schedule/{id}', [SubjectScheduleController::class, 'destroy'])->middleware('check_user_role_permission:subject_schedule.delete');

    //Internship Graduation
    Route::post('internship-graduations/register', [InternshipGraduationController::class, 'submitRegisterInternship']);
    Route::post('internship-graduations', [InternshipGraduationController::class, 'store']);
    Route::delete('internship-graduations/{id}', [InternshipGraduationController::class, 'destroy']);
    Route::put('internship-graduations/{id}', [InternshipGraduationController::class, 'update']);
    Route::post('internship-graduations/register-out-offcial', [InternshipGraduationController::class, 'submitRegisterInternshipOutOffcail']);
    Route::get('internship-graduations/check-user-internship', [InternshipGraduationController::class, 'checkUserInternship']);
    Route::post('internship-graduations/additional-mentor', [InternshipGraduationController::class, 'additionalMentor']);
    Route::post('internship-graduations/additional-company', [InternshipGraduationController::class, 'additionalCompnay']);
    Route::get('internship-graduations', [InternshipGraduationController::class, 'index']);
    Route::get('internship-graduations/{id}', [InternshipGraduationController::class, 'show']);
    Route::get('internship-graduations/company/{id}', [InternshipGraduationController::class, 'getCompany']);
    Route::post('internship-graduations/register-info', [InternshipGraduationController::class, 'storeRegisterInfo']);
    Route::post('internship-graduations/list-students', [InternshipGraduationController::class, 'submitListStudentInternship']);
    Route::get('register-internships/assignmentInternship', [InternshipGraduationController::class, 'assignmentInternshipStudent']);
    Route::get('register-internships/jobholder/{id}', [InternshipGraduationController::class, 'getJobholderAssinmentInteship']);
    Route::post('register-internships/jobholder', [InternshipGraduationController::class, 'changeJobholder']);
    Route::get('register-internships/queryJobholder', [InternshipGraduationController::class, 'queryJobholder']);
    Route::post('register-internships/addJobholderIternship', [InternshipGraduationController::class, 'addJobholderIternship']);
    Route::get('register-internships/getAssignmentDetail', [InternshipGraduationController::class, 'getAssignmentDetail']);

    //Grading
    Route::get('grading', [GradingController::class, 'index'])->middleware('check_user_role_permission:jobholder.grading');
    Route::get('grading/students/{id}', [GradingController::class, 'getSutdentGrading'])->middleware('check_user_role_permission:jobholder.grading');
    Route::post('grading/update/', [GradingController::class, 'updateGrade'])->middleware('check_user_role_permission:jobholder.grading');


    // Academic_field api
    Route::get('academic-fields', [AcademicFieldController::class, 'index'])->middleware('check_user_role_permission:academic_field.view');

    // Config page
    Route::get('configs', [DisplayConfigController::class, 'index']);
    Route::put('/configs/{id}', [DisplayConfigController::class, 'update']);

    // Warned dimissed student
    Route::get('warned-student', [WarnedDissmissedStudentController::class, 'index'])->middleware('check_user_role_permission:warned_dismissed.view');
    Route::post('warned-student', [WarnedDissmissedStudentController::class, 'store'])->middleware('check_user_role_permission:warned_dismissed.create');
    Route::get('warned-student/lookup', [WarnedDissmissedStudentController::class, 'lookUpStudent'])->middleware('check_user_role_permission:warned_dismissed.lookup');
    Route::delete('warned-student/{id}', [WarnedDissmissedStudentController::class, 'destroy'])->middleware('check_user_role_permission:warned_dismissed.delete');

    Route::get('warned-student/statistical/{id}', [WarnedDissmissedStudentController::class, 'statistical'])->middleware('check_user_role_permission:warned_dismissed.detail');
    Route::get('warned-student/{id}/students', [WarnedDissmissedStudentController::class, 'show'])->middleware('check_user_role_permission:warned_dismissed.detail');
    Route::get('warned-student/{id}', [WarnedDissmissedStudentController::class, 'getWarningInfo'])->middleware('check_user_role_permission:warned_dismissed.detail');

    // Register Open Class
    Route::post('register-open-class', [RegisterOpenClassController::class, 'register'])->middleware('check_user_role_permission:register_open_class');
    Route::get('register-open-class/history', [RegisterOpenClassController::class, 'history'])->middleware('check_user_role_permission:register_open_class');
    Route::get('register-open-class/statistical', [RegisterOpenClassController::class, 'statistical'])->middleware('check_user_role_permission:register_open_class.statistic');

    // Pages
    Route::get('pages', [PageController::class, 'index'])->middleware('check_user_role_permission:page.view');
    Route::post('pages', [PageController::class, 'store'])->middleware('check_user_role_permission:page.create');
    Route::post('/upload-image', [PageController::class, 'uploadImage'])->middleware('check_user_role_permission:page.create');
    Route::get('pages/{id}', [PageController::class, 'show'])->middleware('check_user_role_permission:page.update');
    Route::put('pages/{id}', [PageController::class, 'update'])->middleware('check_user_role_permission:page.update');
    Route::delete('pages/{id}', [PageController::class, 'destroy'])->middleware('check_user_role_permission:page.delete');

    // Job Post
    Route::get('job-posts', [JobPostController::class, 'index'])->middleware('check_user_role_permission:job_post.confirm');
    Route::post('job-posts/confirm/{id}', [JobPostController::class, 'confirmPost'])->middleware('check_user_role_permission:job_post.confirm');

    Route::put('job-posts/{id}', [JobPostController::class, 'update'])->middleware('check_user_role_permission:job_post.update');
    Route::delete('job-posts/{id}', [JobPostController::class, 'destroy'])->middleware('check_user_role_permission:job_post.delete');
    
    Route::post('job-posts', [JobPostController::class, 'store'])->middleware('check_user_role_permission:job_post.create');
    Route::get('job-posts/user', [JobPostController::class, 'getUserPosts'])->middleware('check_user_role_permission:job_post.create');

    //Profile
    Route::get('profile', [ProfileController::class, 'index']);
    Route::put('profile/change-password', [ProfileController::class, 'change_password']);
    Route::put('profile/change-information', [ProfileController::class, 'change_info']);

    //Contact
    Route::get('contacts', [ContactController::class, 'index'])->middleware('check_user_role_permission:contact.view');
    Route::delete('contacts/{id}', [ContactController::class, 'destroy'])->middleware('check_user_role_permission:contact.delete');

    // Contact config
    Route::post('contact-config', [ContactConfigController::class, 'updateContactConfig'])->middleware('check_user_role_permission:contact.update_info');

    //Role
    Route::get('roles', [RoleController::class, 'index']);
    Route::post('roles', [RoleController::class, 'store']);
    Route::put('roles/{id}', [RoleController::class, 'update']);
    Route::delete('roles/{id}', [RoleController::class, 'destroy']);
    Route::get('functional', [RoleController::class, 'getPermissions']);
});
Route::get('roles/{id}', [RoleController::class, 'show']);



Route::get('register-specialties/majors/{id?}', [RegisterSpecialtyController::class, 'getMajor']);

Route::get('register-specialties/statistics/{major_id?}', [RegisterSpecialtyController::class, 'getStatisticDefault']);
Route::get('register-specialties/{id}/statistics/{major_id?}', [RegisterSpecialtyController::class, 'getStatistic']);

Route::get('register-specialties/result', [RegisterSpecialtyController::class, 'getResult']);
Route::get('register-specialties', [RegisterSpecialtyController::class, 'getRegisterSpecialty']);
//Register internship from student
Route::get('register-internship/infoInternship', [InternshipGraduationController::class, 'getInfoInternship']);
Route::get('company-internships', [InternshipGraduationController::class, 'getCompanyInternshipByUser']);
Route::get('register-internships', [InternshipGraduationController::class, 'getRegisterInternshipByUser']);
Route::get('register-internships/result', [InternshipGraduationController::class, 'registerResultStudent']);

// Subject Schedule
Route::get('subjects-schedule', [SubjectScheduleController::class, 'index']);
Route::get('subjects-schedule/{id}', [SubjectScheduleController::class, 'show']);

// Page 
Route::get('pages/view/{slug}', [PageController::class, 'viewPage']);

// Career
Route::get('job-posts/list', [JobPostController::class, 'getListPost']);
Route::get('job-posts/{id}', [JobPostController::class, 'show']);
Route::get('job-posts/related/{id}', [JobPostController::class, 'getRelatedPost']);
//Page contact
//Send mail from student
Route::post('contacts/send', [ContactController::class, 'sendMail']);
//Get info config
Route::get('contact-config', [ContactConfigController::class, 'getInfo']);
