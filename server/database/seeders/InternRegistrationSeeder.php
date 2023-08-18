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
        $start_date = $now->addMonths(1);
        $end_date = $start_date->copy()->addMonths(3);
        InternRegistration::create([
            'internship_graduation_id' => 1,
            'intern_registration_name' => "Đăng ký thực tập khóa 21 đợt 1",
            'intern_registration_start_date' => $start_date,
            'intern_registration_end_date' => $end_date,
            'intern_registration_isDelete' => 0,
        ]);
    }
}
