import { Button, Stack, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CountdownTimer from 'components/CountdownTimer';
import LoadingBox from 'components/LoadingBox';
import MainCard from 'components/MainCard';
import { LockCircle } from 'iconsax-react';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from 'store/index';
import { getInternship, getUserInternship } from 'store/reducers/registerInternUserSlice';
import { Link } from 'react-router-dom';
import AdditionalMentor from 'sections/user/register_internship/AdditionalMentor';
import AdditionalCompany from 'sections/user/register_internship/AdditionalCompany';

const Additional = () => {
  const theme = useTheme();
  const { internship, student } = useSelector((state) => state.regsiter_intern_user);
  console.log(student);
  const { register_internship_end_date, internship_graduation_end_date } = internship;
  const currentTime = useMemo(() => new Date(), []);

  const isBeforeRegistrationTime = useMemo(() => {
    return currentTime < new Date(register_internship_end_date);
  }, [register_internship_end_date, currentTime]);

  const isAfterRegistrationTime = useMemo(() => {
    return currentTime > new Date(internship_graduation_end_date);
  }, [internship_graduation_end_date, currentTime]);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getInternship());
      await dispatch(getUserInternship());
    };
    fetch();
  }, []);

  const CountDown = () => {
    return (
      <Box
        sx={{
          py: 3
        }}
      >
        <Typography gutterBottom textAlign={'center'} fontSize={'18px'} fontWeight={'600'} textTransform={'uppercase'}>
          Chưa đến thời gian bổ sung
        </Typography>
        <CountdownTimer targetTime={new Date(register_internship_end_date).getTime()} />
      </Box>
    );
  };

  const RenderForm = () => {
    if (student?.company_position_detail_id != null && student?.mentor_code != null)
      return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
          <Stack justifyContent="center" alignItems="center" spacing={4} minHeight={500}>
            <LockCircle size="150" color={theme.palette.warning.main} variant="Bulk" />
            <Typography variant="h4" textAlign="center">
              Bạn đã điền đầy đủ thông tin
            </Typography>
            <Button variant="contained" component={Link} to="/">
              Trở về trang chủ
            </Button>
          </Stack>
        </Container>
      );
    if (student?.company_position_detail_id != null && student?.mentor_code == null) {
      return (
        <Container maxWidth="sm">
          <Typography mb={2}>Sinh viên có thể THAY ĐỔI nơi người hướng 1 lần duy nhất</Typography>
          <MainCard title="Bổ sung thông tin thực tập">
            <AdditionalMentor />
          </MainCard>
        </Container>
      );
    }
    if (student?.company_position_detail_id == null) {
      return (
        <Container maxWidth="sm">
          <Typography mb={2}>Sinh viên có thể THAY ĐỔI nơi người hướng 1 lần duy nhất</Typography>
          <MainCard title="Bổ sung thông tin người hướng dẫn">
            <AdditionalCompany />
          </MainCard>
        </Container>
      );
    }
  };

  const OutOfTime = () => {
    return (
      <>
        <Typography gutterBottom>Đã hết thời gian bổ sung....</Typography>
      </>
    );
  };
  if (!internship || !student) return null;
  const title = `Thực tập năm ${internship?.openclasstime.openclass_time_year} kì ${internship?.openclasstime.openclass_time_semester}`;
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <MainCard title={title}>
        {internship ? isAfterRegistrationTime ? <OutOfTime /> : isBeforeRegistrationTime ? <CountDown /> : <RenderForm /> : <LoadingBox />}
      </MainCard>
    </Container>
  );
};

export default Additional;
