<?php

namespace Database\Seeders;

use App\Models\Degree;
use Illuminate\Database\Seeder;

class DegreeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Degree::create([
            'degree_name' => 'Thạc sĩ'
        ]);
        Degree::create([
            'degree_name' => 'Nghiên cứu sinh'
        ]);
        Degree::create([
            'degree_name' => 'Tiến sĩ'
        ]);
        Degree::create([
            'degree_name' => 'Phó giáo sư tiến sĩ'
        ]);
        Degree::create([
            'degree_name' => 'Giáo sư tiến sĩ'
        ]);
    }
}
