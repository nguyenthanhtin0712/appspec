import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Add } from 'iconsax-react';
import { dispatch } from 'store';
import { setSubjectScheduleDialog } from 'store/reducers/subjectScheduleSlice';
import SubjectScheduleDialog from 'sections/admin/subject-schedule/SubjectScheduleDialog';

const SubjectSchedule = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap">
        <Typography variant="h4">Quản lý kế hoạch mở học phần</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => dispatch(setSubjectScheduleDialog({ open: true }))}>
          Thêm kế hoạch
        </Button>
      </Stack>
      <SubjectScheduleDialog />
    </>
  );
};

export default SubjectSchedule;