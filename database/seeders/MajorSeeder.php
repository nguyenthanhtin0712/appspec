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
            'major_id' => '1',
            'major_code' => 'DCT',
            'major_name' => 'Công nghệ thông tin',
            'major_isDelete' => '0'
        ]);

        


        Major::create([
            'major_id' => '2',
            'major_code' => 'DKP',
            'major_name' => 'Kỹ thuật phần mềm',
            'major_isDelete' => '0'
        ]);

        Major::create([
            'major_id' => '3',
            'major_code' => 'DCT_C',
            'major_name' => 'Công nghệ thông tin(CLC)',
            'major_isDelete' => '0'
        ]);

    }
}
