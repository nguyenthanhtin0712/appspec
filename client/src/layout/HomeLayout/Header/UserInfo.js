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
import { Button, Divider, List, ListItemButton, ListItemIcon, ListItemText, Popover, Stack } from '@mui/material';
import { Logout, Profile } from 'iconsax-react';

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
            p: 2,
            mt: 1.5,
            ml: 0.75,
            width: 250,
            '& .MuiMenuItem-root': {
              borderRadius: 0.75
            }
          }
        }}
      >
        <Stack direction="row" spacing={1} sx={{ my: 1.5 }}>
          <IconButton sx={{ p: 0 }}>
            <Avatar
              alt={currentUser?.user_firstname + ' ' + currentUser?.user_lastname}
              src={currentUser?.user_avatar}
              sx={{ width: 35, height: 35 }}
            />
          </IconButton>
          <Box sx={{}}>
            <Typography fontWeight={600} noWrap>
              {currentUser?.user_firstname + ' ' + currentUser?.user_lastname}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {currentUser?.user_email ?? 'Vui lòng bổ sung email'}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
          <ListItemButton
            onClick={() => {
              navigate('/profile');
              handleCloseUserMenu();
            }}
          >
            <ListItemIcon>
              <Profile variant="Bulk" size={18} />
            </ListItemIcon>
            <ListItemText primary="Thông tin cá nhân" />
          </ListItemButton>
        </List>
        <Button
          sx={{
            mt: 1
          }}
          onClick={() => {
            dispatch(logoutUser());
            navigate('/');
          }}
          fullWidth
          variant="contained"
          startIcon={<Logout />}
          size="large"
        >
          Đăng xuất
        </Button>
      </Popover>
    </Box>
  );
};

export default UserInfo;
