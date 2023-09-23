import { Stack, Typography } from '@mui/material';
import ContactTable from 'sections/admin/contact/ContactTable';

const contact = () => {
  return (
    <>
      <Typography variant="h4" mb={3}>
        Quản lý liên hệ
      </Typography>
      <Stack spacing={3}>
        <ContactTable />
      </Stack>
    </>
  );
};

export default contact;
