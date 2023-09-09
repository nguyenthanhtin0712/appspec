import React from 'react';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import RegisterInternTable from 'sections/admin/register_intern/RegisterInternTable';

const RegisterInternIndex = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap">
        <Typography variant="h4">Quản lý đợt đăng ký thực tập</Typography>
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="success" component={Link} to="/" startIcon={<Add />}>
            Thêm đợt thực tập
          </Button>
          <Button variant="contained" component={Link} to="./create" startIcon={<Add />}>
            Tạo đợt đăng ký
          </Button>
        </Stack>
      </Stack>
      <RegisterInternTable />
    </>
  );
};

export default RegisterInternIndex;
