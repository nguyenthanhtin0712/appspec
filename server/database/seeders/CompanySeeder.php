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
                'company_name' => 'Tech Innovators',
                'user_id' => '1',
                'company_address' => '123 Main Street',
                'company_host' => 'https://www.github.com/techinnovators',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'GreenTech Solutions',
                'user_id' => '2',
                'company_address' => '456 Park Avenue',
                'company_host' => 'https://www.github.com/greentechsolutions',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'Infinite Horizons',
                'user_id' => '3',
                'company_address' => '789 Elm Street',
                'company_host' => 'https://www.github.com/infinitehorizons',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'Web Wizards Inc.',
                'user_id' => '4',
                'company_address' => '101 Oak Avenue',
                'company_host' => 'https://www.github.com/webwizards',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'DataSage Systems',
                'user_id' => '5',
                'company_address' => '222 Pine Street',
                'company_host' => 'https://www.github.com/datasagesystems',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'FusionTech Labs',
                'user_id' => '6',
                'company_address' => '333 Cedar Avenue',
                'company_host' => 'https://www.github.com/fusiontechlabs',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'Skyline Innovations',
                'user_id' => '7',
                'company_address' => '444 Birch Street',
                'company_host' => 'https://www.github.com/skylineinnovations',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'AlphaByte Technologies',
                'user_id' => '8',
                'company_address' => '555 Maple Avenue',
                'company_host' => 'https://www.github.com/alphabyte',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'FutureTech Solutions',
                'user_id' => '9',
                'company_address' => '666 Oak Street',
                'company_host' => 'https://www.github.com/futuretechsolutions',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'EcoWave Industries',
                'user_id' => '10',
                'company_address' => '777 Elm Avenue',
                'company_host' => 'https://www.github.com/ecowaveindustries',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
        ];
        
        DB::table('companies')->insert($companies);
    }
}
