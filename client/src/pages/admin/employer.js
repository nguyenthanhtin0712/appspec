import React from 'react';
import { setStudentDialog } from 'store/reducers/employerSlice';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EmployerTable from 'sections/admin/employer/EmployerTable';
import StudentDialog from 'sections/admin/employer/EmployerDialog';
import { dispatch } from 'store/index';

const EmployerPage = () => {
  const handleClickOpen = () => {
    dispatch(setStudentDialog({ open: true, action: 'add' }));
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap">
        <Typography variant="h4">Quản lý tuyển dụng</Typography>
        <Button variant="contained" onClick={handleClickOpen} startIcon={<Add />}>
          Thêm tuyển dụng
        </Button>
      </Stack>
      <StudentDialog />
      <EmployerTable />
    </>
  );
};

export default EmployerPage;
