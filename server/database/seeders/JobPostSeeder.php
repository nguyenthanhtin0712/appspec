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
            'job_post_desc' => "Viettel đang mở rộng đội ngũ với 500 bạn intern mảng web, trí tuệ nhân tạo (AI), và đám mây (cloud). Bạn sẽ có cơ hội làm việc trong môi trường đào tạo chuyên nghiệp và tham gia vào các dự án đa dạng của chúng tôi. Hãy gia nhập chúng tôi và trở thành một phần của sứ mệnh phát triển công nghệ tại Viettel.",
            'job_post_confirm' => 1,
            'user_id' => 1,
            'job_post_isDelete' => 0
        ]);

        JobPost::create([
            'job_post_id' => 2,
            'job_post_title' => "Cơ hội việc làm tại Google",
            'job_post_desc' => "Google, một trong những công ty công nghệ hàng đầu thế giới, đang tìm kiếm các chuyên gia IT và lập trình viên tài năng. Nếu bạn có niềm đam mê với công nghệ và muốn tham gia vào những dự án đổi mới, hãy đến với chúng tôi. Tại Google, chúng tôi cam kết tạo ra môi trường làm việc động lực và sáng tạo.",
            'job_post_confirm' => 1,
            'user_id' => 1,
            'job_post_isDelete' => 0
        ]);

        JobPost::create([
            'job_post_id' => 3,
            'job_post_title' => "Tuyển dụng Developer tại Facebook",
            'job_post_desc' => "Facebook, một trong những mạng xã hội lớn nhất thế giới, đang tìm kiếm các lập trình viên xuất sắc để tham gia vào dự án mới. Nếu bạn có khả năng sáng tạo và muốn đóng góp vào sự phát triển của công nghệ, hãy xem xét cơ hội làm việc tại Facebook. Chúng tôi chào đón những tài năng mới có đam mê và ý tưởng mới.",
            'job_post_confirm' => 1,
            'user_id' => 1,
            'job_post_isDelete' => 0
        ]);

        JobPost::create([
            'job_post_id' => 4,
            'job_post_title' => "Cơ hội làm việc tại Microsoft",
            'job_post_desc' => "Microsoft đang mở cửa cơ hội cho những chuyên gia có kinh nghiệm trong lĩnh vực phát triển phần mềm. Nếu bạn là người yêu thích sự thách thức và muốn tham gia vào những dự án lớn, hãy xem xét gia nhập đội ngũ của chúng tôi. Microsoft cam kết mang lại môi trường làm việc đa dạng và phát triển nghề nghiệp cho mọi nhân viên.",
            'job_post_confirm' => 1,
            'user_id' => 1,
            'job_post_isDelete' => 0
        ]);

        JobPost::create([
            'job_post_id' => 5,
            'job_post_title' => "Tin tuyển dụng tại Amazon",
            'job_post_desc' => "Amazon, một trong những tập đoàn thương mại điện tử lớn nhất thế giới, đang mở cửa cơ hội cho các nhà phân tích dữ liệu và chuyên gia khoa học dữ liệu. Nếu bạn có khả năng phân tích số liệu và muốn tham gia vào việc xây dựng giải pháp thương mại điện tử hàng đầu, hãy tham gia với chúng tôi tại Amazon.",
            'job_post_confirm' => 1,
            'user_id' => 1,
            'job_post_isDelete' => 0
        ]);

        JobPost::create([
            'job_post_id' => 6,
            'job_post_title' => "Việc làm lập trình viên ở Apple",
            'job_post_desc' => "Apple, nhà sản xuất công nghệ hàng đầu, đang tìm kiếm lập trình viên tài năng để tham gia vào việc phát triển ứng dụng di động mới. Nếu bạn đam mê sáng tạo và muốn thử thách bản thân trong môi trường động lực, hãy đến với Apple và hãy là một phần của nhóm phát triển đằng sau những sản phẩm nổi tiếng trên thế giới.",
            'job_post_confirm' => 1,
            'user_id' => 1,
            'job_post_isDelete' => 0
        ]);

        JobPost::create([
            'job_post_id' => 7,
            'job_post_title' => "Tin tuyển dụng tại Tesla",
            'job_post_desc' => "Tesla, một trong những công ty tiên phong trong lĩnh vực ô tô điện, đang tìm kiếm các kỹ sư ô tô và chuyên gia thiết kế để tham gia vào dự án ô tô điện. Nếu bạn có đam mê với công nghệ ô tô và muốn tham gia vào cuộc cách mạng xe điện, hãy xem xét cơ hội làm việc tại Tesla.",
            'job_post_confirm' => 1,
            'user_id' => 1,
            'job_post_isDelete' => 0
        ]);

        JobPost::create([
            'job_post_id' => 8,
            'job_post_title' => "Cơ hội việc làm tại SpaceX",
            'job_post_desc' => "SpaceX, doanh nghiệp của nhà doanh nhân Elon Musk, đang cần các kỹ sư hàng không và chuyên gia vận tải để tham gia vào sứ mệnh khám phá vũ trụ. Nếu bạn đam mê với không gian và muốn trải nghiệm công việc trong ngành công nghiệp hàng không vũ trụ đầy thách thức, hãy tham gia vào đội ngũ tại SpaceX.",
            'job_post_confirm' => 1,
            'user_id' => 1,
            'job_post_isDelete' => 0
        ]);

        // Bạn có thể tiếp tục thêm dữ liệu cho 2 công việc khác ở đây
    }
}
