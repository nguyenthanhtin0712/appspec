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
            'position_note' => "Yêu cầu GPA 3.2",
        ]);
    }
}
