import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import image404 from '../../assets/errors/404.svg';

const Page403 = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'white',
        gap: 2
      }}
    >
      <img src={image404} alt="logo" />
      <Typography variant="h1" style={{ color: 'rgb(29, 38, 48)' }}>
        No permission
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography
          variant="p"
          style={{
            color: 'rgb(91, 107, 121)',
            lineHeight: '1.57',
            fontWeight: '400',
            textAlign: 'center',
            maxWidth: '320px'
          }}
        >
          The page you are looking was moved, removed, renamed, or might never exist!
        </Typography>
        <Button component={Link} variant="contained" to="/">
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default Page403;
