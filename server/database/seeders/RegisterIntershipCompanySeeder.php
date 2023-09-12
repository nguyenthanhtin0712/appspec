<?php

namespace Database\Seeders;

use App\Models\RegisterIntershipCompany;
use Illuminate\Database\Seeder;

class RegisterIntershipCompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RegisterIntershipCompany::create([
            'register_internship_company_id' => '1',
            'register_internship_id' => '1',
            'company_id' => '1',
        ]);
        RegisterIntershipCompany::create([
            'register_internship_company_id' => '2',
            'register_internship_id' => '1',
            'company_id' => '3',
            'company_isInterview' => 1
        ]);
        RegisterIntershipCompany::create([
            'register_internship_company_id' => '3',
            'register_internship_id' => '1',
            'company_id' => '2',
        ]);
    }
}
