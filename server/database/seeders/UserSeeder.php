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
        $jobholder_role = Role::findByName('jobhodler');

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
            'user_email' => 'hgbao2k3@gmail.com',
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
            'user_avatar' => 'http://fit.sgu.edu.vn/site/wp-content/uploads/2019/01/thanhsang.jpg',
            'user_password' => bcrypt('password'),
            'user_gender' => '0',
            'user_status' => '1',
            'user_birthday' => '2003-01-01',
        ]);

        $user4 = User::create([
            'user_email' => 'tankhoa@sgu.edu.vn',
            'user_firstname' => 'Trương Tấn',
            'user_lastname' => 'Khoa',
            'user_phone' => '0987262151',
            'user_avatar' => 'https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg',
            'user_password' => bcrypt('password'),
            'user_gender' => '0',
            'user_status' => '1',
            'user_birthday' => '2003-01-01',
        ]);

        $user5 = User::create([
            'user_email' => 'minhhuan@sgu.edu.vn',
            'user_firstname' => 'Lương Minh',
            'user_lastname' => 'Huấn',
            'user_phone' => '098721151',
            'user_avatar' => 'https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg',
            'user_password' => bcrypt('password'),
            'user_gender' => '0',
            'user_status' => '1',
            'user_birthday' => '2003-01-01',
        ]);

        $user6 = User::create([
            'user_email' => 'minhhuan@sgu.edu.vn',
            'user_firstname' => 'Phan Tấn',
            'user_lastname' => 'Quốc',
            'user_phone' => '098222151',
            'user_avatar' => 'https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg',
            'user_password' => bcrypt('password'),
            'user_gender' => '0',
            'user_status' => '1',
            'user_birthday' => '2003-01-01',
        ]);
        // 
        $user7 = User::create([
            'user_email' => 'nqhuy@sgu.edu.vn',
            'user_firstname' => 'Nguyễn Quốc',
            'user_lastname' => 'Huy',
            'user_phone' => '098222151',
            'user_avatar' => 'http://fit.sgu.edu.vn/site/wp-content/uploads/2019/01/nguyenquochuy.jpg',
            'user_password' => bcrypt('password'),
            'user_gender' => '0',
            'user_status' => '1',
            'user_birthday' => '2003-01-01',
        ]);

        $user8 = User::create([
            'user_email' => 'langphieu@sgu.edu.vn',
            'user_firstname' => 'Từ Lãng',
            'user_lastname' => 'Phiêu',
            'user_phone' => '098222151',
            'user_avatar' => 'http://fit.sgu.edu.vn/site/wp-content/uploads/2019/01/nguyenquochuy.jpg',
            'user_password' => bcrypt('password'),
            'user_gender' => '0',
            'user_status' => '1',
            'user_birthday' => '2003-01-01',
        ]);

        
        $admin->assignRole($admin_role);
        $user1->assignRole($admin_role);
        $user2->assignRole($admin_role);
        $user3->assignRole($jobholder_role);
        $user4->assignRole($jobholder_role);
        $user5->assignRole($jobholder_role);
        $user6->assignRole($jobholder_role);
        $user7->assignRole($jobholder_role);
        $user8->assignRole($jobholder_role);
    }
}