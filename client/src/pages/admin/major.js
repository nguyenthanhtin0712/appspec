import React from 'react';
import { setMajorDialog } from 'store/slices/majorSlice';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MajorTable from 'sections/admin/major/MajorTable';
import MajorDialog from 'sections/admin/major/MajorDialog';
import { dispatch } from 'store/index';
import MajorDeleteDialog from 'sections/admin/major/MajorDeleteDialog';
import WithPermission from 'guards/WithPermission';

const MajorPage = () => {
  const handleClickOpen = () => {
    dispatch(setMajorDialog({ open: true, action: 'add' }));
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap">
        <Typography variant="h4">Quản lý ngành</Typography>
        <WithPermission requiredPermission={['major.create']}>
          <Button variant="contained" onClick={handleClickOpen} startIcon={<Add />}>
            Thêm ngành
          </Button>
        </WithPermission>
      </Stack>
      <MajorDialog />
      <MajorTable />
      <MajorDeleteDialog />
    </>
  );
};

export default MajorPage;
