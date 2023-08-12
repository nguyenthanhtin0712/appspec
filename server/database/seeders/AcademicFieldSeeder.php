<?php

namespace Database\Seeders;

use App\Models\AcademicField;
use Illuminate\Database\Seeder;

class AcademicFieldSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AcademicField::create([
            'academic_field_id' => 'KHMT',
            'academic_field_name' => 'Khoa học máy tính',
            'academic_field_isDelete' => '0'
        ]);

        AcademicField::create([
            'academic_field_id' => 'KTPM',
            'academic_field_name' => 'Kĩ thuật phần mềm',
            'academic_field_isDelete' => '0'
        ]);

        AcademicField::create([
            'academic_field_id' => 'HTTT',
            'academic_field_name' => 'Hệ thống thông tin',
            'academic_field_isDelete' => '0'
        ]);

        AcademicField::create([
            'academic_field_id' => 'KTMT',
            'academic_field_name' => 'Kĩ thuật máy tính',
            'academic_field_isDelete' => '0'
        ]);
    }
}
