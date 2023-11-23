import React from 'react';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import PageTable from 'sections/admin/page/PageTable';
import PageDeleteDialog from 'sections/admin/page/PageDeleteDialog';
import WithPermission from 'guards/WithPermission';

const PageIndex = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Quản lý các trang</Typography>
        <WithPermission requiredPermission={['page.create']}>
          <Button variant="contained" component={Link} to="./create" startIcon={<Add />}>
            Tạo trang
          </Button>
        </WithPermission>
      </Stack>
      <PageTable />
      <PageDeleteDialog />
    </>
  );
};

export default PageIndex;
