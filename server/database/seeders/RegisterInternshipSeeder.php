<?php

namespace Database\Seeders;

use App\Models\RegisterInternship;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class RegisterInternshipSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();
        $start_date = $now->addMonths(1);
        $end_date = $start_date->copy()->addMonths(3);
        RegisterInternship::create([
            'register_internship_id' => 1,
            'register_internship_start_date' => $start_date,
            'register_internship_end_date' => $end_date,
            'register_internship_isDelete' => 0,
        ]);
    }
}
