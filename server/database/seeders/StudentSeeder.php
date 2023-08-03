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
        $major = ['DCT', 'DKP'];
        $users = User::take(103)->get();
        $index = 0;
        foreach ($users as $user) {
            // $randomSpecialty = $specialtyOptions[array_rand($specialtyOptions)];
            $randomMajor = $major[array_rand($major)];
            $student = new Student([
                'user_id' => $user->user_id,
                'student_code' => '312141006' . $index,
                'student_class' => 'DCT121' . $index,
                'student_score' => 3.5,
                'student_course' => 2021,
                'major_id' => $randomMajor,
                // 'specialty_id' => $randomSpecialty
            ]);
            $student->save();
            $index++;
        }
    }
}