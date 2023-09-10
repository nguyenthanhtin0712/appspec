import React from 'react';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CreateReigisterInternForm from 'sections/admin/internship-graduation/register_intern_create/CreateReigisterInternForm';
import { useParams } from 'react-router';

const RegisterIntern = () => {
  const { Id } = useParams();
  console.log(Id);
  return (
    <>
      <Typography variant="h4" component="h1" mb={2}>
        Tạo đợt đăng ký thực tập
      </Typography>
      <MainCard sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CreateReigisterInternForm />
        </LocalizationProvider>
      </MainCard>
    </>
  );
};

export default RegisterIntern;
