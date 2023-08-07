<?php

namespace Database\Seeders;

use App\Models\InternRegistrationCompany;
use Illuminate\Database\Seeder;

class InternRegistrationCompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        InternRegistrationCompany::create([
            'intern_registration_company_id' => '1',
            'intern_registration_id' => '1',
            'company_id' => '1',
        ]);
    }
}
