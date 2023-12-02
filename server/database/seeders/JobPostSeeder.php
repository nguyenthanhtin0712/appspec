<?php

namespace Database\Seeders;

use App\Models\JobPost;
use Illuminate\Database\Seeder;

class JobPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        JobPost::create([
            'job_post_id' => 1,
            'job_post_title' => "Tin tuyển dụng của Viettel",
            'job_post_desc' => "Tuyển dụng Viettel cần 500 bạn intern mảng web, ai, cloud...",
            'job_post_confirm' => 1,
            'user_id' => 1,
            'job_post_isDelete' => 0
        ]);

        JobPost::create([
            'job_post_id' => 2,
            'job_post_title' => "Cơ hội việc làm tại Google",
            'job_post_desc' => "Google đang tuyển dụng các chuyên gia IT và lập trình viên tài năng...",
            'job_post_confirm' => 1,
            'user_id' => 1,
            'job_post_isDelete' => 0
        ]);

        JobPost::create([
            'job_post_id' => 3,
            'job_post_title' => "Tuyển dụng Developer tại Facebook",
            'job_post_desc' => "Facebook đang tìm kiếm các lập trình viên xuất sắc tham gia vào dự án mới...",
            'job_post_confirm' => 1,
            'user_id' => 1,
            'job_post_isDelete' => 0
        ]);

        JobPost::create([
            'job_post_id' => 4,
            'job_post_title' => "Cơ hội làm việc tại Microsoft",
            'job_post_desc' => "Microsoft cần những chuyên gia có kinh nghiệm trong lĩnh vực phát triển phần mềm...",
            'job_post_confirm' => 1,
            'user_id' => 1,
            'job_post_isDelete' => 0
        ]);

        JobPost::create([
            'job_post_id' => 5,
            'job_post_title' => "Tin tuyển dụng tại Amazon",
            'job_post_desc' => "Amazon đang mở cửa cơ hội cho các nhà phân tích dữ liệu và khoa học dữ liệu...",
            'job_post_confirm' => 1,
            'user_id' => 1,
            'job_post_isDelete' => 0
        ]);

        JobPost::create([
            'job_post_id' => 6,
            'job_post_title' => "Việc làm lập trình viên ở Apple",
            'job_post_desc' => "Apple cần lập trình viên tài năng để phát triển ứng dụng di động mới...",
            'job_post_confirm' => 1,
            'user_id' => 1,
            'job_post_isDelete' => 0
        ]);

        JobPost::create([
            'job_post_id' => 7,
            'job_post_title' => "Tin tuyển dụng tại Tesla",
            'job_post_desc' => "Tesla đang tìm kiếm các kỹ sư ô tô và chuyên gia thiết kế để tham gia vào dự án ô tô điện...",
            'job_post_confirm' => 1,
            'user_id' => 1,
            'job_post_isDelete' => 0
        ]);

        JobPost::create([
            'job_post_id' => 8,
            'job_post_title' => "Cơ hội việc làm tại SpaceX",
            'job_post_desc' => "SpaceX cần các kỹ sư hàng không và chuyên gia vận tải để tham gia vào sứ mệnh khám phá vũ trụ...",
            'job_post_confirm' => 1,
            'user_id' => 1,
            'job_post_isDelete' => 0
        ]);

        // Bạn có thể tiếp tục thêm dữ liệu cho 2 công việc khác ở đây
    }
}