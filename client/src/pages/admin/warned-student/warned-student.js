import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Add } from 'iconsax-react';
import { dispatch } from 'store';
import { setWarnedStudentDialog } from 'store/reducers/warnedStudentSlice';
import WarnedStudentDialog from 'sections/admin/warned-student/WarnedStudentDialog';
import WarnedStudentTable from 'sections/admin/warned-student/WarnedStudentTable';
import WarnedStudentDeleteDialog from 'sections/admin/warned-student/WarnedStudentDeleteDialog';

const WarnedStudent = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap">
        <Typography variant="h4">Quản lý sinh viên bị cảnh cáo & buộc thôi học</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => dispatch(setWarnedStudentDialog({ open: true }))}>
          Thêm đợt xét
        </Button>
      </Stack>

      <WarnedStudentTable />
      <WarnedStudentDeleteDialog />
      <WarnedStudentDialog />
    </>
  );
};

export default WarnedStudent;
