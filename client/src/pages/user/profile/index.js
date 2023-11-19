import React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Container from '@mui/material/Container';
import { Profile, Unlock, TickCircle, DirectRight } from 'iconsax-react';
import { Avatar, Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import InputField from 'components/input/InputField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MainCard from 'components/MainCard';

const validationSchema = Yup.object().shape({
  old_password: Yup.string().required('Vui lòng nhập mật khẩu hiện tại!'),
  password: Yup.string()
    .required('Vui lòng nhập mật khẩu mới')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .matches(/[a-z]/, 'Cần có ít nhất 1 ký tự thường (a-z)')
    .matches(/[A-Z]/, 'Cần có ít nhất 1 ký tự in hoa (A-Z)')
    .matches(/\d/, 'Cần có ít nhất 1 chữ số')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Cần có ít nhất 1 ký tự đặt biệt'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Xác nhận mật khẩu không khớp')
    .required('Vui lòng xác nhận mật khẩu')
});

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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MainCard title="Thông tin cá nhân">
                  <Stack direction="row" justifyContent="center">
                    <Avatar sx={{ width: 50, height: 50 }} />
                  </Stack>
                  <Stack spacing={2}>
                    <InputField label="Mã số sinh viên" value="3121410069" disabled />
                    <Stack direction="row" spacing={1}>
                      <InputField label="Họ" value="Hoàng Gia" disabled />
                      <InputField label="Tên" value="Bảo" disabled />
                    </Stack>
                    <InputField label="Giới tính" value="Nam" disabled />
                    <InputField label="Lớp" value="DCT1218" disabled />
                    <InputField label="Ngành" value="Công nghệ thông tin" disabled />
                    <InputField label="Chuyên ngành" value="Kỹ thuật phần mềm" disabled />
                  </Stack>
                </MainCard>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MainCard title="Thông tin liên lạc">
                  <Stack spacing={2}>
                    <InputField label="Email" />
                    <InputField label="Số điện thoại" />
                    <Stack direction="row" justifyContent="end">
                      <Button variant="contained">Cập nhật thông tin</Button>
                    </Stack>
                  </Stack>
                </MainCard>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Formik
              initialValues={{
                old_password: '',
                password: '',
                confirm_password: ''
              }}
              validationSchema={validationSchema}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                      <Stack spacing={1}>
                        <InputField
                          type="password"
                          label="Mật khẩu hiện tại"
                          id="old_password"
                          value={values.old_password}
                          name="old_password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập mật khẩu hiện tại"
                          fullWidth
                          error={Boolean(touched.old_password && errors.old_password)}
                          helperText={errors.old_password}
                        />
                        <InputField
                          type="password"
                          label="Mật khẩu mới"
                          id="password"
                          value={values.password}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập mật khẩu mới"
                          fullWidth
                          error={Boolean(touched.password && errors.password)}
                          helperText={errors.password}
                        />
                        <InputField
                          type="password"
                          label="Xác nhận mật khẩu"
                          id="confirm_password"
                          value={values.confirm_password}
                          name="confirm_password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập mật khẩu xác nhận"
                          fullWidth
                          error={Boolean(touched.confirm_password && errors.confirm_password)}
                          helperText={errors.confirm_password}
                        />
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
                  <Button sx={{ mt: 2 }} type="submit" variant="contained" startIcon={<DirectRight />} disabled={isSubmitting}>
                    Thay đổi
                  </Button>
                </form>
              )}
            </Formik>
          </TabPanel>
        </TabContext>
      </MainCard>
    </Container>
  );
};

export default ProfileUser;
