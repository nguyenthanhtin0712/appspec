<?php

namespace Database\Seeders;

use App\Models\InternshipGraduation;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class InternshipGraduationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now();
        $start_date = $now->addMonths(-4);
        $end_date = $start_date->copy()->addMonths(3);
        InternshipGraduation::create([
            'internship_graduation_id' => 1,
            'internship_graduation_start_date' => "2023-01-01",
            'internship_graduation_end_date' => "2023-12-12",
            'register_internship_start_date' => $start_date,
            'register_internship_end_date' => $end_date,
        ]);
    }
}
