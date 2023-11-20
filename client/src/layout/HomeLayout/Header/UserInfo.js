import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { logoutUser } from 'store/slices/authSlice';
import { useNavigate } from 'react-router';
import { Divider, MenuItem, Popover, Stack } from '@mui/material';

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
          <Avatar
            alt={currentUser?.user_firstname + ' ' + currentUser?.user_lastname}
            src={currentUser?.user_avatar}
            sx={{ width: 34, height: 34 }}
          />
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(anchorElUser)}
        anchorEl={anchorElUser}
        onClose={handleCloseUserMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 200,
            '& .MuiMenuItem-root': {
              borderRadius: 0.75
            }
          }
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography fontWeight={600} noWrap>
            {currentUser?.user_firstname + ' ' + currentUser?.user_lastname}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {currentUser?.user_email ?? 'Vui lòng bổ sung email'}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack sx={{ px: 1, py: 2 }}>
          <MenuItem
            onClick={() => {
              navigate('/profile');
              handleCloseUserMenu();
            }}
          >
            Thông tin cá nhân
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(logoutUser());
              navigate('/');
            }}
          >
            Đăng xuất
          </MenuItem>
        </Stack>
      </Popover>
    </Box>
  );
};

export default UserInfo;
