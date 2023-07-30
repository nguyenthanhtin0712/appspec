<?php

namespace Database\Seeders;

use App\Models\RegisterSpecialtyDetail;
use Illuminate\Database\Seeder;

class RegisterSpecialtyDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RegisterSpecialtyDetail::create([
            'register_specialty_id' => '1',
            'specialty_id' => 'HTTT',
            'specialty_quantity' => '70'
        ]);

        RegisterSpecialtyDetail::create([
            'register_specialty_id' => '1',
            'specialty_id' => 'KHMT',
            'specialty_quantity' => '70'
        ]);

        RegisterSpecialtyDetail::create([
            'register_specialty_id' => '1',
            'specialty_id' => 'KTPM',
            'specialty_quantity' => '315'
        ]);

        RegisterSpecialtyDetail::create([
            'register_specialty_id' => '1',
            'specialty_id' => 'MMT',
            'specialty_quantity' => '70'
        ]);

        RegisterSpecialtyDetail::create([
            'register_specialty_id' => '1',
            'specialty_id' => 'LTUD',
            'specialty_quantity' => '50'
        ]);

        RegisterSpecialtyDetail::create([
            'register_specialty_id' => '1',
            'specialty_id' => 'LTW',
            'specialty_quantity' => '50'
        ]);
    }
}
