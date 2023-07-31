import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { HambergerMenu } from 'iconsax-react';
import LogoSection from 'components/logo/index';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import NavItem from './NavItem';
import UserInfo from './UserInfo';
import NavMobile from '../Drawer';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { openUserDrawer } from 'store/reducers/menu';
import { dispatch } from 'store/index';
import { navItems } from 'menu-items/user';

const Navbar = () => {
  const theme = useTheme();
  const drawerUserOpen = useSelector((state) => state.menu.drawerUserOpen);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleDrawerToggle = () => {
    dispatch(openUserDrawer({ drawerUserOpen: !drawerUserOpen }));
  };

  return (
    <>
      <AppBar
        component="nav"
        position="sticky"
        sx={{
          boxShadow: theme.customShadows.z2,
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
          bgcolor: '#fff'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', minHeight: 66, p: '0!important' }}>
            <IconButton
              color="#000"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <HambergerMenu />
            </IconButton>
            <LogoSection
              width={52}
              sx={{
                [theme.breakpoints.up('md')]: {
                  mr: 4
                }
              }}
            ></LogoSection>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
              {navItems.map((item) => (
                <NavItem key={item.name} item={item}></NavItem>
              ))}
            </Box>
            {isAuthenticated ? (
              <UserInfo />
            ) : (
              <Button variant="contained" component={Link} to="/auth/login">
                Đăng nhập
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <NavMobile />
    </>
  );
};

export default Navbar;
