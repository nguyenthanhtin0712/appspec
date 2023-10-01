<?php

namespace Database\Seeders;

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
        $user_view = Permission::create(['name' => 'user.view']);
        $user_create = Permission::create(['name' => 'user.create']);
        $user_update = Permission::create(['name' => 'user.update']);
        $user_delete = Permission::create(['name' => 'user.delete']);
        //Role major
        $major_view = Permission::create(['name' => 'major.view']);
        $major_create = Permission::create(['name' => 'major.create']);
        $major_update = Permission::create(['name' => 'major.update']);
        $major_delete = Permission::create(['name' => 'major.delete']);
        //Role specialty
        $specialty_view = Permission::create(['name' => 'specialty.view']);
        $specialty_create = Permission::create(['name' => 'specialty.create']);
        $specialty_update = Permission::create(['name' => 'specialty.update']);
        $specialty_delete = Permission::create(['name' => 'specialty.delete']);
        //Role student
        $student_view = Permission::create(['name' => 'student.view']);
        $student_create = Permission::create(['name' => 'student.create']);
        $student_update = Permission::create(['name' => 'student.update']);
        $student_delete = Permission::create(['name' => 'student.delete']);
        //Role teacher
        $teacher_view = Permission::create(['name' => 'teacher.view']);
        $teacher_create = Permission::create(['name' => 'teacher.create']);
        $teacher_update = Permission::create(['name' => 'teacher.update']);
        $teacher_delete = Permission::create(['name' => 'teacher.delete']);
        // Role register specialty
        $register_specialty_view = Permission::create(['name' => 'register_specialty.view']);
        $register_specialty_create = Permission::create(['name' => 'register_specialty.create']);
        $register_specialty_update = Permission::create(['name' => 'register_specialty.update']);
        $register_specialty_delete = Permission::create(['name' => 'register_specialty.delete']);
        // Role register specialty
        $register_intern_view = Permission::create(['name' => 'register_intern.view']);
        $register_intern_create = Permission::create(['name' => 'register_intern.create']);
        $register_intern_update = Permission::create(['name' => 'register_intern.update']);
        $register_intern_delete = Permission::create(['name' => 'register_intern.delete']);
        // Role academic field 
        $academic_field_view = Permission::create(['name' => 'academic_field.view']);
        $academic_field_create = Permission::create(['name' => 'academic_field.create']);
        $academic_field_update = Permission::create(['name' => 'academic_field.update']);
        $academic_field_delete = Permission::create(['name' => 'academic_field.delete']);
        // Role title
        $title_view = Permission::create(['name' => 'title.view']);
        $title_create = Permission::create(['name' => 'title.create']);
        $title_update = Permission::create(['name' => 'title.update']);
        $title_delete = Permission::create(['name' => 'title.delete']);
        // Role jobholder
        $jobholder_view = Permission::create(['name' => 'jobholder.view']);
        $jobholder_create = Permission::create(['name' => 'jobholder.create']);
        $jobholder_update = Permission::create(['name' => 'jobholder.update']);
        $jobholder_delete = Permission::create(['name' => 'jobholder.delete']);
        // Role subject
        $subject_view = Permission::create(['name' => 'subject.view']);
        $subject_create = Permission::create(['name' => 'subject.create']);
        $subject_update = Permission::create(['name' => 'subject.update']);
        $subject_delete = Permission::create(['name' => 'subject.delete']);

        // Role company
        $company_view = Permission::create(['name' => 'company.view']);
        $company_create = Permission::create(['name' => 'company.create']);
        $company_update = Permission::create(['name' => 'company.update']);
        $company_delete = Permission::create(['name' => 'company.delete']);

        // Subject Schedule
        $subject_schedule_view = Permission::create(['name' => 'subject_schedule.view']);
        $subject_schedule_create = Permission::create(['name' => 'subject_schedule.create']);
        $subject_schedule_delete = Permission::create(['name' => 'subject_schedule.delete']);

        // Warned Dismissed Student
        


        $admin_role = Role::create(['name' => 'admin']);
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
            $teacher_view,
            $teacher_create,
            $teacher_update,
            $teacher_delete,
            $register_specialty_view,
            $register_specialty_create,
            $register_specialty_update,
            $register_specialty_delete,
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
    }
}
