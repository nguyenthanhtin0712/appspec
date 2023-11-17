import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Container from '@mui/material/Container';
import MainCard from 'components/MainCard';
import { Profile, Unlock, TickCircle, DirectRight } from 'iconsax-react';
import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import InputField from 'components/input/InputField';

const ProfileUser = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <MainCard title="Thông tin">
        <TabContext value={value}>
          <Box>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab icon={<Profile />} iconPosition="start" label="Hồ sơ" value="1" />
              <Tab icon={<Unlock />} iconPosition="start" label="Thay đổi mật khẩu" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <MainCard title="Thông tin cá nhân"></MainCard>
          </TabPanel>
          <TabPanel value="2">
            <MainCard title="Thay đổi mật khẩu">
              <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                  <Stack spacing={1}>
                    <InputField label="Mật khẩu hiện tại" />
                    <InputField label="Mật khẩu mới" />
                    <InputField label="Xác nhận mật khẩu" />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Stack spacing={1}>
                    <Typography variant="h5" gutterBottom>
                      Mật khẩu mới cần đảm bảo
                    </Typography>
                    <Stack p={1} spacing={2}>
                      <Stack>
                        <Stack direction="row" spacing={1.5} mb={2}>
                          <TickCircle color="#66af8e" />
                          <Typography variant="h6" gutterBottom>
                            Mật khẩu cần lớn hơn 6 ký tự
                          </Typography>
                        </Stack>
                        <Divider sx={{ borderStyle: 'dashed' }} />
                      </Stack>
                      <Stack>
                        <Stack direction="row" spacing={1.5} mb={2}>
                          <TickCircle color="#66af8e" />
                          <Typography variant="h6" gutterBottom>
                            Có ít nhất 1 ký tự thường (a-z)
                          </Typography>
                        </Stack>
                        <Divider sx={{ borderStyle: 'dashed' }} />
                      </Stack>
                      <Stack>
                        <Stack direction="row" spacing={1.5} mb={2}>
                          <TickCircle color="#66af8e" />
                          <Typography variant="h6" gutterBottom>
                            Có ít nhất 1 ký tự in hoa (A-Z)
                          </Typography>
                        </Stack>
                        <Divider sx={{ borderStyle: 'dashed' }} />
                      </Stack>
                      <Stack>
                        <Stack direction="row" spacing={1.5} mb={2}>
                          <TickCircle color="#66af8e" />
                          <Typography variant="h6" gutterBottom>
                            Có ít nhất 1 chứ số
                          </Typography>
                        </Stack>
                        <Divider sx={{ borderStyle: 'dashed' }} />
                      </Stack>
                      <Stack>
                        <Stack direction="row" spacing={1.5} mb={2}>
                          <TickCircle color="#66af8e" />
                          <Typography variant="h6" gutterBottom>
                            Có ít nhất 1 ký tự đặt biệt
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
              <Button variant="contained" startIcon={<DirectRight />}>
                Thay đổi
              </Button>
            </MainCard>
          </TabPanel>
        </TabContext>
      </MainCard>
    </Container>
  );
};

export default ProfileUser;
