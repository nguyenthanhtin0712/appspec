import React, { useEffect } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Container from '@mui/material/Container';
import { Profile, Unlock, AddCircle } from 'iconsax-react';
import { Backdrop, Box, CircularProgress, Grid, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import { fetchData } from 'store/slices/profileSlice';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
import LoadingBox from 'components/LoadingBox';
import InfoItem from 'sections/user/profile/InfoItem';
import FormChangePassword from 'sections/user/profile/FormChangePassword';
import FormUpdateInfo from 'sections/user/profile/FormUpdateInfo';

const ProfileUser = () => {
  const { data, isLoading, isLoadingInfo } = useSelector((state) => state.profile);
  const [value, setValue] = React.useState('1');
  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchData());
    };
    fetch();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <MainCard title="Thông tin">
          {isLoadingInfo ? (
            <Stack direction="row" justifyContent="center" alignItems="center">
              <LoadingBox />
            </Stack>
          ) : (
            <TabContext value={value}>
              <Box>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab icon={<Profile />} iconPosition="start" label="Hồ sơ" value="1" />
                  <Tab icon={<Unlock />} iconPosition="start" label="Thay đổi mật khẩu" value="2" />
                  <Tab icon={<AddCircle />} iconPosition="start" label="Thông tin liên lạc" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <MainCard title="Thông tin cá nhân">
                  <Grid container spacing={2}>
                    {data?.student_class ? (
                      <>
                        <InfoItem label="Mã số sinh viên" value={data?.student_code} />
                        <InfoItem label="Họ và tên" value={data?.user_firstname + ' ' + data?.user_lastname} />
                        <InfoItem label="Giới tính" value={data?.user_gender == 0 ? 'Nam' : 'Nữ'} />
                        <InfoItem label="Ngày Sinh" value={data?.user_birthday} />
                        <InfoItem label="Số CMND/CCCD" value={data.student_cmnd} />
                        <InfoItem label="Lớp" value={data.student_class} />
                        <InfoItem label="Ngành" value={data.major_name} />
                        <InfoItem label="Chuyên ngành" value={data.specialty_name || 'Chưa phân chuyên ngành'} />
                        <InfoItem label="Dân tộc" value={data.student_nation} />
                        <InfoItem label="Tôn giáo" value={data.student_religion} />
                        <InfoItem label="Quê quán" value={data.student_address} />
                        <InfoItem label="Email" value={data.user_email || 'Chưa cập nhật'} />
                        <InfoItem label="Phone" value={data.user_phone || 'Chưa cập nhật'} />
                      </>
                    ) : (
                      <>
                        <InfoItem label="Họ và tên" value={data?.user_firstname + ' ' + data?.user_lastname} />
                        <InfoItem label="Giới tính" value={data?.user_gender == 0 ? 'Nam' : 'Nữ'} />
                        <InfoItem label="Ngày Sinh" value={data?.user_birthday} />
                        <InfoItem label="Email" value={data?.user_email || 'Chưa cập nhật'} />
                        <InfoItem label="Phone" value={data?.user_phone || 'Chưa cập nhật'} />
                      </>
                    )}
                  </Grid>
                </MainCard>
              </TabPanel>
              <TabPanel value="2">
                <FormChangePassword />
              </TabPanel>
              <TabPanel value="3">
                <FormUpdateInfo data={data} setValue={setValue} />
              </TabPanel>
            </TabContext>
          )}
        </MainCard>
      </Container>
      {isLoading && (
        <Backdrop sx={{ color: '#fff', zIndex: 2000 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default ProfileUser;
