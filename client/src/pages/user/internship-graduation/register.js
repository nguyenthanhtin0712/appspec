import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import RegisterInternsipForm from 'sections/user/register_internship/RegisterInternshipForm';
import CompanyList from 'sections/user/register_internship/CompanyList';
import { useSelector } from 'react-redux';
import { getInternship } from 'store/reducers/registerInternUserSlice';
import { dispatch } from 'store/index';
import CountdownTimer from 'components/CountdownTimer';
import LoadingBox from 'components/LoadingBox';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import RegisterOutInternshipForm from 'sections/user/register_internship/RegisterOutInternshipForm';

const RegisterInternshipGraduation = () => {
  const { list_company, internship } = useSelector((state) => state.regsiter_intern_user);
  const { register_internship_start_date, register_internship_end_date } = internship;
  const currentTime = useMemo(() => new Date(), []);

  const isBeforeRegistrationTime = useMemo(() => {
    return currentTime < new Date(register_internship_start_date);
  }, [register_internship_start_date, currentTime]);

  const isAfterRegistrationTime = useMemo(() => {
    return currentTime > new Date(register_internship_end_date);
  }, [register_internship_end_date, currentTime]);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getInternship());
    };
    fetch();
  }, []);

  if (!internship) return null;

  const RenderForm = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Trong danh sách" value="1" />
              <Tab label="Ngoài danh sách" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Container maxWidth="sm">
              <Typography mb={2}>Sinh viên có thể THAY ĐỔI nơi thực tập đã đăng ký khi thời gian đăng ký còn hiệu lực</Typography>
              <MainCard>
                <RegisterInternsipForm companies={list_company} />
              </MainCard>
            </Container>
          </TabPanel>
          <TabPanel value="2">
            <Container maxWidth="sm">
              <Typography mb={2}>Sinh viên có thể THAY ĐỔI nơi thực tập đã đăng ký khi thời gian đăng ký còn hiệu lực</Typography>
              <MainCard>
                <RegisterOutInternshipForm />
              </MainCard>
            </Container>
          </TabPanel>
        </TabContext>
      </>
    );
  };

  const CountDown = () => {
    return (
      <Box
        sx={{
          py: 3
        }}
      >
        <Typography gutterBottom textAlign={'center'} fontSize={'18px'} fontWeight={'600'} textTransform={'uppercase'}>
          Chưa tới thời gian đăng ký thực tập
        </Typography>
        <CountdownTimer targetTime={new Date(register_internship_start_date).getTime()} />
      </Box>
    );
  };

  const OutOfTime = () => {
    return (
      <>
        <Typography gutterBottom>Đã hết thời gian đăng ký thực tập....</Typography>
      </>
    );
  };

  const title = `Đăng ký thực tập năm ${internship.openclasstime.openclass_time_year} kì ${internship.openclasstime.openclass_time_semester}`;

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <MainCard title="Hiện trạng đăng ký" sx={{ mb: 2 }}>
        <CompanyList />
      </MainCard>
      <MainCard title={title}>
        {internship ? isAfterRegistrationTime ? <OutOfTime /> : isBeforeRegistrationTime ? <CountDown /> : <RenderForm /> : <LoadingBox />}
      </MainCard>
    </Container>
  );
};

export default RegisterInternshipGraduation;
