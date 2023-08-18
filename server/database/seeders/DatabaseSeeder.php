<?php

namespace Database\Seeders;

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
        $this->call(RoleSeeder::class);
        \App\Models\User::factory(100)->create();
        $this->call(UserSeeder::class);
        $this->call(MajorSeeder::class);
        $this->call(SpecialtySeeder::class);
        $this->call(StudentSeeder::class);
        $this->call(EmployerSeeder::class);
        $this->call(TeacherSeeder::class);
        $this->call(DisplayConfigSeeder::class);
        $this->call(RegisterSpecialtySeeder::class);
        $this->call(RegisterSpecialtyDetailSeeder::class);
        $this->call(RecruitmentPositionSeeder::class);
        $this->call(InterCompanySeeder::class);
        $this->call(InternRegistrationSeeder::class);
        $this->call(InternRegistrationCompanySeeder::class);
        $this->call(CompanyPositionDetailSeeder::class);
        $this->call(AcademicFieldSeeder::class);
        $this->call(TitleSeeder::class);
        $this->call(DegreeSeeder::class);
        $this->call(JobHolderSeeder::class);
        $this->call(SubjectSeeder::class);
    }
}
