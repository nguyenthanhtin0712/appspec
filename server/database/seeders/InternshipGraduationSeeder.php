<?php

namespace Database\Seeders;

use App\Models\InternshipGraduation;
use Illuminate\Database\Seeder;

class InternshipGraduationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        InternshipGraduation::create([
            'openclass_time_id' => 1,
            'internship_graduation_start_date' => "2023-01-01",
            'internship_graduation_end_date' => "2023-04-01",
        ]);

        InternshipGraduation::create([
            'openclass_time_id' => 2,
            'internship_graduation_start_date' => "2023-05-01",
            'internship_graduation_end_date' => "2023-08-01",
        ]);

        InternshipGraduation::create([
            'openclass_time_id' => 1,
            'internship_graduation_start_date' => "2023-08-01",
            'internship_graduation_end_date' => "2023-12-01",
        ]);
    }
}
