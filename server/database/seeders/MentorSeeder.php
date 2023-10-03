<?php

namespace Database\Seeders;

use App\Models\Mentor;
use Illuminate\Database\Seeder;

class MentorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Mentor::create([
            'mentor_name' => "Hoàng Gia Bảo",
            'mentor_email' => "hgbao2k3@gmail.com",
            'mentor_phone' => "0355374322"
        ]);
    }
}
