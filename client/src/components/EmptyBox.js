import React from 'react';
import Icon from '../assets/images/icons/ic_content.svg';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const EmptyBox = ({ message = 'Không có dữ liệu' }) => {
  return (
    <Stack alignItems="center" padding={3} spacing={2}>
      <img src={Icon} alt="Empty data" width={150} />
      <Typography variant="h5" color="text.secondary">
        {message}
      </Typography>
    </Stack>
  );
};

export default EmptyBox;
