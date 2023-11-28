import React from 'react';
import { TickCircle, DirectRight } from 'iconsax-react';
import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import InputField from 'components/input/InputField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { changeInformation } from 'store/slices/profileSlice';
import { dispatch } from 'store';

const FormUpdateInfo = (data) => {
  return (
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
  );
};

export default FormUpdateInfo;
