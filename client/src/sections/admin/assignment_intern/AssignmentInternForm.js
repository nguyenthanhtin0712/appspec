import { Button, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import { Add } from 'iconsax-react';
import React from 'react';
import JobholderAssignItem from 'sections/admin/assignment_intern/JobholderAssignItem';
import JobholderItem from 'sections/admin/assignment_intern/JobholderItem';
import { setOpen } from 'store/reducers/assignmentIntenship';
import { dispatch } from 'store/index';

const AssignmentInternForm = () => {
  return (
    <MainCard title="Danh sách phân công">
      <Stack justifyContent="space-between" flexWrap="wrap" spacing={1}>
        <JobholderAssignItem name="Nguyễn Thanh Sang" total="10"></JobholderAssignItem>
        <JobholderItem name="Nguyễn Thanh Sang" total="10"></JobholderItem>
      </Stack>
      <Stack mt={2}>
        <Button
          onClick={() => {
            dispatch(setOpen(true));
          }}
          fullWidth
          variant="contained"
          startIcon={<Add />}
          size="large"
        >
          Thêm giảng viên
        </Button>
      </Stack>
    </MainCard>
  );
};

export default AssignmentInternForm;
