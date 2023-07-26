import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import { CloseCircle } from 'iconsax-react';

const DialogTitleCustom = ({ onClose, children, ...other }) => {
  return (
    <DialogTitle {...other}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseCircle variant="Bulk" size="40" />
          </IconButton>
        ) : null}
      </Stack>
    </DialogTitle>
  );
};

export default DialogTitleCustom;
