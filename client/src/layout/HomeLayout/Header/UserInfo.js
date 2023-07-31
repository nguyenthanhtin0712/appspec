import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { logoutUser } from 'store/reducers/authSlice';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const UserInfo = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src={currentUser?.user_avatar} sx={{ width: 34, height: 34 }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem>
          <Typography textAlign="center">Thông tin cá nhân</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logoutUser());
            navigate('/');
            toast.success('Đăng xuất thành công !');
          }}
        >
          <Typography textAlign="center">Đăng xuất</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserInfo;
