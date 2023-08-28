import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'layout/HomeLayout/Header';
import Footer from './Footer';
import Box from '@mui/material/Box';

function HomeLayout() {
  return (
    <>
      <Header />
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          paddingX: 0
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default HomeLayout;
