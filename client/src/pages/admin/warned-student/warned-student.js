import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Add, SearchNormal } from 'iconsax-react';
import { dispatch } from 'store';
import { setLookUpDialog, setWarnedStudentDialog } from 'store/reducers/warnedStudentSlice';
import WarnedStudentDialog from 'sections/admin/warned-student/WarnedStudentDialog';
import WarnedStudentTable from 'sections/admin/warned-student/WarnedStudentTable';
import WarnedStudentDeleteDialog from 'sections/admin/warned-student/WarnedStudentDeleteDialog';
import LookUpStudent from 'sections/admin/warned-student/LookUpStudent';

const WarnedStudent = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap">
        <Typography variant="h4">Quản lý sinh viên bị cảnh cáo & buộc thôi học</Typography>
        <Stack direction="row" gap={2}>
          <Button variant="contained" color="success" startIcon={<SearchNormal />} onClick={() => dispatch(setLookUpDialog(true))}>
            Tra cứu
          </Button>
          <Button variant="contained" startIcon={<Add />} onClick={() => dispatch(setWarnedStudentDialog({ open: true }))}>
            Thêm đợt xét
          </Button>
        </Stack>
      </Stack>

      <WarnedStudentTable />
      <WarnedStudentDeleteDialog />
      <WarnedStudentDialog />
      <LookUpStudent />
    </>
  );
};

export default WarnedStudent;
