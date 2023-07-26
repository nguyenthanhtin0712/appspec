<?php

namespace Database\Seeders;

use App\Models\Specialty;
use Illuminate\Database\Seeder;

class SpecialtySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Ngành công nghệ thông tin
        Specialty::create([
            'specialty_code' => 'HTTT',
            'specialty_name' => 'Hệ thống thông tin',
            'major_id' => '1',
            'specialty_isDelete' => '0',
        ]);
        Specialty::create([
            'specialty_code' => 'KTPM',
            'specialty_name' => 'Kỹ thuật phần mềm',
            'major_id' => '1',
            'specialty_isDelete' => '0',
        ]);
        Specialty::create([
            'specialty_code' => 'MMT',
            'specialty_name' => 'Mạng máy tính',
            'major_id' => '1',
            'specialty_isDelete' => '0',
        ]);
        Specialty::create([
            'specialty_code' => 'KHMT',
            'specialty_name' => 'Khoa học máy tính',
            'major_id' => '1',
            'specialty_isDelete' => '0',
        ]);

        //Ngành kỹ thuật phần mềm
        Specialty::create([
            'specialty_code' => 'LTW',
            'specialty_name' => 'Lập trình Web',
            'major_id' => '2',
            'specialty_isDelete' => '0',
        ]);
        Specialty::create([
            'specialty_code' => 'LTUD',
            'specialty_name' => 'Lập trình ứng dụng',
            'major_id' => '2',
            'specialty_isDelete' => '0',
        ]);
    }
}
