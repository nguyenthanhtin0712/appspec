<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $companies = [
            [
                'company_name' => 'ABC Corporation',
                'user_id' => '1',
                'company_address' => '123 Main Street',
                'company_host' => 'https://www.github.com/hgbaodev',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'XYZ Inc.',
                'user_id' => '2',
                'company_address' => '456 Park Avenue',
                'company_host' => 'https://www.github.com/hgbaodev',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ]
        ];
        DB::table('companies')->insert($companies);
    }
}
