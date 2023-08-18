import React from 'react';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CompanyTable from 'sections/admin/company/CompanyTable';
import CompanyDialog from 'sections/admin/company/CompanyDialog';
import { setcompanyDialog } from 'store/reducers/companySlice';
import { dispatch } from 'store/index';

const CompanyPage = () => {
  const handleClickOpen = () => {
    dispatch(setcompanyDialog({ open: true, action: 'add' }));
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap">
        <Typography variant="h4">Quản lý công ty</Typography>
        <Button variant="contained" onClick={handleClickOpen} startIcon={<Add />}>
          Thêm công ty
        </Button>
      </Stack>
      <CompanyTable />
      <CompanyDialog />
    </>
  );
};

export default CompanyPage;
