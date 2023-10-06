<?php

namespace Database\Seeders;

use App\Models\Functional;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Role user
        Functional::create(['functional_code' => 'user', 'functional_name' => 'Quản lý người dùng']);
        $user_view = Permission::create(['name' => 'user.view', 'desc' => 'Thêm người dùng']);
        $user_create = Permission::create(['name' => 'user.create', 'desc' => 'Tạo người dùng']);
        $user_update = Permission::create(['name' => 'user.update', 'desc' => 'Cập nhật người dùng']);
        $user_delete = Permission::create(['name' => 'user.delete', 'desc' => 'Xoá người dùng']);
        //Role major
        Functional::create(['functional_code' => 'major', 'functional_name' => 'Quản lý ngành']);
        $major_view = Permission::create(['name' => 'major.view', 'desc' => 'Xem ngành']);
        $major_create = Permission::create(['name' => 'major.create', 'desc' => 'Tạo ngành']);
        $major_update = Permission::create(['name' => 'major.update', 'desc' => 'Cập nhật ngành']);
        $major_delete = Permission::create(['name' => 'major.delete', 'desc' => 'Xoá ngành']);
        //Role specialty
        Functional::create(['functional_code' => 'specialty', 'functional_name' => 'Quản lý chuyên ngành']);
        $specialty_view = Permission::create(['name' => 'specialty.view', 'desc' => 'Xem chuyên ngành']);
        $specialty_create = Permission::create(['name' => 'specialty.create', 'desc' => 'Tạo chuyên ngành']);
        $specialty_update = Permission::create(['name' => 'specialty.update', 'desc' => 'Cập nhật chuyên ngành']);
        $specialty_delete = Permission::create(['name' => 'specialty.delete', 'desc' => 'Xoá chuyên ngành']);
        //Role student
        Functional::create(['functional_code' => 'student', 'functional_name' => 'Quản lý sinh viên']);
        $student_view = Permission::create(['name' => 'student.view', 'desc' => 'Xem sinh viên']);
        $student_create = Permission::create(['name' => 'student.create', 'desc' => 'Tạo sinh viên']);
        $student_update = Permission::create(['name' => 'student.update', 'desc' => 'Cập nhật sinh viên']);
        $student_delete = Permission::create(['name' => 'student.delete', 'desc' => 'Xoá sinh viên']);
        // Role register specialty
        Functional::create(['functional_code' => 'register_spec', 'functional_name' => 'Quản lý đăng ký chuyên ngành']);
        $register_spec_view = Permission::create(['name' => 'register_spec.view', 'desc' => 'Xem đợt đăng ký chuyên ngành']);
        $register_spec_create = Permission::create(['name' => 'register_spec.create', 'desc' => 'Tạo đợt đăng chuyên ngành']);
        $register_spec_update = Permission::create(['name' => 'register_spec.update', 'desc' => 'Cập nhật đợt đăng ký chuyên ngành']);
        $register_spec_delete = Permission::create(['name' => 'register_spec.delete', 'desc' => 'Xoá đợt đăng ký chuyên ngành']);
        $register_spec = Permission::create(['name' => 'register_spec.register', 'desc' => 'Đăng ký chuyên ngành']);
        
        // Role register interns
        Functional::create(['functional_code' => 'register_intern', 'functional_name' => 'Quản lý đăng ký thực tập']);
        $register_intern_view = Permission::create(['name' => 'register_intern.view', 'desc' => 'Xem đợt đăng ký thực tập']);
        $register_intern_create = Permission::create(['name' => 'register_intern.create', 'desc' => 'Tạo đợt đăng ký thực tập']);
        $register_intern_update = Permission::create(['name' => 'register_intern.update', 'desc' => 'Cập nhật đợt đăng ký thực tập']);
        $register_intern_delete = Permission::create(['name' => 'register_intern.delete', 'desc' => 'Xoá đợt đăng ký thực tập']);
        $register_internship = Permission::create(['name' => 'register_intern.register', 'desc' => 'Đăng ký thưc tập']);
        // Role academic field 
        Functional::create(['functional_code' => 'academic_field', 'functional_name' => 'Quản lý bộ môn']);
        $academic_field_view = Permission::create(['name' => 'academic_field.view', 'desc' => 'Xem bộ môn']);
        $academic_field_create = Permission::create(['name' => 'academic_field.create', 'desc' => 'Tạo bộ môn']);
        $academic_field_update = Permission::create(['name' => 'academic_field.update', 'desc' => 'Cập nhật bộ môn']);
        $academic_field_delete = Permission::create(['name' => 'academic_field.delete', 'desc' => 'Xoá bộ môn']);
        // Role title
        Functional::create(['functional_code' => 'title', 'functional_name' => 'Quản lý chức vụ']);
        $title_view = Permission::create(['name' => 'title.view', 'desc' => 'Xem chức vụ']);
        $title_create = Permission::create(['name' => 'title.create', 'desc' => 'Tạo chức vụ']);
        $title_update = Permission::create(['name' => 'title.update', 'desc' => 'Cập nhật chức vụ']);
        $title_delete = Permission::create(['name' => 'title.delete', 'desc' => 'Xoá chức vụ']);
        // Role jobholder
        Functional::create(['functional_code' => 'jobholder', 'functional_name' => 'Quản lý viên chức']);
        $jobholder_view = Permission::create(['name' => 'jobholder.view', 'desc' => 'Xem viên chức']);
        $jobholder_create = Permission::create(['name' => 'jobholder.create', 'desc' => 'Tạo viên chức']);
        $jobholder_update = Permission::create(['name' => 'jobholder.update', 'desc' => 'Cập nhật viên chức']);
        $jobholder_delete = Permission::create(['name' => 'jobholder.delete', 'desc' => 'Xoá viên chức']);
        // Role subject
        Functional::create(['functional_code' => 'subject', 'functional_name' => 'Quản lý bộ môn']);
        $subject_view = Permission::create(['name' => 'subject.view', 'desc' => 'Xem bộ môn']);
        $subject_create = Permission::create(['name' => 'subject.create', 'desc' => 'Tạo bộ môn']);
        $subject_update = Permission::create(['name' => 'subject.update', 'desc' => 'Cập nhật bộ môn']);
        $subject_delete = Permission::create(['name' => 'subject.delete', 'desc' => 'Xoá bộ môn']);

        // Role company
        Functional::create(['functional_code' => 'company', 'functional_name' => 'Quản lý công ty']);
        $company_view = Permission::create(['name' => 'company.view', 'desc' => 'Xem công ty']);
        $company_create = Permission::create(['name' => 'company.create', 'desc' => 'Tạo công ty']);
        $company_update = Permission::create(['name' => 'company.update', 'desc' => 'Cập nhật công ty']);
        $company_delete = Permission::create(['name' => 'company.delete', 'desc' => 'Xoá công ty']);

        // Subject Schedule
        Functional::create(['functional_code' => 'subject_schedule', 'functional_name' => 'Quản lý lịch học']);
        $subject_schedule_view = Permission::create(['name' => 'subject_schedule.view', 'desc' => 'Xem lịch học']);
        $subject_schedule_create = Permission::create(['name' => 'subject_schedule.create', 'desc' => 'Tạo lịch học']);
        $subject_schedule_delete = Permission::create(['name' => 'subject_schedule.delete', 'desc' => 'Xoá lịch học']);
        $subject_schedule_delete = Permission::create(['name' => 'subject_schedule.update', 'desc' => 'Cập nhật lịch học']);

        // Warned Dismissed Student

        $admin_role = Role::create(['name' => 'admin']);
        $student_role = Role::create(['name' => 'student']);
        $admin_role->givePermissionTo([
            $user_view,
            $user_create,
            $user_update,
            $user_delete,
            $major_view,
            $major_create,
            $major_update,
            $major_delete,
            $specialty_view,
            $specialty_create,
            $specialty_update,
            $specialty_delete,
            $student_view,
            $student_create,
            $student_update,
            $student_delete,
            $register_spec_view,
            $register_spec_create,
            $register_spec_update,
            $register_spec_delete,
            $register_intern_view,
            $register_intern_create,
            $register_intern_update,
            $register_intern_delete,
            $academic_field_view,
            $academic_field_create,
            $academic_field_update,
            $academic_field_delete,
            $title_view,
            $title_create,
            $title_update,
            $title_delete,
            $jobholder_view,
            $jobholder_create,
            $jobholder_update,
            $jobholder_delete,
            $subject_view,
            $subject_create,
            $subject_update,
            $subject_delete,
            $company_view,
            $company_create,
            $company_update,
            $company_delete,
            $subject_schedule_view,
            $subject_schedule_create,
            $subject_schedule_delete
        ]);

        $student_role->givePermissionTo([
            $register_spec,
            $register_internship
        ]);
    }
}
