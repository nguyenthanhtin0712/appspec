import React from 'react';
import { setJobholderDialog } from 'store/reducers/jobholderSlice';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import JobholderTable from 'sections/admin/jobholder/JobholderTable';
import JobholderDialog from 'sections/admin/jobholder/JobholderDialog';
import { dispatch } from 'store/index';

const JobholderPage = () => {
  const handleClickOpen = () => {
    dispatch(setJobholderDialog({ open: true, action: 'add' }));
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap">
        <Typography variant="h4">Quản lý viên chức</Typography>
        <Button variant="contained" onClick={handleClickOpen} startIcon={<Add />}>
          Thêm viên chức
        </Button>
      </Stack>
      <JobholderDialog />
      <JobholderTable />
    </>
  );
};

export default JobholderPage;
