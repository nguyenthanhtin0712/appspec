import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingBox = ({ height = 100 }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: height + 'px' }}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingBox;
