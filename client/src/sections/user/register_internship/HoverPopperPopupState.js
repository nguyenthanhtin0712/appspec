import { Fade, Popper, Stack, Typography, useTheme } from '@mui/material';
import { Building4, Buildings, Call, MessageText1, TickCircle } from 'iconsax-react';
import { bindHover, bindPopper, usePopupState } from 'material-ui-popup-state/hooks';

const HoverPopperPopupState = ({ data }) => {
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
          {data.company_name}
        </Typography>
      </Stack>
      <Popper {...bindPopper(popupState)} placement="top" transition style={{ zIndex: 10000 }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Stack spacing={2} sx={{ boxShadow: theme.customShadows.z3, p: 2, bgcolor: '#fff', maxWidth: '350px', borderRadius: '8px' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h5">{data.company_name}</Typography>
                <TickCircle size="23" color={theme.palette.primary.main} variant="Bold" />
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Call size="25" color={theme.palette.secondary.main} variant="Bold" />
                <Typography>{data.user_phone}</Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <MessageText1 size="25" color={theme.palette.secondary.main} variant="Bold" />
                <Typography>{data.user_email}</Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Building4 size="25" color={theme.palette.secondary.main} variant="Bold" />
                <Typography>{data.company_address}</Typography>
              </Stack>
            </Stack>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default HoverPopperPopupState;
