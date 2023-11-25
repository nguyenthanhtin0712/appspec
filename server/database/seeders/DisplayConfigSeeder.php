<?php

namespace Database\Seeders;

use App\Models\DisplayConfig;
use Illuminate\Database\Seeder;

class DisplayConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DisplayConfig::insert([
            'config_id' => 'register_specialty',
            'config_name' => 'Đăng ký chuyên ngành',
            'config_value' => '1'
        ]);

        DisplayConfig::insert([
            'config_id' => 'register_intern',
            'config_name' => 'Đăng ký thực tập',
            'config_value' => '1'
        ]);

        DisplayConfig::insert([
            'config_id' => 'email_contact',
            'config_name' => 'Email nhận liên hệ',
            'config_value' => 'musicanime2501@gmail.com'
        ]);

        DisplayConfig::insert([
            'config_id' => 'confirm_post',
            'config_name' => 'Phê duyệt bài viết',
            'config_value' => '1'
        ]);
    }
}
