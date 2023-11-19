import React, { useEffect } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Container from '@mui/material/Container';
import { Profile, Unlock, TickCircle, DirectRight, AddCircle } from 'iconsax-react';
import { Backdrop, Box, Button, CircularProgress, Divider, Grid, Stack, Typography } from '@mui/material';
import InputField from 'components/input/InputField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MainCard from 'components/MainCard';
import { toast } from 'react-toastify';
import { changePassword, changeInformation, fetchData } from 'store/slices/profileSlice';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
import LoadingBox from 'components/LoadingBox';

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
  const { data, isLoading } = useSelector((state) => state.profile);
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
          {!data ? (
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
                    <Grid item xs={6}>
                      <Typography variant="h6">Mã số sinh viên</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data?.student_code}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Họ và tên</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.user_firstname + ' ' + data.user_lastname}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Giới tính</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data?.user_gender == 0 ? 'Nam' : 'Nữ'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Ngày Sinh</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.user_birthday}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Số CMND/CCCD</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.student_cmnd}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Lớp</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.student_class}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Ngành</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.major_name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Chuyên ngành</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.specialty_name ?? 'Chưa phân chuyên ngành'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Dân tộc</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.student_nation}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Tôn giáo</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.student_religion}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Quê quán</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.student_address}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Email</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.user_email ?? 'Chưa cập nhật'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Phone</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.user_phone ?? 'Chưa cập nhật'}</Typography>
                    </Grid>
                  </Grid>
                </MainCard>
              </TabPanel>
              <TabPanel value="2">
                <Formik
                  initialValues={{
                    old_password: '',
                    password: '',
                    confirm_password: ''
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                      const result = await dispatch(changePassword(values));
                      if (result.payload.status == 400) {
                        toast.warning('Mật khẩu hiện tại không đúng');
                      }
                      if (result.payload.status == 200) {
                        toast.success('Thay đổi mật khẩu thành công');
                        resetForm();
                        setStatus({ success: true });
                        setSubmitting(false);
                      }
                    } catch (err) {
                      console.error(err);
                      setStatus({ success: false });
                      setErrors({ submit: err.message });
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={7}>
                          <Stack spacing={2}>
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
              <TabPanel value="3">
                <Formik
                  initialValues={{
                    user_phone: data.user_phone ?? '',
                    user_email: data.user_email ?? ''
                  }}
                  validationSchema={Yup.object().shape({
                    user_phone: Yup.string()
                      .required('Vui lòng nhập số điện thoại')
                      .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa chữ số'),

                    user_email: Yup.string().required('Vui lòng nhập email').email('Địa chỉ email không hợp lệ')
                  })}
                  onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                      const result = await dispatch(changeInformation(values));
                      if (result.payload) {
                        toast.success('Thay đổi thông tin thành công');
                        resetForm();
                        setValue('1');
                      }
                    } catch (err) {
                      console.error(err);
                      setStatus({ success: false });
                      setErrors({ submit: err.message });
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={7}>
                          <Stack spacing={1}>
                            <InputField
                              label="Phone"
                              id="user_phone"
                              value={values.user_phone}
                              name="user_phone"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Nhập số điện thoại của bạn"
                              fullWidth
                              error={Boolean(touched.user_phone && errors.user_phone)}
                              helperText={errors.user_phone}
                            />
                            <InputField
                              label="Email"
                              id="user_email"
                              value={values.user_email}
                              name="user_email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Nhập email của bạn"
                              fullWidth
                              error={Boolean(touched.user_email && errors.user_email)}
                              helperText={errors.user_email}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <Stack spacing={1}>
                            <Typography variant="h5" gutterBottom>
                              Thông tin cần đảm bảo
                            </Typography>
                            <Stack p={1} spacing={2}>
                              <Stack>
                                <Stack direction="row" spacing={1.5} mb={2}>
                                  <TickCircle color="#66af8e" />
                                  <Typography variant="h6" gutterBottom>
                                    Phải là thông tin của chính bạn
                                  </Typography>
                                </Stack>
                                <Divider sx={{ borderStyle: 'dashed' }} />
                              </Stack>
                            </Stack>
                          </Stack>
                        </Grid>
                      </Grid>
                      <Button sx={{ mt: 2 }} type="submit" variant="contained" startIcon={<DirectRight />} disabled={isSubmitting}>
                        Cập nhật
                      </Button>
                    </form>
                  )}
                </Formik>
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
