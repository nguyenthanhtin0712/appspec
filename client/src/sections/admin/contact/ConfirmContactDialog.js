import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import DialogTitleCustom from 'components/DialogTitleCustom';
import { setOpenContact } from 'store/slices/contactSlice';
import { Link, Stack, Typography } from '@mui/material';
import InfoDisplay from 'sections/admin/contact/InfoDisplay';
import { formatDateTimeDisplay } from 'utils/formatDateTime';

const ConfirmContactDialog = () => {
  const { openContact, viewContact } = useSelector((state) => state.contact);

  const handleClose = () => {
    dispatch(setOpenContact(false));
  };

  return (
    <Dialog open={openContact} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitleCustom onClose={handleClose}>Thông tin chi tiết</DialogTitleCustom>
      <DialogContent>
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <InfoDisplay label="Họ tên" value={viewContact?.contact_fullname} />
            <InfoDisplay
              label="Email"
              value={
                <Link href={`mailto:${viewContact?.contact_email}`} underline="none">
                  {viewContact?.contact_email}
                </Link>
              }
            />
          </Stack>
          <Stack>
            <InfoDisplay label="Thời gian" value={formatDateTimeDisplay(viewContact?.created_at)} />
            <InfoDisplay
              label="Phone"
              value={
                <Link href={`tel:${viewContact?.contact_phone}`} underline="none">
                  {viewContact?.contact_phone}
                </Link>
              }
            />
          </Stack>
        </Stack>

        <Stack>
          <Typography variant="h5">Nội dung</Typography>
          <Typography>{viewContact?.contact_content}</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="success">
          Thoát
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmContactDialog;
