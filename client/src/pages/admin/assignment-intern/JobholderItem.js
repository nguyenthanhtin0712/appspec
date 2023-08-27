import React from 'react';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const JobholderItem = ({ name, total, mb }) => {
  const theme = useTheme();
  return (
    <Box mb={mb}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} component={Paper} variant="outlined" p={2}>
        <Typography variant="h6">{name}</Typography>
        <Box
          sx={{
            backgroundColor: theme.palette.success.main,
            color: '#fff',
            px: 1,
            py: 0.5,
            borderRadius: 10
          }}
        >
          {total}
        </Box>
      </Stack>
    </Box>
  );
};

export default JobholderItem;
