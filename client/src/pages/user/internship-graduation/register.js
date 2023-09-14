import React, { useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import RegisterInternsipForm from 'sections/user/register_internship/RegisterInternshipForm';
import CompanyList from 'sections/user/register_internship/CompanyList';
import { useSelector } from 'react-redux';
import { getRegisterInternship, fetchData } from 'store/reducers/registerInternUserSlice';
import { dispatch } from 'store/index';
import CountdownTimer from 'components/CountdownTimer';

const RegisterInternshipGraduation = () => {
  const { register_internship, internship } = useSelector((state) => state.regsiter_intern_user);
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
      await dispatch(getRegisterInternship());
      await dispatch(fetchData());
    };
    fetch();
  }, []);

  if (!internship) return null;

  const renderForm = () => {
    return (
      <>
        <Container maxWidth="sm">
          <Typography mb={2}>Sinh viên có thể THAY ĐỔI nơi thực tập đã đăng ký khi thời gian đăng ký còn hiệu lực</Typography>
          <MainCard>
            <RegisterInternsipForm companies={register_internship} />
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
          Chưa tới thời gian đăng ký chuyên ngành
        </Typography>
        <CountdownTimer targetTime={new Date(register_internship_start_date).getTime()} />
      </Box>
    );
  };

  const OutOfTime = () => {
    return (
      <>
        <Typography gutterBottom>Đã hết thời gian đăng ký chuyên ngành....</Typography>
      </>
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <MainCard title="Hiện trạng đăng ký" sx={{ mb: 2 }}>
        <CompanyList />
      </MainCard>
      <MainCard title="Đăng ký thực tập trong danh sách">
        {isAfterRegistrationTime ? <OutOfTime /> : isBeforeRegistrationTime ? <CountDown /> : renderForm()}
      </MainCard>
    </Container>
  );
};

export default RegisterInternshipGraduation;
