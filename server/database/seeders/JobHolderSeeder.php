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
            'user_id' => '4',
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

        JobHolder::create([
            'user_id' => '5',
            'jobholder_code' => '222222',
            'title_id' => '1',
            'academic_field_id' => 'KTPM',
            'jobholder_isLeader' => '1',
            'jobholder_unit' => 'Phòng đào tạo',
            'jobholder_specialty' => 'Hệ thống thông tin',
            'jobholder_position' => 'Giáo sư',
            'jobholder_type' => 'Thỉnh giảng',
            'jobholder_degree' => 'Thạc sĩ',
            'jobholder_isLeader' => '0',
        ]);

        JobHolder::create([
            'user_id' => '6',
            'jobholder_code' => '333333',
            'title_id' => '1',
            'academic_field_id' => 'KTPM',
            'jobholder_isLeader' => '1',
            'jobholder_unit' => 'Phòng đào tạo',
            'jobholder_specialty' => 'Kĩ thuật lập trình',
            'jobholder_position' => 'Giảng viên',
            'jobholder_type' => 'Thỉnh giảng',
            'jobholder_degree' => 'Thạc sĩ',
            'jobholder_isLeader' => '0',
        ]);

        JobHolder::create([
            'user_id' => '7',
            'jobholder_code' => '444444',
            'title_id' => '1',
            'academic_field_id' => 'KTPM',
            'jobholder_isLeader' => '1',
            'jobholder_unit' => 'Phòng đào tạo',
            'jobholder_specialty' => 'Kĩ thuật lập trình',
            'jobholder_position' => 'Giảng viên',
            'jobholder_type' => 'Thỉnh giảng',
            'jobholder_degree' => 'Thạc sĩ',
            'jobholder_isLeader' => '0',
        ]);

        JobHolder::create([
            'user_id' => '8',
            'jobholder_code' => '555555',
            'title_id' => '1',
            'academic_field_id' => 'KTPM',
            'jobholder_isLeader' => '1',
            'jobholder_unit' => 'Phòng đào tạo',
            'jobholder_specialty' => 'Kĩ thuật lập trình',
            'jobholder_position' => 'Giảng viên',
            'jobholder_type' => 'Thỉnh giảng',
            'jobholder_degree' => 'Thạc sĩ',
            'jobholder_isLeader' => '1',
        ]);

        JobHolder::create([
            'user_id' => '9',
            'jobholder_code' => '666666',
            'title_id' => '1',
            'academic_field_id' => 'KTPM',
            'jobholder_isLeader' => '1',
            'jobholder_unit' => 'Phòng đào tạo',
            'jobholder_specialty' => 'Kĩ thuật lập trình',
            'jobholder_position' => 'Giảng viên',
            'jobholder_type' => 'Thỉnh giảng',
            'jobholder_degree' => 'Thạc sĩ',
            'jobholder_isLeader' => '0',
        ]);
    }
}
