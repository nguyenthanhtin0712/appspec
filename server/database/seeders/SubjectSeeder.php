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
        Subject::create([
            'subject_id' => '841020',
            'subject_name' => 'Cơ sở lập trình',
            'subject_credit' => '3',
            'subject_coeffcient' => '0.75',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTMT',
        ]);
        Subject::create([
            'subject_id' => '841309',
            'subject_name' => 'Toán rời rạc',
            'subject_credit' => '3',
            'subject_coeffcient' => '1',
            'subject_LT' => '45',
            'subject_BT' => '0',
            'subject_TH' => '0',
            'academic_field_id' => 'KHMT',
        ]);
        Subject::create([
            'subject_id' => '841301',
            'subject_name' => 'Giải tích',
            'subject_credit' => '4',
            'subject_coeffcient' => '1',
            'subject_LT' => '45',
            'subject_BT' => '15',
            'subject_TH' => '0',
            'academic_field_id' => 'KHMT',
        ]);
        Subject::create([
            'subject_id' => '841021',
            'subject_name' => 'Kiến trúc máy tính',
            'subject_credit' => '3',
            'subject_coeffcient' => '0.75',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTMT',
        ]);
        Subject::create([
            'subject_id' => '841022',
            'subject_name' => 'Hệ điều hành',
            'subject_credit' => '3',
            'subject_coeffcient' => '0.75',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTMT',
        ]);
        Subject::create([
            'subject_id' => '841304',
            'subject_name' => 'Phát triển ứng dụng Web 1',
            'subject_credit' => '3',
            'subject_coeffcient' => '0.75',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTPM',
        ]);
        Subject::create([
            'subject_id' => '841108',
            'subject_name' => 'Cấu trúc dữ liệu và giải thuật',
            'subject_credit' => '4',
            'subject_coeffcient' => '0.80',
            'subject_LT' => '45',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KHMT',
        ]);
        Subject::create([
            'subject_id' => '841044',
            'subject_name' => 'Lập trình hướng đối tượng',
            'subject_credit' => '4',
            'subject_coeffcient' => '0.80',
            'subject_LT' => '45',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTPM',
        ]);
        Subject::create([
            'subject_id' => '841047',
            'subject_name' => 'Công nghệ phần mềm',
            'subject_credit' => '4',
            'subject_coeffcient' => '0.80',
            'subject_LT' => '45',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTPM',
        ]);
        Subject::create([
            'subject_id' => '841111',
            'subject_name' => 'Phân tích thiết kế HĐT',
            'subject_credit' => '4',
            'subject_coeffcient' => '0.80',
            'subject_LT' => '45',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'HTTT',
        ]);
        Subject::create([
            'subject_id' => '841110',
            'subject_name' => 'Cơ sở trí tuệ nhân tạo',
            'subject_credit' => '4',
            'subject_coeffcient' => '0.80',
            'subject_LT' => '45',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KHMT',
        ]);
        Subject::create([
            'subject_id' => '841051',
            'subject_name' => 'Thiết kế giao diện',
            'subject_credit' => '3',
            'subject_coeffcient' => '0.75',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTPM',
        ]);
        Subject::create([
            'subject_id' => '841059',
            'subject_name' => 'Quản trị mạng',
            'subject_credit' => '3',
            'subject_coeffcient' => '0.75',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTMT',
        ]);
        Subject::create([
            'subject_id' => '841065',
            'subject_name' => 'Các hệ quản trị cơ sở dữ liệu',
            'subject_credit' => '3',
            'subject_coeffcient' => '0.75',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'HTTT',
        ]);
        Subject::create([
            'subject_id' => '841052',
            'subject_name' => 'Xây dựng phần mềm theo mô hình phân lớp',
            'subject_credit' => '3',
            'subject_coeffcient' => '0.75',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTPM',
        ]);
        Subject::create([
            'subject_id' => '841307',
            'subject_name' => 'Lập trình mạng',
            'subject_credit' => '3',
            'subject_coeffcient' => '0.75',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '30',
            'academic_field_id' => 'KTMT',
        ]);
        Subject::create([
            'subject_id' => '841068',
            'subject_name' => 'Hệ thống thông tin doanh nghiệp',
            'subject_credit' => '3',
            'subject_coeffcient' => '1',
            'subject_LT' => '45',
            'subject_BT' => '0',
            'subject_TH' => '0',
            'academic_field_id' => 'HTTT',
        ]);
        Subject::create([
            'subject_id' => '841324',
            'subject_name' => 'Phương pháp NCKH',
            'subject_credit' => '3',
            'subject_coeffcient' => '1',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '0',
            'academic_field_id' => 'KTPM',
        ]);
        Subject::create([
            'subject_id' => '841071',
            'subject_name' => 'Dịch vụ web và ứng dụng',
            'subject_credit' => '3',
            'subject_coeffcient' => '1',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '15',
            'academic_field_id' => 'KTPM',
        ]);
        Subject::create([
            'subject_id' => '841072',
            'subject_name' => 'Các công nghệ lập trình hiện đại',
            'subject_credit' => '3',
            'subject_coeffcient' => '1',
            'subject_LT' => '30',
            'subject_BT' => '0',
            'subject_TH' => '15',
            'academic_field_id' => 'KTPM',
        ]);
        Subject::create([
            'subject_id' => '841073',
            'subject_name' => 'Seminar chuyên đề',
            'subject_credit' => '3',
            'subject_coeffcient' => '1',
            'subject_LT' => '60',
            'subject_BT' => '0',
            'subject_TH' => '0',
            'academic_field_id' => 'HTTT',
        ]);
        Subject::create([
            'subject_id' => '841070',
            'subject_name' => 'Thực tập tốt nghiệp',
            'subject_credit' => '6',
            'subject_coeffcient' => '1',
            'subject_LT' => '0',
            'subject_BT' => '0',
            'subject_TH' => '0',
            'academic_field_id' => 'HTTT',
        ]);
    }
}
