import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import RegisterForm from 'sections/user/register_speciality/register/RegisterForm';
import SpecialityContainer from 'sections/user/register_speciality/register/SpecialityContainer';
import { useSelector } from 'react-redux';
import { dispatch } from 'store/index';
import { getRegistrationInformation } from 'store/reducers/register_specialty';

const RegisterSpeciality = () => {
  const userRegistrationPeriod = useSelector((state) => state.register_specialty.userRegistrationPeriod);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getRegistrationInformation());
    };
    fetchData();
  }, []);

  if (!userRegistrationPeriod) {
    return null;
  }
  return (
    <Box component={Container} maxWidth="lg" sx={{ p: 3, pt: 0, mt: 2 }}>
      <Stack spacing={2}>
        <SpecialityContainer></SpecialityContainer>
        <RegisterForm></RegisterForm>
      </Stack>
    </Box>
  );
};

export default RegisterSpeciality;
