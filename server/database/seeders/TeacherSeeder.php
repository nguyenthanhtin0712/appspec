<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Teacher;
use App\Models\Speciality;
use Faker\Factory as Faker;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        for ($i = 0; $i < 10; $i++) {
            Teacher::create([
                'teacher_code' => 'T' . $faker->unique()->numberBetween(1000, 9999),
                'teacher_name' => $faker->name,
                'teacher_phone' => $faker->phoneNumber,
                'teacher_email' => $faker->email,
                'teacher_birthday' => $faker->date('Y-m-d', '-25 years', '-30 years'),
                'teacher_title' => $faker->randomElement(['Professor', 'Associate Professor', 'Assistant Professor']),
                'teacher_unit' => $faker->randomElement(['Science Department', 'Mathematics Department', 'English Department']),
            ]);
        }
    }
}

