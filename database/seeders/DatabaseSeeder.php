<?php

namespace Database\Seeders;

use App\Models\DisplayConfig;
use App\Models\Employer;
use App\Models\Teacher;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(200)->create();
        $this->call(UserSeeder::class);
        $this->call(MajorSeeder::class);
        $this->call(SpecialtySeeder::class);
        $this->call(StudentSeeder::class);
        $this->call(EmployerSeeder::class);
        $this->call(TeacherSeeder::class);
        $this->call(DisplayConfigSeeder::class);
    }
}