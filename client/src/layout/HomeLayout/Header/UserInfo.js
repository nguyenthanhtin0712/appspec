import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { logoutUser } from 'store/reducers/authSlice';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Divider, Popover, Stack } from '@mui/material';

const MENU_OPTIONS = [
  {
    label: 'Home'
    // icon: 'eva:home-fill'
  },
  {
    label: 'Profile'
    // icon: 'eva:person-fill'
  },
  {
    label: 'Settings'
    // icon: 'eva:settings-2-fill'
  }
];

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
            width: 180,
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
        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleCloseUserMenu}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem
          onClick={() => {
            dispatch(logoutUser());
            navigate('/');
            toast.success('Đăng xuất thành công !');
          }}
          sx={{ m: 1 }}
        >
          Đăng xuất
        </MenuItem>
      </Popover>
    </Box>
  );
};

export default UserInfo;
