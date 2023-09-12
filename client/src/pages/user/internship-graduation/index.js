import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Calendar, InfoCircle, Stickynote, Call, Check, MedalStar, Chart } from 'iconsax-react';
import { useTheme } from '@mui/material/styles';
import InfoItem from 'sections/user/register_speciality/index/InfoItem';
import { fetchData } from 'store/reducers/registerInternUserSlice';
import { dispatch } from 'store/index';
import { useSelector } from 'react-redux';
import { formatDateTimeDisplay } from 'utils/formatDateTime';
import CompanyList from 'sections/user/register_internship/CompanyList';

const Register_speciality = () => {
  const theme = useTheme();
  const { internship } = useSelector((state) => state.regsiter_intern_user);
  useEffect(() => {
    const getData = () => {
      dispatch(fetchData({}));
    };
    getData();
  }, []);
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <MainCard title="Thông tin đăng ký thực tập">
        <Box sx={{ borderBottom: '1px solid', borderColor: theme.palette.divider, pb: 1 }}>
          <Stack direction="row" alignItems="flex-end" spacing={1} mb={2}>
            <Calendar size="25" color={theme.palette.primary.main} variant="Bulk" />
            <Typography variant="h5" fontWeight={600}>
              Lịch đăng ký
            </Typography>
          </Stack>
          <Stack ml={4}>
            <Typography variant="h6">Thời gian bắt đầu: {formatDateTimeDisplay(internship.register_internship_start_date)}</Typography>
            <Typography variant="h6">Thời gian kết thúc: {formatDateTimeDisplay(internship.register_internship_end_date)}</Typography>
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
          <CompanyList></CompanyList>
        </Box>
      </MainCard>
    </Container>
  );
};

export default Register_speciality;
