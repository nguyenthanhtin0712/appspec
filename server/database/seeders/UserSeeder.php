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
        $admin_role = Role::findByName('admin');

        $admin = User::create([
            'user_email' => 'musicanime2501@gmail.com',
            'user_firstname' => 'Hoàng Gia',
            'user_lastname' => 'Bảo',
            'user_phone' => '0355374322',
            'user_avatar' => 'https://avatars.githubusercontent.com/u/120194990?v=4',
            'user_password' => bcrypt('password'),
            'user_gender' => '1',
            'user_birthday' => '2003-01-01',
        ]);
        
        $user1 = User::create([
            'user_email' => 'transinh085@gmail.com',
            'user_firstname' => 'Trần Nhật',
            'user_lastname' => 'Sinh',
            'user_phone' => '098765432',
            'user_avatar' => 'https://avatars.githubusercontent.com/u/45101901?v=4',
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

        $user3 = User::create([
            'user_email' => 'thanhsang@sgu.edu.vn',
            'user_firstname' => 'Nguyễn Thanh',
            'user_lastname' => 'Sang',
            'user_phone' => '098765432',
            'user_avatar' => 'https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg',
            'user_password' => bcrypt('password'),
            'user_gender' => '0',
            'user_status' => '1',
            'user_birthday' => '2003-12-20',
        ]);
        
        $admin->assignRole($admin_role);
        $user1->assignRole($admin_role);
        $user2->assignRole($admin_role);
        $user3->assignRole($admin_role);
    }
}