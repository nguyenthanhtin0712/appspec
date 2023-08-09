<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Teacher;
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
                'teacher_id' => 'T' . $faker->unique()->numberBetween(1000, 9999),
                'teacher_name' => $faker->name,
                'teacher_phone' => '0' . $faker->numberBetween(1, 9) . $faker->numerify('#########'),
                'teacher_email' => $faker->email,
                'teacher_birthday' => $faker->date('Y-m-d', '-25 years', '-30 years'),
                'teacher_title' => $faker->randomElement(['Professor', 'Associate Professor', 'Assistant Professor']),
                'teacher_spec' => 'KTPM',
                'teacher_unit' => $faker->randomElement(['Science Department', 'Mathematics Department', 'English Department']),
            ]);
        }
    }
}

