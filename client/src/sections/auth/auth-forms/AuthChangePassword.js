import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { toast } from 'react-toastify';
import { dispatch } from 'store/index';
import { forgotPassword } from 'store/slices/forgotpasswordSlice';

const AuthForgotPassword = () => {
  return (
    <>
      <Formik
        initialValues={{
          password: '',
          password_comfirm: ''
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().required('Vui lòng nhập mật khẩu mới').min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
          password_confirm: Yup.string()
            .required('Vui lòng nhập xác nhận')
            .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận phải khớp với mật khẩu mới')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            const result = await dispatch(forgotPassword(values));
            if (result) {
              console.log(result.payload);
              if (result.payload.status == 400) {
                toast.warning('');
              }
              if (result.payload.status == 200) {
                toast.success('');
                resetForm();
                resetForm();
              }
              setStatus({ success: true });
              setSubmitting(false);
              // navigate('/auth/login');
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
              <Grid item xs={12} spacing={2}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password">Mật khẩu mới</InputLabel>
                  <OutlinedInput
                    id="password"
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu mới"
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-user_password">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password_comfirm">Xác nhận mật khẩu</InputLabel>
                  <OutlinedInput
                    id="password_comfirm"
                    value={values.password_comfirm}
                    name="password_comfirm"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Xác nhận mật khẩu"
                    fullWidth
                    error={Boolean(touched.password_comfirm && errors.password_comfirm)}
                  />
                  {touched.password_comfirm && errors.password_comfirm && (
                    <FormHelperText error id="helper-text-user_password_comfirm">
                      {errors.password_comfirm}
                    </FormHelperText>
                  )}
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
                    Login
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

export default AuthForgotPassword;
