import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

const DialogTitleCustom = ({ onClose, children, ...other }) => {
  return (
    <DialogTitle {...other}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {children}
        {onClose ? (
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </Stack>
    </DialogTitle>
  );
};

export default DialogTitleCustom;
