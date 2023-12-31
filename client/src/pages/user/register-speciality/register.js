import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import RegisterForm from 'sections/user/register_speciality/register/RegisterForm';
import SpecialityContainer from 'sections/user/register_speciality/register/SpecialityContainer';
import { useSelector } from 'react-redux';
import { dispatch } from 'store/index';
import { getSpecialtiesForRegister } from 'store/slices/registerSpecialtyUserSlice';
import MainCard from 'components/MainCard';
import { LockCircle } from 'iconsax-react';
import { Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const RegisterSpeciality = () => {
  const theme = useTheme();
  const registrationPageInfo = useSelector((state) => state.register_specialty_user.registrationPageInfo);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getSpecialtiesForRegister());
      if (result.error) setError(true);
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Stack justifyContent="center" alignItems="center" spacing={4} minHeight={500}>
          <LockCircle size="150" color={theme.palette.warning.main} variant="Bulk" />
          <Typography variant="h4" textAlign="center">
            Bạn không được phép đăng ký chuyên ngành
          </Typography>
          <Button variant="contained" component={Link} to="/">
            Trở về trang chủ
          </Button>
        </Stack>
      </Container>
    );
  }

  if (!registrationPageInfo) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Stack spacing={2}>
        <MainCard title="Hiện trạng đăng ký">
          <SpecialityContainer />
        </MainCard>
        <RegisterForm />
      </Stack>
    </Container>
  );
};

export default RegisterSpeciality;
