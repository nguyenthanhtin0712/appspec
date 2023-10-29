<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $specialtyOptions = ['HTTT', 'KTPM', 'MMT', 'KHMT'];
        $jobholderOptions = ['1', '2', '3', '7', null];
        $major = ['DCT', 'DKP'];
        $users = User::take(103)->get();
        $index = 312141000;
        $lop = 1200;
        foreach ($users as $user) {
            // $randomSpecialty = $specialtyOptions[array_rand($specialtyOptions)];
            $randomMajor = $major[array_rand($major)];
            $student = new Student([
                'user_id' => $user->user_id,
                'student_code' => $index++,
                'student_class' => 'DCT' . $lop++,
                'student_score' => round(randomDecimal(10, 40, 1) / 10, 2),
                'student_course' => 2021,
                'major_id' => $randomMajor,
                'register_specialty_id' => 1,
                'company_position_detail_id' => random_int(1, 6),
                'jobholder_internship_id' => $jobholderOptions[array_rand($jobholderOptions)],
                'internship_graduation_id' => 1,
                'mentor_code' => 1
            ]);
            $student->save();
        }
    }
}

function randomDecimal($min, $max, $precision = 1)
{
    $factor = pow(10, $precision);
    return rand($min * $factor, $max * $factor) / $factor;
}