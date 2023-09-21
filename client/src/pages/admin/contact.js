import { Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import ContactTable from 'sections/admin/contact/ContactTable';

const contact = () => {
  return (
    <MainCard>
      <Typography variant="h4" mb={3}>
        Liên hệ
      </Typography>
      <Stack spacing={3}>
        <ContactTable />
      </Stack>
    </MainCard>
  );
};

export default contact;
