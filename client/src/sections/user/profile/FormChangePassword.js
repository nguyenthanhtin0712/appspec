import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import InputField from 'components/input/InputField';
import { Formik } from 'formik';
import { DirectRight, TickCircle } from 'iconsax-react';
import React from 'react';
import { dispatch } from 'store';
import { changePassword } from 'store/slices/profileSlice';
import * as Yup from 'yup';

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

const FormChangePassword = () => {
  return (
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
  );
};

export default FormChangePassword;
