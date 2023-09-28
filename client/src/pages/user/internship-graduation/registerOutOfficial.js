import { Container, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import CompanyList from 'sections/user/register_internship/CompanyList';
import RegisterOutInternshipForm from 'sections/user/register_internship/RegisterOutInternshipForm';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import { getInternship } from 'store/reducers/registerInternUserSlice';
import { dispatch } from 'store/index';
import CountdownTimer from 'components/CountdownTimer';
import Button from '@mui/material/Button';
import { LockCircle } from 'iconsax-react';
import { Link } from 'react-router-dom';
import LoadingBox from 'components/LoadingBox';

const RegisterOutOfficial = () => {
  const theme = useTheme();
  const { internship } = useSelector((state) => state.regsiter_intern_user);
  const { register_internship_start_date, register_internship_end_date } = internship;
  const currentTime = useMemo(() => new Date(), []);

  const isBeforeRegistrationTime = useMemo(() => {
    return currentTime < new Date(register_internship_start_date);
  }, [register_internship_start_date, currentTime]);

  const isAfterRegistrationTime = useMemo(() => {
    return currentTime > new Date(register_internship_end_date);
  }, [register_internship_end_date, currentTime]);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getInternship());
    };
    fetch();
  }, []);

  if (!internship) return null;

  if (!internship) {
    return (
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Stack justifyContent="center" alignItems="center" spacing={4} minHeight={500}>
          <LockCircle size="150" color={theme.palette.warning.main} variant="Bulk" />
          <Typography variant="h4" textAlign="center">
            Bạn không được phép đăng ký thực tập
          </Typography>
          <Button variant="contained" component={Link} to="/">
            Trở về trang chủ
          </Button>
        </Stack>
      </Container>
    );
  }

  const renderForm = () => {
    return (
      <>
        <Container maxWidth="sm">
          <Typography mb={2}>Sinh viên có thể THAY ĐỔI nơi thực tập đã đăng ký khi thời gian đăng ký còn hiệu lực</Typography>
          <MainCard>
            <RegisterOutInternshipForm />
          </MainCard>
        </Container>
      </>
    );
  };

  const CountDown = () => {
    return (
      <Box
        sx={{
          py: 3
        }}
      >
        <Typography gutterBottom textAlign={'center'} fontSize={'18px'} fontWeight={'600'} textTransform={'uppercase'}>
          Chưa tới thời gian đăng ký thực tập
        </Typography>
        <CountdownTimer targetTime={new Date(register_internship_start_date).getTime()} />
      </Box>
    );
  };

  const OutOfTime = () => {
    return (
      <>
        <Typography gutterBottom>Đã hết thời gian đăng ký thực tập....</Typography>
      </>
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Stack spacing={2}>
        <MainCard title="Danh sách công ty chính thức">
          <CompanyList />
        </MainCard>
        <MainCard title="Đăng ký thực tập ngoài danh sách">
          {internship ? isAfterRegistrationTime ? <OutOfTime /> : isBeforeRegistrationTime ? <CountDown /> : renderForm() : <LoadingBox />}
        </MainCard>
      </Stack>
    </Container>
  );
};

export default RegisterOutOfficial;
