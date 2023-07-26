/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import { NavLink, Link } from 'react-router-dom';

const NavItemMobile = ({ item }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List key={item.name} disablePadding>
      <ListItemButton
        onClick={!item.url ? handleClick : undefined}
        component={!item.url ? undefined : Link}
        to={!item.url ? undefined : item.url}
      >
        <ListItemText primary={item.name} />
        {item.children && (open ? <ArrowUp2 onClick={handleClick} /> : <ArrowDown2 onClick={handleClick} />)}
      </ListItemButton>
      {item.children && item.children.length > 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((subitem) => (
              <ListItemButton component={NavLink} to={subitem.url} key={subitem.name} sx={{ pl: 4 }}>
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
