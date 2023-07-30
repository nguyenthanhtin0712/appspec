import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Calendar, Chart, InfoCircle, Stickynote, Call, Check, MedalStar } from 'iconsax-react';
import { useTheme } from '@mui/material/styles';
import InfoItem from 'sections/user/register_speciality/index/InfoItem';
import RegistrationInfoTable from 'sections/user/register_speciality/index/RegistrationInfoTable';
import { dispatch } from 'store/index';
import { getRegistrationInformation } from 'store/reducers/register_specialty';
import { useSelector } from 'react-redux';
import { formatDateTimeDisplay } from 'utils/formatDateTime';

const Register_speciality = () => {
  const theme = useTheme();
  const userRegistrationPeriod = useSelector((state) => state.register_specialty.userRegistrationPeriod);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getRegistrationInformation());
    };
    fetchData();
  }, []);
  if (!userRegistrationPeriod) {
    return null;
  }
  const { register_specialty_course, register_specialty_start_date, register_specialty_end_date, detail } = userRegistrationPeriod;
  return (
    <Box component={Container} maxWidth="lg" sx={{ p: 3, pt: 0, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} mx="auto">
          <MainCard title={`Thông tin đăng ký chuyên ngành khóa ${register_specialty_course}`}>
            <Box sx={{ borderBottom: '1px solid', borderColor: theme.palette.divider, pb: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <Calendar size="20" color={theme.palette.primary.main} variant="Bulk" />
                <Typography variant="h6">Lịch đăng ký</Typography>
              </Stack>
              <Stack ml={4}>
                <Typography variant="h6">Thời gian bắt đầu: {formatDateTimeDisplay(register_specialty_start_date)}</Typography>
                <Typography variant="h6">Thời gian kết thúc: {formatDateTimeDisplay(register_specialty_end_date)}</Typography>
              </Stack>
            </Box>
            <Box sx={{ borderBottom: '1px solid', borderColor: theme.palette.divider, py: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <Chart size="20" color={theme.palette.primary.main} variant="Bulk" />
                <Typography variant="h6">Thống kê</Typography>
              </Stack>
              <RegistrationInfoTable data={detail} />
            </Box>
            <Box sx={{ borderBottom: '1px solid', borderColor: theme.palette.divider, py: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <InfoCircle size="20" color={theme.palette.primary.main} variant="Bulk" />
                <Typography variant="h6">Thông tin</Typography>
              </Stack>
              <Grid container spacing={2}>
                <InfoItem
                  href="/"
                  title="Hướng dẫn đăng ký chuyên ngành"
                  icon={<Stickynote variant="Bulk" size="32" color={theme.palette.primary.main} />}
                />
                <InfoItem
                  href="/"
                  title="Điều lệ đăng ký chuyên ngành"
                  icon={<Check variant="Bulk" size="32" color={theme.palette.primary.main} />}
                />
                <InfoItem
                  href="/"
                  title="Kết quả đăng ký chuyên ngành"
                  icon={<MedalStar variant="Bulk" size="32" color={theme.palette.primary.main} />}
                />
                <InfoItem
                  href="/"
                  title="Liên hệ với Ban quản trị website"
                  icon={<Call variant="Bulk" size="32" color={theme.palette.primary.main} />}
                />
              </Grid>
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register_speciality;
