import { Button, Stack, Typography } from '@mui/material';
import { Edit } from 'iconsax-react';
import ContactTable from 'sections/admin/contact/ContactTable';

const contact = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap">
        <Typography variant="h4">Quản lý liên hệ</Typography>
        <Button variant="contained" startIcon={<Edit />}>
          Sửa TTLH
        </Button>
      </Stack>
      <Stack spacing={3}>
        <ContactTable />
      </Stack>
    </>
  );
};

export default contact;
