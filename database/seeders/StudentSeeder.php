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
        $users = User::take(100)->get();
        $index = 0;
        foreach ($users as $user) {
            $student = new Student([
                'user_id' => $user->user_id,
                'student_code' => '312141006' . $index,
                'student_class' => 'DCT121' . $index,
                'student_score' => 3.5,
                'student_course' => 2021,
                'major_id' => 1,
            ]);
            $student->save();
            $index++; 
        }
    }
}
