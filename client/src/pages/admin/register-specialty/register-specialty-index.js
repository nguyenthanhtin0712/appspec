import React from 'react';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import RegisterSpecialtyTable from 'sections/admin/register_specialty/RegisterSpecialtyTable';
import WithPermission from 'guards/WithPermission';

const RegisterSpecialtyIndex = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap">
        <Typography variant="h4">Quản lý đợt đăng ký chuyên ngành</Typography>
        <WithPermission requiredPermission={['register_spec.create']}>
          <Button variant="contained" component={Link} to="./create" startIcon={<Add />}>
            Tạo đợt đăng ký
          </Button>
        </WithPermission>
      </Stack>
      <RegisterSpecialtyTable />
    </>
  );
};

export default RegisterSpecialtyIndex;
