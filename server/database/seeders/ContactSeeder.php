<?php

namespace Database\Seeders;

use App\Models\Contact;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Contact::create([
            'contact_fullname' => "Hoàng Gia Bảo",
            'contact_phone' => '0355374322',
            'contact_email' => 'hgbao2k3@gmail.com',
            'contact_content' => 'Hi hgbaodev'
        ]);

        Contact::create([
            'contact_fullname' => "Trần Nhật Sinh",
            'contact_phone' => '0355374322',
            'contact_email' => 'transinh085@gmail.com',
            'contact_content' => 'Hi transinh085@gmail.com'
        ]);
    }
}
