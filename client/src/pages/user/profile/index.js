import React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Container from '@mui/material/Container';
import { Profile, Unlock, TickCircle, DirectRight } from 'iconsax-react';
import { Button, Card, CardContent, CardHeader, Divider, Grid, Stack, Typography } from '@mui/material';
import InputField from 'components/input/InputField';

const ProfileUser = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <TabContext value={value}>
        <Card>
          <CardHeader
            subheader={
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab icon={<Profile />} iconPosition="start" label="Hồ sơ" value="1" />
                <Tab icon={<Unlock />} iconPosition="start" label="Thay đổi mật khẩu" value="2" />
              </TabList>
            }
            sx={{ p: 0 }}
          />
          <Divider />
          <CardContent>
            <TabPanel value="1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae sint aut quisquam velit, natus, dicta corrupti tempore
              atque sapiente aliquid repellat, ab rem sit. Quos placeat qui quisquam itaque aliquid iste quis debitis praesentium
              perferendis. Pariatur omnis architecto atque error illo hic maxime officia laudantium quo obcaecati sapiente ut necessitatibus
              ducimus dignissimos, voluptate quibusdam qui reiciendis at aperiam esse dolores, laboriosam cum molestiae illum! Dolore, vero
              adipisci fugit accusamus quaerat asperiores? Nemo sint dolorum quibusdam dolor atque dignissimos non impedit quos aliquid
              ducimus ut ad nam numquam, nihil incidunt aut eaque nisi facere! Veniam magnam necessitatibus ad soluta recusandae in.
            </TabPanel>
            <TabPanel value="2">
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
            </TabPanel>
          </CardContent>
        </Card>
      </TabContext>
    </Container>
  );
};

export default ProfileUser;
