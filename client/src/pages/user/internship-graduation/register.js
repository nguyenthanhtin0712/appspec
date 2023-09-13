import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import RegisterInternsipForm from 'sections/user/register_internship/RegisterInternshipForm';
import CompanyList from 'sections/user/register_internship/CompanyList';
import { useSelector } from 'react-redux';
import { getRegisterInternship } from 'store/reducers/registerInternUserSlice';
import { dispatch } from 'store/index';

const RegisterInternshipGraduation = () => {
  const { register_internship } = useSelector((state) => state.regsiter_intern_user);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getRegisterInternship());
    };
    fetch();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <MainCard title="Hiện trạng đăng ký" sx={{ mb: 2 }}>
        <CompanyList />
      </MainCard>
      <MainCard title="Đăng ký thực tập trong danh sách">
        <Container maxWidth="sm">
          <Typography mb={2}>Sinh viên có thể THAY ĐỔI nơi thực tập đã đăng ký khi thời gian đăng ký còn hiệu lực</Typography>
          <MainCard>
            <RegisterInternsipForm companies={register_internship} />
          </MainCard>
        </Container>
      </MainCard>
    </Container>
  );
};

export default RegisterInternshipGraduation;
