<?php

namespace Database\Seeders;

use App\Models\CompanyPositionDetail;
use Illuminate\Database\Seeder;

class CompanyPositionDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CompanyPositionDetail::create([
            'register_internship_company_id' => '1',
            'position_id' => '1',
            'position_quantity' => '5',
        ]);
        CompanyPositionDetail::create([
            'register_internship_company_id' => '2',
            'position_id' => '1',
            'position_quantity' => '1',
        ]);
        CompanyPositionDetail::create([
            'register_internship_company_id' => '2',
            'position_id' => '2',
            'position_quantity' => '4',
        ]);
        CompanyPositionDetail::create([
            'register_internship_company_id' => '2',
            'position_id' => '3',
            'position_quantity' => '3',
        ]);
        CompanyPositionDetail::create([
            'register_internship_company_id' => '3',
            'position_id' => '5',
            'position_quantity' => '1',
        ]);
        CompanyPositionDetail::create([
            'register_internship_company_id' => '3',
            'position_id' => '5',
            'position_quantity' => '2',
        ]);
        CompanyPositionDetail::create([
            'register_internship_company_id' => '3',
            'position_id' => '6',
            'position_quantity' => '9',
        ]);
    }
}
