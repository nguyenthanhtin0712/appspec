import { Container, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import CompanyList from 'sections/user/register_internship/CompanyList';
import RegisterOutInternshipForm from 'sections/user/register_internship/RegisterOutInternshipForm';

const registerOutOfficial = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Stack spacing={2}>
        <MainCard title="Danh sách công ty chính thức">
          <CompanyList />
        </MainCard>
        <MainCard title="Đăng ký thực tập ngoài danh sách">
          <Container maxWidth="sm">
            <Typography mb={2}>Sinh viên có thể THAY ĐỔI nơi thực tập đã đăng ký khi thời gian đăng ký còn hiệu lực</Typography>
            <MainCard>
              <RegisterOutInternshipForm />
            </MainCard>
          </Container>
        </MainCard>
      </Stack>
    </Container>
  );
};

export default registerOutOfficial;
