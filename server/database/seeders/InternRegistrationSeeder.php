<?php

namespace Database\Seeders;

use App\Models\InternRegistration;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InternRegistrationSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();

        for ($i = 1; $i <= 20; $i++) {
            $start_date = $now->addMonths($i);
            $end_date = $start_date->copy()->addMonths(3);
            InternRegistration::create([
                'intern_registration_start_date' => $start_date,
                'intern_registration_end_date' => $end_date,
                'intern_registration_semester' => ($i % 2 === 0) ? 2 : 1,
                'intern_registration_year' => $start_date->year,
                'intern_registration_isDelete' => 0,
            ]);
        }
    }
}
