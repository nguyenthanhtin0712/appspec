import React from 'react';
import { setSpecialtyDialog } from '../../store/reducers/specialty';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StudentTable from 'sections/admin/student/StudentTable';
import StudentDialog from 'sections/admin/student/StudentDialog';
import { dispatch } from 'store/index';

const SpecialtyPage = () => {
  const handleClickOpen = () => {
    dispatch(setSpecialtyDialog({ open: true, action: 'add' }));
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
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

export default SpecialtyPage;
