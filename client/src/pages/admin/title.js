import React from 'react';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TitleTable from 'sections/admin/title/TitleTable';
import TitleDialog from 'sections/admin/title/TitleDialog';
import { setTitleDialog } from 'store/slices/titleSlice';
import { dispatch } from 'store/index';

const TitlePage = () => {
  const handleClickOpen = () => {
    dispatch(setTitleDialog({ open: true, action: 'add' }));
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap">
        <Typography variant="h4">Quản lý chức vụ</Typography>
        <Button variant="contained" onClick={handleClickOpen} startIcon={<Add />}>
          Thêm chức vụ
        </Button>
      </Stack>
      <TitleTable />
      <TitleDialog />
    </>
  );
};

export default TitlePage;
