<?php

namespace Database\Seeders;

use App\Models\Title;
use Illuminate\Database\Seeder;

class TitleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Title::create([
            'title_name' => 'Giảng viên',
        ]);

        Title::create([
            'title_name' => 'Trợ lý đào tạo',
        ]);

        Title::create([
            'title_name' => 'Thư ký',
        ]);
    }
}
