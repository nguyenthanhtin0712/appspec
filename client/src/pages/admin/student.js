import React from 'react';
import { setStudentDialog } from 'store/reducers/studentSlice';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StudentTable from 'sections/admin/student/StudentTable';
import StudentDialog from 'sections/admin/student/StudentDialog';
import { dispatch } from 'store/index';

const StudentPage = () => {
  const handleClickOpen = () => {
    dispatch(setStudentDialog({ open: true, action: 'add' }));
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap">
        <Typography variant="h4">Quản lý sinh viên</Typography>
        <Button variant="contained" onClick={handleClickOpen} startIcon={<Add />}>
          Thêm sinh viên
        </Button>
      </Stack>
      <StudentDialog />
      <StudentTable />
    </>
  );
};

export default StudentPage;
