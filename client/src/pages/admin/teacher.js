import React from 'react';
import { setTeacherDialog } from 'store/reducers/teacherSlice';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TeacherTable from 'sections/admin/teacher/TeacherTable';
import TeacherDialog from 'sections/admin/teacher/TeacherDialog';
import { dispatch } from 'store/index';

const TeacherPage = () => {
  const handleClickOpen = () => {
    dispatch(setTeacherDialog({ open: true, action: 'add' }));
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap">
        <Typography variant="h4">Quản lý giảng viên</Typography>
        <Button variant="contained" onClick={handleClickOpen} startIcon={<Add />}>
          Thêm giảng viên
        </Button>
      </Stack>
      <TeacherDialog />
      <TeacherTable />
    </>
  );
};

export default TeacherPage;
