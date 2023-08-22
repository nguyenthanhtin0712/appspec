import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitleCustom from 'components/DialogTitleCustom';

export default function SelectCompanyDialog({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitleCustom onClose={handleClose}>Chọn công ty</DialogTitleCustom>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Hủy
        </Button>
        <Button onClick={handleClose} autoFocus variant="contained">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
