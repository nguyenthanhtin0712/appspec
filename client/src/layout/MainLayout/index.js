import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';
// import navigation from 'menu-items/admin';
import { dispatch, useSelector } from 'store';
import { openAdminDrawer } from 'store/slices/menu';
import { DRAWER_WIDTH } from 'config';
import ScrollTop from 'components/ScrollTop';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
  const { drawerAdminOpen } = useSelector((state) => state.menu);

  // drawer toggler
  const [open, setOpen] = useState(drawerAdminOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openAdminDrawer({ drawerAdminOpen: !open }));
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openAdminDrawer({ drawerAdminOpen: !matchDownLG }));
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerAdminOpen) setOpen(drawerAdminOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerAdminOpen]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />

      <Box component="main" sx={{ width: `calc(100% - ${DRAWER_WIDTH}px)`, flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar sx={{ mt: 'inherit' }} />
        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            minHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column',
            paddingX: 0
          }}
        >
          <ScrollTop />
          <Outlet />
          <Footer />
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
