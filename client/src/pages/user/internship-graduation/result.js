import { Container, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import CompanyList from 'sections/user/register_internship/CompanyList';
import ResultInternshipTable from 'sections/user/register_internship/ResultInternshipTable';

const result = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Stack spacing={2}>
        <MainCard title="Danh sách công ty" sx={{ mb: 2 }}>
          <CompanyList />
        </MainCard>
        <MainCard title="Kết quả đăng ký thực tập">
          <ResultInternshipTable />
        </MainCard>
      </Stack>
    </Container>
  );
};

export default result;
