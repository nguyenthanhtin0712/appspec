/* eslint-disable react/prop-types */
import React from 'react';
import { Button, MenuItem } from '@mui/material/index';
// import { ArrowDown2 } from 'iconsax-react';
import { Link, NavLink } from 'react-router-dom';
import styled from '@mui/system/styled';
import PopupState, { bindHover, bindMenu } from 'material-ui-popup-state';
import HoverMenu from 'material-ui-popup-state/HoverMenu';

const ButtonItem = styled(Button)(() => ({
  color: '#000',
  fontSize: 15.5,
  minHeight: '66px',
  borderRadius: 0,
  paddingLeft: '10px',
  paddingRight: '10px',
  '&.active': {
    // borderBottom: '4px solid',
    // borderColor: theme.palette.primary.main
  },
  '&::after': {
    boxShadow: 'none'
  }
}));

const paperProps = (position = 'top') => {
  return {
    elevation: 0,
    sx: {
      minWidth: 200,
      overflow: 'visible',
      marginLeft: position == 'left' ? '10px' : 0,
      boxShadow: '0px 8px 24px rgba(19, 25, 32, 0.2)',
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        left: position == 'left' ? -3 : 14,
        top: position == 'left' ? 14 : 0,
        width: 10,
        height: 10,
        bgcolor: 'background.paper',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0
      },
      '&:after':
        position == 'left'
          ? {
              content: '""',
              display: 'block',
              position: 'absolute',
              left: -10,
              top: 0,
              width: '10px',
              height: '100%',
              zIndex: 0
            }
          : null
    }
  };
};

const NavItem = ({ item }) => {
  if (item.children == null)
    return (
      <ButtonItem component={NavLink} to={item.url} key={item.name} disableRipple disableElevation>
        {item.name}
      </ButtonItem>
    );
  return (
    <PopupState variant="popover" popupId="demoMenu">
      {(popupState) => (
        <React.Fragment>
          <ButtonItem {...bindHover(popupState)} component={NavLink} to={item.url} onClick={popupState.close}>
            {item.name}
          </ButtonItem>
          <HoverMenu
            {...bindMenu(popupState)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            PaperProps={paperProps('top')}
          >
            {item.children.map((subitem) =>
              subitem.children ? (
                <SubMenu popupState={popupState} subMenuItems={subitem.children} subMenuName={subitem.name} key={subitem.name} />
              ) : (
                <MenuItem
                  component={subitem.children ? undefined : Link}
                  to={subitem.children ? undefined : subitem.url}
                  key={subitem.name}
                  onClick={popupState.close}
                >
                  {subitem.name}
                </MenuItem>
              )
            )}
          </HoverMenu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

const SubMenu = ({ popupState, subMenuItems, subMenuName }) => (
  <PopupState variant="popover" popupId="subMenu">
    {(subPopupState) => (
      <React.Fragment>
        <MenuItem
          {...bindHover(subPopupState)}
          onClick={() => {
            popupState.close();
            subPopupState.open();
          }}
        >
          {subMenuName}
        </MenuItem>
        <HoverMenu
          {...bindMenu(subPopupState)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={paperProps('left')}
        >
          {subMenuItems.map((subMenuItem) => (
            <MenuItem component={Link} to={subMenuItem.url} key={subMenuItem.name} onClick={subPopupState.close}>
              {subMenuItem.name}
            </MenuItem>
          ))}
        </HoverMenu>
      </React.Fragment>
    )}
  </PopupState>
);

export default NavItem;
