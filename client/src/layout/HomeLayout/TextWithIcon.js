import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function TextWithIcon({ icon, text }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {icon}
      <Typography fontSize="16px" fontWeight="600">
        {text}
      </Typography>
    </Stack>
  );
}

export default TextWithIcon;
