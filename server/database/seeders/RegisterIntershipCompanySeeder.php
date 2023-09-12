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
            'internship_graduation_id' => '1',
            'company_id' => '1',
        ]);
        RegisterIntershipCompany::create([
            'register_internship_company_id' => '2',
            'internship_graduation_id' => '1',
            'company_id' => '3',
            'company_isInterview' => 1
        ]);
        RegisterIntershipCompany::create([
            'register_internship_company_id' => '3',
            'internship_graduation_id' => '1',
            'company_id' => '2',
        ]);
    }
}
