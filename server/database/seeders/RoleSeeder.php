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
        $user_view = Permission::create(['name' => 'user.view', 'desc' => 'Thêm người dùng', 'functional_code' => 'user']);
        $user_create = Permission::create(['name' => 'user.create', 'desc' => 'Tạo người dùng', 'functional_code' => 'user']);
        $user_update = Permission::create(['name' => 'user.update', 'desc' => 'Cập nhật người dùng', 'functional_code' => 'user']);
        $user_delete = Permission::create(['name' => 'user.delete', 'desc' => 'Xoá người dùng', 'functional_code' => 'user']);
        //Role major
        Functional::create(['functional_code' => 'major', 'functional_name' => 'Quản lý ngành']);
        $major_view = Permission::create(['name' => 'major.view', 'desc' => 'Xem ngành', 'functional_code' => 'major']);
        $major_create = Permission::create(['name' => 'major.create', 'desc' => 'Tạo ngành', 'functional_code' => 'major']);
        $major_update = Permission::create(['name' => 'major.update', 'desc' => 'Cập nhật ngành', 'functional_code' => 'major']);
        $major_delete = Permission::create(['name' => 'major.delete', 'desc' => 'Xoá ngành', 'functional_code' => 'major']);
        //Role specialty
        Functional::create(['functional_code' => 'specialty', 'functional_name' => 'Quản lý chuyên ngành']);
        $specialty_view = Permission::create(['name' => 'specialty.view', 'desc' => 'Xem chuyên ngành', 'functional_code' => 'specialty']);
        $specialty_create = Permission::create(['name' => 'specialty.create', 'desc' => 'Tạo chuyên ngành', 'functional_code' => 'specialty']);
        $specialty_update = Permission::create(['name' => 'specialty.update', 'desc' => 'Cập nhật chuyên ngành', 'functional_code' => 'specialty']);
        $specialty_delete = Permission::create(['name' => 'specialty.delete', 'desc' => 'Xoá chuyên ngành', 'functional_code' => 'specialty']);
        //Role student
        Functional::create(['functional_code' => 'student', 'functional_name' => 'Quản lý sinh viên']);
        $student_view = Permission::create(['name' => 'student.view', 'desc' => 'Xem sinh viên', 'functional_code' => 'student']);
        $student_create = Permission::create(['name' => 'student.create', 'desc' => 'Tạo sinh viên', 'functional_code' => 'student']);
        $student_update = Permission::create(['name' => 'student.update', 'desc' => 'Cập nhật sinh viên', 'functional_code' => 'student']);
        $student_delete = Permission::create(['name' => 'student.delete', 'desc' => 'Xoá sinh viên', 'functional_code' => 'student']);

        // Role register specialty
        Functional::create(['functional_code' => 'register_spec', 'functional_name' => 'Quản lý đăng ký chuyên ngành']);
        $register_spec_view = Permission::create(['name' => 'register_spec.view', 'desc' => 'Xem đợt đăng ký chuyên ngành', 'functional_code' => 'register_spec']);
        $register_spec_create = Permission::create(['name' => 'register_spec.create', 'desc' => 'Tạo đợt đăng chuyên ngành', 'functional_code' => 'register_spec']);
        $register_spec_update = Permission::create(['name' => 'register_spec.update', 'desc' => 'Cập nhật đợt đăng ký chuyên ngành', 'functional_code' => 'register_spec']);
        $register_spec_delete = Permission::create(['name' => 'register_spec.delete', 'desc' => 'Xoá đợt đăng ký chuyên ngành', 'functional_code' => 'register_spec']);
        $register_spec_divide = Permission::create(['name' => 'register_spec.divide', 'desc' => 'Phân chuyên ngành', 'functional_code' => 'register_spec']);
        $register_spec = Permission::create(['name' => 'register_spec.register', 'desc' => 'Đăng ký chuyên ngành', 'functional_code' => 'register_spec']);

        // Role register interns
        Functional::create(['functional_code' => 'register_intern', 'functional_name' => 'Quản lý đăng ký thực tập']);
        $register_intern_view = Permission::create(['name' => 'register_intern.view', 'desc' => 'Xem đợt đăng ký thực tập', 'functional_code' => 'register_intern']);
        $register_intern_create = Permission::create(['name' => 'register_intern.create', 'desc' => 'Tạo đợt đăng ký thực tập', 'functional_code' => 'register_intern']);
        $register_intern_update = Permission::create(['name' => 'register_intern.update', 'desc' => 'Cập nhật đợt đăng ký thực tập', 'functional_code' => 'register_intern']);
        $register_intern_delete = Permission::create(['name' => 'register_intern.delete', 'desc' => 'Xoá đợt đăng ký thực tập', 'functional_code' => 'register_intern']);
        $register_internship = Permission::create(['name' => 'register_intern.register', 'desc' => 'Đăng ký thưc tập', 'functional_code' => 'register_intern']);
        // Role academic field 
        Functional::create(['functional_code' => 'academic_field', 'functional_name' => 'Quản lý bộ môn']);
        $academic_field_view = Permission::create(['name' => 'academic_field.view', 'desc' => 'Xem bộ môn', 'functional_code' => 'academic_field']);
        $academic_field_create = Permission::create(['name' => 'academic_field.create', 'desc' => 'Tạo bộ môn', 'functional_code' => 'academic_field']);
        $academic_field_update = Permission::create(['name' => 'academic_field.update', 'desc' => 'Cập nhật bộ môn', 'functional_code' => 'academic_field']);
        $academic_field_delete = Permission::create(['name' => 'academic_field.delete', 'desc' => 'Xoá bộ môn', 'functional_code' => 'academic_field']);
        // Role title
        Functional::create(['functional_code' => 'title', 'functional_name' => 'Quản lý chức vụ']);
        $title_view = Permission::create(['name' => 'title.view', 'desc' => 'Xem chức vụ', 'functional_code' => 'title']);
        $title_create = Permission::create(['name' => 'title.create', 'desc' => 'Tạo chức vụ', 'functional_code' => 'title']);
        $title_update = Permission::create(['name' => 'title.update', 'desc' => 'Cập nhật chức vụ', 'functional_code' => 'title']);
        $title_delete = Permission::create(['name' => 'title.delete', 'desc' => 'Xoá chức vụ', 'functional_code' => 'title']);
        // Role jobholder
        Functional::create(['functional_code' => 'jobholder', 'functional_name' => 'Quản lý viên chức']);
        $jobholder_view = Permission::create(['name' => 'jobholder.view', 'desc' => 'Xem viên chức', 'functional_code' => 'jobholder']);
        $jobholder_create = Permission::create(['name' => 'jobholder.create', 'desc' => 'Tạo viên chức', 'functional_code' => 'jobholder']);
        $jobholder_update = Permission::create(['name' => 'jobholder.update', 'desc' => 'Cập nhật viên chức', 'functional_code' => 'jobholder']);
        $jobholder_delete = Permission::create(['name' => 'jobholder.delete', 'desc' => 'Xoá viên chức', 'functional_code' => 'jobholder']);
        $jobholder_grading = Permission::create(['name' => 'jobholder.grading', 'desc' => 'Chấm điểm', 'functional_code' => 'jobholder']);
        // Role subject
        Functional::create(['functional_code' => 'subject', 'functional_name' => 'Quản lý môn học']);
        $subject_view = Permission::create(['name' => 'subject.view', 'desc' => 'Xem môn học', 'functional_code' => 'subject']);
        $subject_create = Permission::create(['name' => 'subject.create', 'desc' => 'Tạo môn học', 'functional_code' => 'subject']);
        $subject_update = Permission::create(['name' => 'subject.update', 'desc' => 'Cập nhật môn học', 'functional_code' => 'subject']);
        $subject_delete = Permission::create(['name' => 'subject.delete', 'desc' => 'Xoá môn học', 'functional_code' => 'subject']);

        // Role company
        Functional::create(['functional_code' => 'company', 'functional_name' => 'Quản lý công ty']);
        $company_view = Permission::create(['name' => 'company.view', 'desc' => 'Xem công ty', 'functional_code' => 'company']);
        $company_create = Permission::create(['name' => 'company.create', 'desc' => 'Tạo công ty', 'functional_code' => 'company']);
        $company_update = Permission::create(['name' => 'company.update', 'desc' => 'Cập nhật công ty', 'functional_code' => 'company']);
        $company_delete = Permission::create(['name' => 'company.delete', 'desc' => 'Xoá công ty', 'functional_code' => 'company']);

        // Subject Schedule
        Functional::create(['functional_code' => 'subject_schedule', 'functional_name' => 'Quản lý kế hoạch mở nhóm học phần']);
        $subject_schedule_create = Permission::create(['name' => 'subject_schedule.create', 'desc' => 'Tạo kế hoạch mở nhóm học phần', 'functional_code' => 'subject_schedule']);
        $subject_schedule_delete = Permission::create(['name' => 'subject_schedule.delete', 'desc' => 'Xoá kế hoạch mở nhóm học phần', 'functional_code' => 'subject_schedule']);

        // Warned Dismissed Student
        Functional::create(['functional_code' => 'warned_dismissed', 'functional_name' => 'Quản lý sinh viên bị cảnh báo & BTH']);
        $warned_dismissed_view = Permission::create(['name' => 'warned_dismissed.view', 'desc' => 'Xem danh sách đợt cảnh báo & BTH', 'functional_code' => 'warned_dismissed']);
        $warned_dismissed_create = Permission::create(['name' => 'warned_dismissed.create', 'desc' => 'Tạo đợt cảnh báo & BTH', 'functional_code' => 'warned_dismissed']);
        $warned_dismissed_delete = Permission::create(['name' => 'warned_dismissed.delete', 'desc' => 'Xoá đợt cảnh báo & BTH', 'functional_code' => 'warned_dismissed']);
        $warned_dismissed_lookup = Permission::create(['name' => 'warned_dismissed.lookup', 'desc' => 'Tra cứu sinh viên bị cảnh báo & BTH', 'functional_code' => 'warned_dismissed']);

        // Register Open Class
        Functional::create(['functional_code' => 'register_open_class', 'functional_name' => 'Đăng ký học cải thiện']);
        $register_open_class = Permission::create(['name' => 'register_open_class', 'desc' => 'Đăng ký học cải thiện', 'functional_code' => 'register_open_class']);
        $register_open_class_statistic = Permission::create(['name' => 'register_open_class.statistic', 'desc' => 'Xem thống kê đăng ký học cải thiện', 'functional_code' => 'register_open_class']);

        // Page
        Functional::create(['functional_code' => 'page', 'functional_name' => 'Quản lý trang']);
        $page_view = Permission::create(['name' => 'page.view', 'desc' => 'Xem danh sách trang', 'functional_code' => 'page']);
        $page_create = Permission::create(['name' => 'page.create', 'desc' => 'Tạo trang', 'functional_code' => 'page']);
        $page_update = Permission::create(['name' => 'page.update', 'desc' => 'Cập nhật trang', 'functional_code' => 'page']);
        $page_delete = Permission::create(['name' => 'page.delete', 'desc' => 'Xoá trang', 'functional_code' => 'page']);

        // Job post
        Functional::create(['functional_code' => 'job_post', 'functional_name' => 'Quản lý bài đăng tuyển dụng']);
        $job_post_create = Permission::create(['name' => 'job_post.create', 'desc' => 'Tạo bài đăng tuyển dụng', 'functional_code' => 'job_post']);
        $job_post_update = Permission::create(['name' => 'job_post.update', 'desc' => 'Cập nhật bài đăng tuyển dụng', 'functional_code' => 'job_post']);
        $job_post_delete = Permission::create(['name' => 'job_post.delete', 'desc' => 'Xoá bài đăng tuyển dụng', 'functional_code' => 'job_post']);
        $job_post_confirm = Permission::create(['name' => 'job_post.confirm', 'desc' => 'Phê duyệt đăng tuyển dụng', 'functional_code' => 'job_post']);

        // Contact
        Functional::create(['functional_code' => 'contact', 'functional_name' => 'Quản lý liên hệ']);
        $contact_view = Permission::create(['name' => 'contact.view', 'desc' => 'Xem danh sách liên hệ', 'functional_code' => 'contact']);
        $contact_delete = Permission::create(['name' => 'contact.delete', 'desc' => 'Xoá liên hệ', 'functional_code' => 'contact']);
        $contact_update_info = Permission::create(['name' => 'contact.update_info', 'desc' => 'Cập nhật thông tin liên hệ', 'functional_code' => 'contact']);


        // System
        Functional::create(['functional_code' => 'system', 'functional_name' => 'Quản lý hệ thống']);
        $system_update = Permission::create(['name' => 'system.update', 'desc' => 'Cập nhật cấu hình hệ thống', 'functional_code' => 'system']);

        // Role
        Functional::create(['functional_code' => 'role', 'functional_name' => 'Quản lý quyền']);
        $role_view = Permission::create(['name' => 'role.view', 'desc' => 'Xem danh sách quyền', 'functional_code' => 'role']);
        $role_create = Permission::create(['name' => 'role.create', 'desc' => 'Tạo quyền', 'functional_code' => 'role']);
        $role_update = Permission::create(['name' => 'role.update', 'desc' => 'Cập nhật quyền', 'functional_code' => 'role']);
        $role_delete = Permission::create(['name' => 'role.delete', 'desc' => 'Xoá quyền', 'functional_code' => 'role']);


        $admin_role = Role::create(['name' => 'admin']);
        $jobholder_role = Role::create(['name' => 'jobhodler']);
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
            $register_spec_divide,
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
            $subject_schedule_create,
            $subject_schedule_delete,
            $warned_dismissed_view,
            $warned_dismissed_create,
            $warned_dismissed_delete,
            $warned_dismissed_lookup,
            $register_open_class_statistic,
            $page_view,
            $page_create,
            $page_update,
            $page_delete,
            $job_post_create,
            $job_post_update,
            $job_post_delete,
            $job_post_confirm,
            $contact_view,
            $contact_delete,
            $contact_update_info,
            $system_update,
            $role_view,
            $role_create,
            $role_update,
            $role_delete
        ]);

        $jobholder_role->givePermissionTo([
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
            $jobholder_grading,
            $subject_view,
            $subject_create,
            $subject_update,
            $subject_delete,
            $company_view,
            $company_create,
            $company_update,
            $company_delete,
            $subject_schedule_create,
            $subject_schedule_delete
        ]);

        $student_role->givePermissionTo([
            $register_spec,
            $register_internship,
            $register_open_class,
            $register_open_class_statistic
        ]);
    }
}
