import React from 'react';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { setSubjectDialog } from 'store/slices/subjectSlice';
import { dispatch } from 'store/index';
import SubjectTable from 'sections/admin/subject/SubjectTable';
import SubjectDialog from 'sections/admin/subject/SubjectDialog';
import SubjectDeleteDialog from 'sections/admin/subject/SubjectDeleteDialog';
import WithPermission from 'guards/WithPermission';

const SubjectPage = () => {
  const handleClickOpen = () => {
    dispatch(setSubjectDialog({ open: true, action: 'add' }));
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap">
        <Typography variant="h4">Quản lý học phần</Typography>
        <WithPermission requiredPermission={['subject.create']}>
          <Button variant="contained" onClick={handleClickOpen} startIcon={<Add />}>
            Thêm học phần
          </Button>
        </WithPermission>
      </Stack>
      <SubjectDialog />
      <SubjectTable />
      <SubjectDeleteDialog />
    </>
  );
};

export default SubjectPage;
