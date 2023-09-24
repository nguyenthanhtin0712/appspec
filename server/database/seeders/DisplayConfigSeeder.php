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
            'display_config_id' => 'register_specialty',
            'display_config_name' => 'Đăng ký chuyên ngành',
            'display_config_value' => '1'
        ]);

        DisplayConfig::insert([
            'display_config_id' => 'register_intern',
            'display_config_name' => 'Đăng ký thực tập',
            'display_config_value' => '1'
        ]);

        DisplayConfig::insert([
            'display_config_id' => 'register_email',
            'display_config_name' => 'Email',
            'display_config_value' => 'musicanime2501@gmail.com'
        ]);
    }
}
