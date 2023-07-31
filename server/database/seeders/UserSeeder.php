<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;


class UserSeeder extends Seeder
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
        //Role employer
        $employer_view = Permission::create(['name' => 'employer.view']);
        $employer_create = Permission::create(['name' => 'employer.create']);
        $employer_update = Permission::create(['name' => 'employer.update']);
        $employer_delete = Permission::create(['name' => 'employer.delete']);
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
            $employer_view,
            $employer_create,
            $employer_update,
            $employer_delete,
            $teacher_view,
            $teacher_create,
            $teacher_update,
            $teacher_delete,
            $register_specialty_view,
            $register_specialty_create,
            $register_specialty_update,
            $register_specialty_delete,
        ]);

        $admin = User::create([
            'user_email' => 'musicanime2501@gmail.com',
            'user_firstname' => 'Hoàng Gia',
            'user_lastname' => 'Bảo',
            'user_phone' => '0355374322',
            'user_avatar' => 'https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg',
            'user_password' => bcrypt('password'),
            'user_gender' => '1',
            'user_birthday' => '2003-01-01',
        ]);

        
        $user1 = User::create([
            'user_email' => 'transinh085@gmail.com',
            'user_firstname' => 'Trần Nhật',
            'user_lastname' => 'Sinh',
            'user_phone' => '098765432',
            'user_avatar' => 'https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg',
            'user_password' => bcrypt('password'),
            'user_gender' => '1',
            'user_status' => '1',
            'user_birthday' => '2003-12-20',
        ]);
        
        $user2 = User::create([
            'user_email' => 'hungpro@gmail.com',
            'user_firstname' => 'Hồ Minh',
            'user_lastname' => 'Hưng',
            'user_phone' => '098765432',
            'user_avatar' => 'https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg',
            'user_password' => bcrypt('password'),
            'user_gender' => '1',
            'user_status' => '1',
            'user_birthday' => '2003-12-20',
        ]);
        
        $admin->assignRole($admin_role);
        $user1->assignRole($admin_role);
        $user2->assignRole($admin_role);
    }
}