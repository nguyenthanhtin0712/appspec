<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IntershipCompanySeeder extends Seeder
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
                'company_phone' => '123-456-7890',
                'company_email' => 'musicanime2501@gmail.com',
                'company_address' => '123 Main Street',
                'company_host' => 'https://www.github.com/hgbaodev',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'XYZ Inc.',
                'company_phone' => '987-654-3210',
                'company_email' => 'musicanime2501@gmail.com',
                'company_address' => '456 Park Avenue',
                'company_host' => 'https://www.github.com/hgbaodev',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'Tech Solutions Ltd.',
                'company_phone' => '555-123-4567',
                'company_email' => 'musicanime2501@gmail.com',
                'company_address' => '789 Broadway',
                'company_host' => 'https://www.github.com/hgbaodev',
                'company_is_official' => 0,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'Software Co.',
                'company_phone' => '00355374322',
                'company_email' => 'musicanime2501@gmail.com',
                'company_address' => '321 Oak Street',
                'company_host' => 'https://www.github.com/hgbaodev',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'Creative Designs',
                'company_phone' => '444-555-6666',
                'company_email' => 'musicanime2501@gmail.com',
                'company_address' => '999 Elm Avenue',
                'company_host' => 'https://www.github.com/hgbaodev',
                'company_is_official' => 1,
                'company_isDelete' => 1,
            ],
            [
                'company_name' => 'Tech Innovators',
                'company_phone' => '111-222-3333',
                'company_email' => 'musicanime2501@gmail.com',
                'company_address' => '222 Maple Road',
                'company_host' => 'https://www.github.com/hgbaodev',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'Global Enterprises',
                'company_phone' => '777-888-9999',
                'company_email' => 'musicanime2501@gmail.com',
                'company_address' => '777 Pine Lane',
                'company_host' => 'https://www.github.com/hgbaodev',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'Innovative Solutions',
                'company_phone' => '222-333-4444',
                'company_email' => 'musicanime2501@gmail.com',
                'company_address' => '333 Birch Court',
                'company_host' => 'https://www.github.com/hgbaodev',
                'company_is_official' => 0,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'TechHub Inc.',
                'company_phone' => '999-888-7777',
                'company_email' => 'musicanime2501@gmail.com',
                'company_address' => '666 Cedar Lane',
                'company_host' => 'https://www.github.com/hgbaodev',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
            [
                'company_name' => 'The Startup Garage',
                'company_phone' => '444-222-5555',
                'company_email' => 'musicanime2501@gmail.com',
                'company_address' => '111 Willow Street',
                'company_host' => 'https://www.github.com/hgbaodev',
                'company_is_official' => 1,
                'company_isDelete' => 0,
            ],
        ];
        DB::table('internship_company')->insert($companies);
    }
}
