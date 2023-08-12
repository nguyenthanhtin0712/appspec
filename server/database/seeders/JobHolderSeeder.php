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
            'jobholder_name' => 'Nguyễn Thanh Sang',
            'jobholder_birthday' => '1973-10-01',
            'jobholder_gender' => '0',
            'jobholder_email' => 'thanhsang@edu.sgu.com',
            'jobholder_phone' => '0355374322',
            'degree_id' => '1',
            'title_id' => '1',
            'academic_field_id' => 'KTPM',
            'jobholder_isLeader' => '0',
        ]);
    }
}
