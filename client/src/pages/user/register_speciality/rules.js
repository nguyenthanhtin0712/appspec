import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MainCard from 'components/MainCard';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const rules = () => {
  return (
    <Box component={Container} maxWidth="lg" sx={{ p: 3, pt: 0, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9} mx="auto">
          <MainCard>
            <Typography variant="h2" component="h1" gutterBottom>
              Điều lệ đăng ký chuyên ngành
            </Typography>
            <Typography variant="subtitle1" display="block" gutterBottom>
              (Trích nội dung trong quyết định của BCN khoa về việc phân chuyên ngành cho Khóa 21)
            </Typography>
            <Typography gutterBottom fontWeight="bold">
              Điều 2
            </Typography>
            <Typography gutterBottom>
              Điều kiện được phân chuyên ngành: Tất cả các sinh viên khoa CNTT đang theo học Khóa 21 không bị đình chỉ hoặc không bị buộc
              thôi học tính đến thời điểm phân ngành.
            </Typography>
            <Typography gutterBottom fontWeight="bold">
              Điều 4
            </Typography>
            <Typography gutterBottom>
              Số lượng sinh viên của chuyên ngành kỹ thuật phần mềm tối đa 315 em, hệ thống thông tin tối đa 70 em, kỹ thuật máy tính tối đa
              70 em, khoa học máy tính tối đa là 70 sinh viên. Nếu chuyên ngành nào vượt quá số lượng tối đa cho phép, sẽ thực hiện chọn từ
              trên xuống theo tổng điểm trung bình chung của 3 học kỳ đầu. Sinh viên nào có nguyện vọng thay đổi chuyên ngành làm đơn gửi
              ban chủ nhiệm khoa sẽ xem xét.
            </Typography>
            <Typography gutterBottom fontWeight="bold">
              Điều 5
            </Typography>
            <Typography gutterBottom>
              Sinh viên không lọt vào chuyên ngành đã đăng ký (như điều 4) hoặc không đăng ký chuyên ngành hoặc đăng ký chuyên ngành không
              thành công với bất kỳ lý do nào thì quyền quyết định chuyên ngành của sinh viên sẽ thuộc về ban chủ nhiệm khoa.
            </Typography>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default rules;
