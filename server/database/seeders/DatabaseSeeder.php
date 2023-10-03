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
        $this->call(TeacherSeeder::class);
        $this->call(DisplayConfigSeeder::class);
        $this->call(RegisterSpecialtySeeder::class);
        $this->call(RegisterSpecialtyDetailSeeder::class);
        $this->call(RecruitmentPositionSeeder::class);
        $this->call(CompanySeeder::class);
        $this->call(RegisterIntershipCompanySeeder::class);
        $this->call(CompanyPositionDetailSeeder::class);
        $this->call(AcademicFieldSeeder::class);
        $this->call(TitleSeeder::class);
        $this->call(JobHolderSeeder::class);
        $this->call(SubjectSeeder::class);
        $this->call(InternshipGraduationSeeder::class);
        $this->call(OpenclassTimeSeeder::class);
        $this->call(JobholderInternshipSeeder::class);
        $this->call(StudentSeeder::class);
        $this->call(ContactSeeder::class);
        $this->call(ContactConfigSeeder::class);
        $this->call(MentorSeeder::class);
    }
}
