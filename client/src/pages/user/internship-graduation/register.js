import React from 'react';
import { Container, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import RegisterInternsipForm from 'sections/user/register_internship/RegisterInternshipForm';

const mockUpData = [
  {
    company_id: 1,
    company_name: 'ABC Corporation',
    company_phone: null,
    company_email: null,
    company_address: '123 Main Street',
    company_isInterview: 1,
    positions: [
      {
        position_id: 1,
        position_name: 'Full-stack Developer',
        position_quantity: 1,
        company_id: 1
      },
      {
        position_id: 2,
        position_name: 'Back-end Developer',
        position_quantity: 4,
        company_id: 1
      },
      {
        position_id: 3,
        position_name: 'Front-end Developer',
        position_quantity: 3,
        company_id: 1
      }
    ]
  },
  {
    company_id: 2,
    company_name: 'XYZ Inc.',
    company_phone: null,
    company_email: null,
    company_address: '456 Park Avenue',
    company_isInterview: 0,
    positions: [
      {
        position_id: 5,
        position_name: 'IOS Developer',
        position_quantity: 1,
        company_id: 2
      },
      {
        position_id: 5,
        position_name: 'IOS Developer',
        position_quantity: 2,
        company_id: 2
      },
      {
        position_id: 6,
        position_name: 'Producct, UX/UI Designer',
        position_quantity: 9,
        company_id: 2
      }
    ]
  }
];

const RegisterInternshipGraduation = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <MainCard title="Hiện trạng đăng ký" sx={{ mb: 2 }}>
        Hiển thị hiện trạng đăng ký
      </MainCard>
      <MainCard title="Đăng ký thực tập trong danh sách">
        <Container maxWidth="sm">
          <Typography mb={2}>Sinh viên có thể THAY ĐỔI nơi thực tập đã đăng ký khi thời gian đăng ký còn hiệu lực</Typography>
          <MainCard>
            <RegisterInternsipForm companies={mockUpData} />
          </MainCard>
        </Container>
      </MainCard>
    </Container>
  );
};

export default RegisterInternshipGraduation;
