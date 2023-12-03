import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { toast } from 'react-toastify';
import { dispatch } from 'store/index';
import { forgotPassword, setEmail, setSentSuccess } from 'store/slices/forgotpasswordSlice';

const AuthForgotPassword = () => {
  return (
    <>
      <Formik
        initialValues={{
          user_email: ''
        }}
        validationSchema={Yup.object().shape({
          user_email: Yup.string().required('Vui lòng nhập email').email('Địa chỉ email không hợp lệ')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            const result = await dispatch(forgotPassword(values));
            if (result) {
              console.log(result.payload);
              if (result.payload.status == 400) {
                toast.warning('Email không tồn tại trong hệ thống');
              }
              if (result.payload.status == 200) {
                dispatch(setEmail(values.user_email));
                dispatch(setSentSuccess(true));
                resetForm();
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
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email đã đăng ký trong hệ thống</InputLabel>
                  <OutlinedInput
                    id="user_email"
                    type="email"
                    value={values.user_email}
                    name="user_email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập email đã đăng ký trong hệ thống"
                    fullWidth
                    error={Boolean(touched.user_email && errors.user_email)}
                  />
                  {touched.user_email && errors.user_email && (
                    <FormHelperText error id="helper-text-user_user_email">
                      {errors.user_email}
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
                    Gửi
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
