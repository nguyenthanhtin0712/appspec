import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CreateReigisterInternForm from 'sections/admin/internship-graduation/register_intern_create/CreateReigisterInternForm';
import { useNavigate, useParams } from 'react-router';
import { getCompany, getInternshipGradutionInfo } from 'store/reducers/createRegisterInternSlice';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';

const RegisterIntern = () => {
  const navigate = useNavigate();
  const { Id } = useParams();
  const internshipGraduationInfo = useSelector((state) => state.create_register_intern.internshipGraduationInfo);

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getInternshipGradutionInfo(Id));
      if (res.error) {
        navigate('/');
      }
      await dispatch(getCompany(Id));
    };
    fetchData();
  }, [Id, navigate]);

  if (!internshipGraduationInfo) return null;

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
