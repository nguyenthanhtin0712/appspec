import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const JobholderAssignItem = ({ name }) => {
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} component={Paper} variant="outlined" p={2}>
        <Typography variant="h6">{name}</Typography>
      </Stack>
    </Box>
  );
};

export default JobholderAssignItem;
