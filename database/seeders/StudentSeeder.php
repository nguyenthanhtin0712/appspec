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
                'student_code' => '312141006' . $index,
                'student_class' => 'DCT121' . $index,
                'student_score' => 3.5,
                'student_course' => 1,
                'major_id' => 1,
                'student_status' => 1,
                'student_isDelete' => 0,
            ]);
            $student->user_id = $user->id;
            $student->save();
            $index++; 
        }
    }
}
