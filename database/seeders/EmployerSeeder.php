<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employer;

class EmployerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Employer::create([
            'employer_name' => 'ABC Corporation',
            'employer_website' => 'www.abccorp.com',
            'employer_email' => 'contact@abccorp.com',
            'employer_phone' => '+1 (123) 456-7890',
            'employer_desc' => 'We are a leading technology company providing innovative solutions.',
        ]);

        Employer::create([
            'employer_name' => 'XYZ Enterprises',
            'employer_website' => 'www.xyzenterprises.com',
            'employer_email' => 'info@xyzenterprises.com',
            'employer_phone' => '+1 (987) 654-3210',
            'employer_desc' => 'We specialize in manufacturing high-quality products.',
        ]);

        Employer::create([
            'employer_name' => 'PQR Industries',
            'employer_website' => 'www.pqrindustries.com',
            'employer_email' => 'contact@pqrindustries.com',
            'employer_phone' => '+1 (555) 123-4567',
            'employer_desc' => 'Providing top-notch services since 1998.',
        ]);

        // Add the remaining 7 employers here...

        Employer::create([
            'employer_name' => 'GHI Services',
            'employer_website' => 'www.ghiservices.com',
            'employer_email' => 'support@ghiservices.com',
            'employer_phone' => '+1 (888) 999-0000',
            'employer_desc' => 'Your reliable partner for all service needs.',
        ]);
    }
}

