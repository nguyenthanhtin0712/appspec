/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import { Link } from 'react-router-dom';
import { dispatch } from 'store';
import { openUserDrawer } from 'store/slices/menu';

const NavItemMobile = ({ item }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleCloseDrawer = () => {
    dispatch(openUserDrawer(false));
  };

  return (
    <List key={item.name} disablePadding>
      <ListItemButton>
        <ListItemText>
          <Link to={item.url} onClick={handleCloseDrawer} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            {item.name}
          </Link>
        </ListItemText>
        {item.children && (open ? <ArrowUp2 onClick={(e) => handleClick(e)} /> : <ArrowDown2 onClick={(e) => handleClick(e)} />)}
      </ListItemButton>
      {item.children && item.children.length > 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((subitem) => (
              <ListItemButton onClick={handleCloseDrawer} component={Link} to={subitem.url} key={subitem.name} sx={{ pl: 4 }}>
                <ListItemText primary={subitem.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </List>
  );
};

export default NavItemMobile;
