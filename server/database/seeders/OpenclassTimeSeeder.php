<?php

namespace Database\Seeders;

use App\Models\OpenclassTime;
use Illuminate\Database\Seeder;

class OpenclassTimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OpenclassTime::create([
            'openclass_semester' => 1,
            'openclass_year' => 2023,
        ]);

        OpenclassTime::create([
            'openclass_semester' => 2,
            'openclass_year' => 2023,
        ]);

        OpenclassTime::create([
            'openclass_semester' => 3,
            'openclass_year' => 2023,
        ]);
    }
}
