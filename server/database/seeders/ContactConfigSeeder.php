<?php

namespace Database\Seeders;

use App\Models\ContactConfig;
use Illuminate\Database\Seeder;

class ContactConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ContactConfig::create([
            'department_name' => 'Khoa công nghệ thông tin',
            'department_address' => 'Phòng D301, Số 273 An Dương Vương, Phường 3, Quận 5, TP. HCM',
            'department_phone' => '(028) 38382 664',
            'department_email' => 'vpkcntt@sgu.edu.vn',
            'admin_name' => 'Nguyễn Thanh Sang',
            'admin_phone' => '0366 686 557',
            'admin_email' => 'thanhsang@sgu.edu.vn',
        ]);
    }
}
