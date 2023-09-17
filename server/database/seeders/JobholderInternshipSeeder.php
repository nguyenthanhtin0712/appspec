<?php

namespace Database\Seeders;

use App\Models\JobholderInternship;
use Illuminate\Database\Seeder;

class JobholderInternshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        JobholderInternship::create([
            'jobholder_code' => 111111,
            'internship_graduation_id' => 1
        ]);
        JobholderInternship::create([
            'jobholder_code' => 222222,
            'internship_graduation_id' => 1
        ]);
        JobholderInternship::create([
            'jobholder_code' => 333333,
            'internship_graduation_id' => 1
        ]);
    }
}
