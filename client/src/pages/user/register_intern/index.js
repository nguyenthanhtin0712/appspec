import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  Calendar,
  Chart,
  InfoCircle,
  Stickynote,
  Call,
  Check,
  MedalStar,
  Buildings,
  RecordCircle,
  Building4,
  MessageText1,
  TickCircle
} from 'iconsax-react';
import { useTheme } from '@mui/material/styles';
import InfoItem from 'sections/user/register_speciality/index/InfoItem';
import { bindHover } from 'material-ui-popup-state';
import Popper from '@mui/material/Popper';
import { bindPopper, usePopupState } from 'material-ui-popup-state/hooks';
import { Fade } from '@mui/material';

const Register_speciality = () => {
  const theme = useTheme();
  return (
    <Box component={Container} maxWidth="lg" sx={{ p: 3, pt: 0, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} mx="auto">
          <MainCard title="Thông tin đăng ký thực tập">
            <Box sx={{ borderBottom: '1px solid', borderColor: theme.palette.divider, pb: 1 }}>
              <Stack direction="row" alignItems="flex-end" spacing={1} mb={2}>
                <Calendar size="25" color={theme.palette.primary.main} variant="Bulk" />
                <Typography variant="h5" fontWeight={600}>
                  Lịch đăng ký
                </Typography>
              </Stack>
              <Stack ml={4}>
                <Typography variant="h6">Thời gian bắt đầu: 28-05-23 12:00 AM</Typography>
                <Typography variant="h6">Thời gian kết thúc: 10-06-23 4:00 PM</Typography>
              </Stack>
            </Box>
            <Box sx={{ borderBottom: '1px solid', borderColor: theme.palette.divider, py: 2 }}>
              <Stack direction="row" alignItems="flex-end" spacing={1} mb={2}>
                <InfoCircle size="25" color={theme.palette.primary.main} variant="Bulk" />
                <Typography variant="h5" fontWeight={600}>
                  Thông tin
                </Typography>
              </Stack>
              <Grid container spacing={2}>
                <InfoItem href="/" title="Hướng dẫn đăng ký thực tập" icon={<Stickynote size="32" color={theme.palette.primary.main} />} />
                <InfoItem href="/" title="Điều lệ đăng ký thực tập" icon={<Check size="32" color={theme.palette.primary.main} />} />
                <InfoItem href="/" title="Kết quả đăng ký thực tập" icon={<MedalStar size="32" color={theme.palette.primary.main} />} />
                <InfoItem href="/" title="Liên hệ với Ban quản trị website" icon={<Call size="32" color={theme.palette.primary.main} />} />
              </Grid>
            </Box>
            <Box sx={{ borderBottom: '1px solid', borderColor: theme.palette.divider, py: 2 }}>
              <Stack direction="row" alignItems="flex-end" spacing={1} mb={2}>
                <Chart size="25" color={theme.palette.primary.main} variant="Bulk" />
                <Typography variant="h5">Thống kê</Typography>
              </Stack>
              <Grid container spacing={2}>
                <CompanyItem />
                <CompanyItem />
                <CompanyItem />
                <CompanyItem />
                <CompanyItem />
                <CompanyItem />
              </Grid>
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

const CompanyItem = () => {
  const theme = useTheme();

  return (
    <Grid item xs={12} md={6}>
      <Box sx={{ p: 2, border: '1px solid', borderRadius: 1.5, borderColor: theme.palette.divider }}>
        <HoverPopperPopupState />
        <Stack spacing={2}>
          <InternPosition name="FrontEnd Developer" />
          <InternPosition name="Backend Developer" />
          <InternPosition name="FullStack Developer" />
        </Stack>
      </Box>
    </Grid>
  );
};

const InternPosition = ({ name }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={2}>
        <RecordCircle size="20" color={theme.palette.primary.main} variant="Bulk" />
        <Typography>{name}</Typography>
      </Stack>
      <Box bgcolor={theme.palette.success.main} color="#fff" px={1} py={0.5} borderRadius={50}>
        0/3
      </Box>
    </Stack>
  );
};

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

export default Register_speciality;
