<?php

namespace Database\Seeders;

use App\Models\JobHolder;
use Illuminate\Database\Seeder;

class JobHolderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        JobHolder::create([
            'user_id' => '104',
            'jobholder_code' => '111111',
            'title_id' => '1',
            'academic_field_id' => 'KTPM',
            'jobholder_isLeader' => '1',
            'jobholder_unit' => 'Phòng đào tạo',
            'jobholder_specialty' => 'Kĩ thuật phần mềm',
            'jobholder_position' => 'Giảng viên',
            'jobholder_type' => 'Thỉnh giảng',
            'jobholder_degree' => 'Thạc sĩ',
            'jobholder_isLeader' => '0',
        ]);
    }
}
