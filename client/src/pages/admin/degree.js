import React from 'react';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DegreeTable from 'sections/admin/degree/DegreeTable';
import DegreeDialog from 'sections/admin/degree/DegreeDialog';
import { setDegreeDialog } from 'store/reducers/degreeSlice';
import { dispatch } from 'store/index';

const DegreePage = () => {
  const handleClickOpen = () => {
    dispatch(setDegreeDialog({ open: true, action: 'add' }));
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap">
        <Typography variant="h4">Quản lý học vị</Typography>
        <Button variant="contained" onClick={handleClickOpen} startIcon={<Add />}>
          Thêm học vị
        </Button>
      </Stack>
      <DegreeTable />
      <DegreeDialog />
    </>
  );
};

export default DegreePage;
