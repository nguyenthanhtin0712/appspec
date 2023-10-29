import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'layout/HomeLayout/Header';
import Footer from './Footer';
import Box from '@mui/material/Box';
import ScrollTop from 'components/ScrollTop';

function HomeLayout() {
  return (
    <>
      <Header />
      <Box
        sx={{
          position: 'relative',
          minHeight: 'calc(100vh - 200px)',
          display: 'flex',
          flexDirection: 'column',
          paddingX: 0
        }}
        mb={4}
      >
        <ScrollTop />
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default HomeLayout;
