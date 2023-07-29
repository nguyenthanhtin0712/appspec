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
            'specialty_id' => 'HTTT',
            'specialty_name' => 'Hệ thống thông tin',
            'major_id' => 'DCT',
            'specialty_isDelete' => '0',
        ]);
        Specialty::create([
            'specialty_id' => 'KTPM',
            'specialty_name' => 'Kỹ thuật phần mềm',
            'major_id' => 'DCT',
            'specialty_isDelete' => '0',
        ]);
        Specialty::create([
            'specialty_id' => 'MMT',
            'specialty_name' => 'Mạng máy tính',
            'major_id' => 'DCT',
            'specialty_isDelete' => '0',
        ]);
        Specialty::create([
            'specialty_id' => 'KHMT',
            'specialty_name' => 'Khoa học máy tính',
            'major_id' => 'DCT',
            'specialty_isDelete' => '0',
        ]);

        //Ngành kỹ thuật phần mềm
        Specialty::create([
            'specialty_id' => 'LTW',
            'specialty_name' => 'Lập trình Web',
            'major_id' => 'DKP',
            'specialty_isDelete' => '0',
        ]);
        Specialty::create([
            'specialty_id' => 'LTUD',
            'specialty_name' => 'Lập trình ứng dụng',
            'major_id' => 'DKP',
            'specialty_isDelete' => '0',
        ]);
    }
}