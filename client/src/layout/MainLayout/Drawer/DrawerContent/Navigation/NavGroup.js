import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { Box, List, Typography, useMediaQuery } from '@mui/material';
import NavItem from './NavItem';
import { dispatch, useSelector } from 'store';
import { activeID } from 'store/slices/menu';

const NavGroup = ({ item, lastItem, remItems, lastItemId }) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const drawerAdminOpen = useSelector((state) => state.menu.drawerAdminOpen);
  const permissions = useSelector((state) => state.auth.permissions);
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentItem, setCurrentItem] = useState(item);
  const openMini = Boolean(anchorEl);

  useEffect(() => {
    if (lastItem) {
      if (item.id === lastItemId) {
        const localItem = { ...item };
        const elements = remItems.map((ele) => ele.elements);
        localItem.children = elements.flat(1);
        setCurrentItem(localItem);
      } else {
        setCurrentItem(item);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, lastItem, downLG]);

  const checkOpenForParent = (child, id) => {
    child.forEach((ele) => {
      if (ele.children?.length) {
        checkOpenForParent(ele.children, currentItem.id);
      }
      if (ele.url === pathname) {
        dispatch(activeID(id));
      }
    });
  };

  const checkSelectedOnload = (data) => {
    const childrens = data.children ? data.children : [];
    childrens.forEach((itemCheck) => {
      if (itemCheck.children?.length) {
        checkOpenForParent(itemCheck.children, currentItem.id);
      }
      if (itemCheck.url === pathname) {
        dispatch(activeID(currentItem.id));
      }
    });
  };

  useEffect(() => {
    checkSelectedOnload(currentItem);
    if (openMini) setAnchorEl(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentItem]);

  const newListItem = item.children.filter((menuItem) => {
    // menuItem.permission.length == 0 ||
    return menuItem.permission.some((permission) => permissions.includes(permission));
  });

  if (newListItem.length == 0) return null;

  const navCollapse = newListItem.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Pro Version
          </Typography>
        );
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title &&
          drawerAdminOpen && (
            <Box sx={{ pl: 3, mb: 1.5 }}>
              <Typography variant="h5" color="secondary.dark" sx={{ textTransform: 'uppercase', fontSize: '0.688rem' }}>
                {item.title}
              </Typography>
              {item.caption && (
                <Typography variant="caption" color="secondary">
                  {item.caption}
                </Typography>
              )}
            </Box>
          )
        }
        sx={{ mt: drawerAdminOpen && item.title ? 1.5 : 0, py: 0, zIndex: 0 }}
      >
        {navCollapse}
      </List>
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
  lastItem: PropTypes.bool,
  remItems: PropTypes.array,
  lastItemId: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
  caption: PropTypes.string
};

export default NavGroup;
