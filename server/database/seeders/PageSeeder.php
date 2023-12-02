<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Page::create([
            'page_slug' => 'dieu-le-dang-ky-chuyen-nganh',
            'page_title' => 'Điều lệ đăng ký chuyên ngành',
            'page_content' => '**(Trích nội dung trong quyết định của BCN khoa về việc phân chuyên ngành cho Khóa 21)**

            **Điều 2**
            
            Điều kiện được phân chuyên ngành: Tất cả các sinh viên khoa CNTT đang theo học Khóa 21 không bị đình chỉ hoặc không bị buộc thôi học tính đến thời điểm phân ngành
            
            **Điều 4**
            
            Số lượng sinh viên của chuyên ngành kỹ thuật phần mềm tối đa 315 em, hệ thống thông tin tối đa 70 em, kỹ thuật máy tính tối đa 70 em, khoa học máy tính tối đa là 70 sinh viên. Nếu chuyên ngành nào vượt quá số lượng tối đa cho phép, sẽ thực hiện chọn từ trên xuống theo tổng điểm trung bình chung của 3 học kỳ đầu. Sinh viên nào có nguyện vọng thay đổi chuyên ngành làm đơn gửi ban chủ nhiệm khoa sẽ xem xét.
            
            **Điều 5**
            
            *Sinh viên không lọt vào chuyên ngành đã đăng ký (như điều 4) hoặc không đăng ký chuyên ngành hoặc đăng ký chuyên ngành không thành công với bất kỳ lý do nào thì quyền quyết định chuyên ngành của sinh viên sẽ thuộc về ban chủ nhiệm khoa.*',
            'page_isDelete' => 0
        ]);
    }
}
