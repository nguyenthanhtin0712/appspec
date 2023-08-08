import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import RegisterForm from 'sections/user/register_speciality/register/RegisterForm';
import SpecialityContainer from 'sections/user/register_speciality/register/SpecialityContainer';
import { useSelector } from 'react-redux';
import { dispatch } from 'store/index';
import { getSpecialtiesForRegister } from 'store/reducers/registerSpecialtyUserSlice';
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
      console.log(result);
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <Box component={Container} maxWidth="lg" sx={{ p: 3, pt: 0, mt: 2 }}>
        <Stack justifyContent="center" alignItems="center" spacing={4} minHeight={500}>
          <LockCircle size="150" color={theme.palette.warning.main} variant="Bulk" />
          <Typography variant="h4" textAlign="center">
            Bạn không được phép đăng ký chuyên ngành
          </Typography>
          <Button variant="contained" component={Link} to="/">
            Trở về trang chủ
          </Button>
        </Stack>
      </Box>
    );
  }

  if (!registrationPageInfo) return null;

  return (
    <Box component={Container} maxWidth="lg" sx={{ p: 3, pt: 0, mt: 2 }}>
      <Stack spacing={2}>
        <MainCard title="Hiện trạng đăng ký">
          <SpecialityContainer></SpecialityContainer>
        </MainCard>
        <RegisterForm></RegisterForm>
      </Stack>
    </Box>
  );
};

export default RegisterSpeciality;
