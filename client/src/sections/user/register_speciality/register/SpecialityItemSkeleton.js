import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

const SpecialityItemSkeleton = () => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} component={Paper} variant="outlined" p={2}>
        <Typography variant="h6">
          <Skeleton width={150} />
        </Typography>
        <Box
          sx={{
            color: '#fff',
            px: 1,
            py: 0.5,
            borderRadius: 10
          }}
        >
          <Skeleton variant="circular" width={25} height={25} />
        </Box>
      </Stack>
    </Grid>
  );
};

export default SpecialityItemSkeleton;
