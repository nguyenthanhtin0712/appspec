import React from 'react';
import { Box } from '@mui/material';
import image403 from '../../assets/errors/access-denied.webp';

const Page403 = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'white'
      }}
    >
      <img
        style={{
          height: '100vh'
        }}
        src={image403}
        alt="logo"
      />
    </Box>
  );
};

export default Page403;
