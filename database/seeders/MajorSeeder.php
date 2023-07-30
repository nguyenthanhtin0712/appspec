<?php

namespace Database\Seeders;

use App\Models\Major;
use Illuminate\Database\Seeder;

class MajorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Major::create([
            'major_id' => 'DCT',
            'major_name' => 'Công nghệ thông tin',
            'major_isDelete' => '0'
        ]);

        Major::create([
            'major_id' => 'DKP',
            'major_name' => 'Kỹ thuật phần mềm',
            'major_isDelete' => '0'
        ]);

        Major::create([
            'major_id' => 'DCT_C',
            'major_name' => 'Công nghệ thông tin(CLC)',
            'major_isDelete' => '0'
        ]);
    }
}
