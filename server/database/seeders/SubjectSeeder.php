<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Subject::create([
            'subject_id' => '841040',
            'subject_name' => 'Kỹ thuật lập trình',
            'subject_credit' => '3',
            'subject_coeffcient' => '0.75',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTMT',
        ]);
        Subject::create([
            'subject_id' => '841109',
            'subject_name' => 'Cơ sở dữ liệu',
            'subject_credit' => '4',
            'subject_coeffcient' => '0.8',
            'subject_LT' => '45',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'HTTT',
        ]);
        Subject::create([
            'subject_id' => '841107',
            'subject_name' => 'Lập trình java',
            'subject_credit' => '4',
            'subject_coeffcient' => '0.8',
            'subject_LT' => '45',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTPM',
        ]);
        Subject::create([
            'subject_id' => '841310',
            'subject_name' => 'Lý thuyết đồ thị',
            'subject_credit' => '3',
            'subject_coeffcient' => '0.75',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTPM',
        ]);
        Subject::create([
            'subject_id' => '841058',
            'subject_name' => 'Hệ điều hành mã nguồn mở',
            'subject_credit' => '3',
            'subject_coeffcient' => '0.75',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTMT',
        ]);
        Subject::create([
            'subject_id' => '841050',
            'subject_name' => 'Kiểm thử phần mềm',
            'subject_credit' => '3',
            'subject_coeffcient' => '0.75',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTPM',
        ]);
        Subject::create([
            'subject_id' => '841019',
            'subject_name' => 'An ninh mạng máy tính',
            'subject_credit' => '3',
            'subject_coeffcient' => '0.75',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTMT',
        ]);
        Subject::create([
            'subject_id' => '841114',
            'subject_name' => 'Phát triển ứng dụng trên TB di động',
            'subject_credit' => '3',
            'subject_coeffcient' => '0.75',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTPM',
        ]);
        Subject::create([
            'subject_id' => '841048',
            'subject_name' => 'Phân tích thiết kế HTTT',
            'subject_credit' => '4',
            'subject_coeffcient' => '0.8',
            'subject_LT' => '45',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'HTTT',
        ]);
    }
}
