import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import NavItemMobile from './NavItemMobile';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { dispatch } from 'store/index';
import { openUserDrawer } from 'store/reducers/menu';
import { navItems } from 'menu-items/user';

const drawerWidth = 240;

const NavMobile = ({ window }) => {
  const container = window !== undefined ? () => window().document.body : undefined;
  const drawerUserOpen = useSelector((state) => state.menu.drawerUserOpen);
  const handleDrawerToggle = () => {
    dispatch(openUserDrawer({ drawerUserOpen: !drawerUserOpen }));
  };
  return (
    <Box component="nav">
      <Drawer
        container={container}
        variant="temporary"
        open={drawerUserOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { sm: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <List>
            {navItems.map((item) => (
              <NavItemMobile key={item.name} item={item}></NavItemMobile>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

NavMobile.propTypes = {
  window: PropTypes.object,
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func
};

export default NavMobile;
