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
            'company_position_detail_id' => '1',
            'register_internship_company_id' => '1',
            'position_id' => '1',
            'position_quantity' => '5',
        ]);
        CompanyPositionDetail::create([
            'company_position_detail_id' => '2',
            'register_internship_company_id' => '2',
            'position_id' => '1',
            'position_quantity' => '1',
        ]);
        CompanyPositionDetail::create([
            'company_position_detail_id' => '3',
            'register_internship_company_id' => '2',
            'position_id' => '2',
            'position_quantity' => '4',
        ]);
        CompanyPositionDetail::create([
            'company_position_detail_id' => '4',
            'register_internship_company_id' => '2',
            'position_id' => '3',
            'position_quantity' => '3',
        ]);
        CompanyPositionDetail::create([
            'company_position_detail_id' => '5',
            'register_internship_company_id' => '3',
            'position_id' => '5',
            'position_quantity' => '1',
        ]);
        CompanyPositionDetail::create([
            'company_position_detail_id' => '6',
            'register_internship_company_id' => '3',
            'position_id' => '5',
            'position_quantity' => '2',
        ]);
        CompanyPositionDetail::create([
            'company_position_detail_id' => '6',
            'register_internship_company_id' => '3',
            'position_id' => '6',
            'position_quantity' => '9',
        ]);
        CompanyPositionDetail::create([
            'company_position_detail_id' => '6',
            'register_internship_company_id' => '4',
            'position_id' => '10',
            'position_quantity' => '7',
        ]);
        CompanyPositionDetail::create([
            'company_position_detail_id' => '6',
            'register_internship_company_id' => '4',
            'position_id' => '11',
            'position_quantity' => '12',
        ]);
    }
}
