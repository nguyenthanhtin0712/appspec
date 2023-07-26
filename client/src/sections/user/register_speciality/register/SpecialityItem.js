import React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const SpecialityItem = ({ name, total, registered_quantity }) => {
  const theme = useTheme();
  return (
    <Grid item xs={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} component={Paper} variant="outlined" p={2}>
        <Typography variant="h6">{name}</Typography>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: '#fff',
            px: 1,
            py: 0.5,
            borderRadius: 10
          }}
        >
          {registered_quantity}/{total}
        </Box>
      </Stack>
    </Grid>
  );
};

export default SpecialityItem;
