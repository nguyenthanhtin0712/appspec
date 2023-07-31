import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Calendar, Chart, InfoCircle, Stickynote, ArchiveTick, Check, MedalStar, RecordCircle } from 'iconsax-react';
import { useTheme } from '@mui/material/styles';
import InfoItem from 'sections/user/register_speciality/index/InfoItem';
import RegistrationInfoTable from 'sections/user/register_speciality/index/RegistrationInfoTable';
import { dispatch } from 'store/index';
import { getRegistrationInformation } from 'store/reducers/registerSpecialtySlice';
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
  const { register_specialty_course, register_specialty_start_date, register_specialty_end_date, register_specialty_detail } =
    userRegistrationPeriod;
  return (
    <Box component={Container} maxWidth="lg" sx={{ p: 3, pt: 0, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} mx="auto">
          <MainCard title={`Thông tin đăng ký chuyên ngành khóa ${register_specialty_course}`}>
            <Box sx={{ borderBottom: '1px solid', borderColor: theme.palette.divider, pb: 1 }}>
              <Stack direction="row" alignItems="flex-end" spacing={1} mb={2}>
                <Calendar size="25" color={theme.palette.primary.main} variant="Bulk" />
                <Typography variant="h5" fontWeight={600}>
                  Lịch đăng ký
                </Typography>
              </Stack>
              <Stack ml={3}>
                <Typography variant="h6">Thời gian bắt đầu: {formatDateTimeDisplay(register_specialty_start_date)}</Typography>
                <Typography variant="h6">Thời gian kết thúc: {formatDateTimeDisplay(register_specialty_end_date)}</Typography>
              </Stack>
            </Box>
            <Box sx={{ borderBottom: '1px solid', borderColor: theme.palette.divider, py: 2 }}>
              <Stack direction="row" alignItems="flex-end" spacing={1} mb={2}>
                <Chart size="25" color={theme.palette.primary.main} variant="Bulk" />
                <Typography variant="h5">Thống kê</Typography>
              </Stack>
              {register_specialty_detail.map((item) => (
                <Box key={item.major_id}>
                  <Stack direction="row" alignItems="center" spacing={1.5} my={3}>
                    <RecordCircle size="18" color={theme.palette.success.main} variant="Bulk" />
                    <Typography fontWeight={600} fontSize={14}>
                      Ngành {item.major_name}
                    </Typography>
                  </Stack>
                  <RegistrationInfoTable data={item.specialties} />
                </Box>
              ))}
            </Box>
            <Box sx={{ borderBottom: '1px solid', borderColor: theme.palette.divider, py: 2 }}>
              <Stack direction="row" alignItems="flex-end" spacing={1} mb={2}>
                <InfoCircle size="25" color={theme.palette.primary.main} variant="Bulk" />
                <Typography variant="h5">Thông tin</Typography>
              </Stack>
              <Grid container spacing={2}>
                <InfoItem
                  href="/register_speciality/register"
                  title="Đăng ký chuyên ngành"
                  icon={<ArchiveTick variant="Bulk" size="32" color={theme.palette.primary.main} />}
                />
                <InfoItem
                  href="/"
                  title="Hướng dẫn đăng ký chuyên ngành"
                  icon={<Stickynote variant="Bulk" size="32" color={theme.palette.primary.main} />}
                />
                <InfoItem
                  href="/register_speciality/rules"
                  title="Điều lệ đăng ký chuyên ngành"
                  icon={<Check variant="Bulk" size="32" color={theme.palette.primary.main} />}
                />
                <InfoItem
                  href="/register_speciality/result"
                  title="Kết quả đăng ký chuyên ngành"
                  icon={<MedalStar variant="Bulk" size="32" color={theme.palette.primary.main} />}
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
