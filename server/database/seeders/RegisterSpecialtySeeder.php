<?php

namespace Database\Seeders;

use App\Models\RegisterSpecialty;
use Illuminate\Database\Seeder;

class RegisterSpecialtySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RegisterSpecialty::create([
            'register_specialty_id' => '1',
            'register_specialty_name' => 'Đăng ký chuyên ngành khóa 21',
            'register_specialty_start_date' => '2023-07-30 00:00:00',
            'register_specialty_end_date' => '2023-09-30 00:00:00',
            'register_specialty_course' => '2021'
        ]);
    }
}