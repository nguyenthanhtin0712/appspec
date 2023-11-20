import { Button, FormHelperText, Grid, Stack, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { toast } from 'react-toastify';
import { dispatch } from 'store/index';
import { useNavigate, useParams } from 'react-router';
import InputField from 'components/input/InputField';
import { ChangePasswordToken } from 'store/slices/forgotpasswordSlice';

const AuthChangePassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{
          password: '',
          confirm_password: ''
        }}
        validationSchema={Yup.object().shape({
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
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            values['token'] = token.split('=')[1];
            console.log('values', values);
            const result = await dispatch(ChangePasswordToken(values));
            if (result) {
              if (result.payload.status == 200) {
                toast.success('Thay đổi mật khẩu thành công');
                resetForm();
                navigate('/auth/login');
              }
              setStatus({ success: true });
              setSubmitting(false);
            } else {
              setStatus({ success: true });
              setSubmitting(false);
              toast.error(result.payload.message);
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center" sx={{ mb: 4 }}>
                  <Typography variant="h5">Thay đổi mật khẩu</Typography>
                </Stack>
                <Stack spacing={2}>
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

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Thay đổi
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthChangePassword;
