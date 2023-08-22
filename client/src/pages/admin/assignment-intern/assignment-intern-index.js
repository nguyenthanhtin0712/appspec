import React from 'react';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import AssignmentInternTable from 'sections/admin/assignment_intern/AssignmentInternTable';

const RegisterSpecialtyIndex = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap">
        <Typography variant="h4">Quản lý phân công thực tập</Typography>
        <Button variant="contained" component={Link} to="./create" startIcon={<Add />}>
          Tạo đợt đăng ký
        </Button>
      </Stack>
      <AssignmentInternTable />
    </>
  );
};

export default RegisterSpecialtyIndex;
