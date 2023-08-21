import { Building4, Buildings, Call, MessageText1, TickCircle } from 'iconsax-react';
import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import { useTheme } from '@mui/material';
import { bindPopper, usePopupState } from 'material-ui-popup-state/hooks';
import { bindHover } from 'material-ui-popup-state';

const HoverPopperPopupState = () => {
  const theme = useTheme();
  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'demoPopper'
  });
  return (
    <div>
      <Stack spacing={1.5} direction="row" alignItems="center" mb={2} sx={{ cursor: 'pointer' }} {...bindHover(popupState)}>
        <Buildings size="32" color={theme.palette.secondary[500]} variant="Bulk" />
        <Typography fontSize={15} fontWeight={600}>
          Công ty TNHH Phần mềm FPT
        </Typography>
      </Stack>
      <Popper {...bindPopper(popupState)} placement="top" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Stack spacing={2} sx={{ boxShadow: theme.customShadows.z3, p: 2, bgcolor: '#fff', maxWidth: '350px', borderRadius: '8px' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h5">Công ty TNHH Phần mềm FPT</Typography>
                <TickCircle size="23" color={theme.palette.primary.main} variant="Bold" />
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Call size="25" color={theme.palette.secondary.main} variant="Bold" />
                <Typography>0123456789</Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <MessageText1 size="25" color={theme.palette.secondary.main} variant="Bold" />
                <Typography>transinh085@gmail.com</Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Building4 size="42" color={theme.palette.secondary.main} variant="Bold" />
                <Typography>205 Trần Hưng Đạo, phường 10, quận 5, Thành phố Hồ Chí Minh</Typography>
              </Stack>
            </Stack>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default HoverPopperPopupState;
