import { Button, Stack, Typography } from '@mui/material';
import { Edit } from 'iconsax-react';
import ContactTable from 'sections/admin/contact/ContactTable';
import { setContactDialog } from 'store/reducers/contactSlice';
import { dispatch } from 'store/index';
import ContactDialog from 'sections/admin/contact/ContactDialog';

const contact = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap">
        <Typography variant="h4">Quản lý liên hệ</Typography>
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={() => {
            dispatch(setContactDialog({ open: true }));
          }}
        >
          Sửa TTLH
        </Button>
      </Stack>
      <ContactTable />
      <ContactDialog />
    </>
  );
};

export default contact;
