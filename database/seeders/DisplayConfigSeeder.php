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
            'display_config_id' => 'REGISTER_SPECIALTY',
            'display_config_name' => 'Đăng ký chuyên ngành',
            'display_config_value' => '1'
        ]);
        DisplayConfig::insert([
            'display_config_id' => 'REGISTER_INTERN',
            'display_config_name' => 'Đăng ký thực tập',
            'display_config_value' => '1'
        ]);
    }
}