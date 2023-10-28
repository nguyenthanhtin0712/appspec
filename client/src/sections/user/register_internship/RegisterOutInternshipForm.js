import React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputField from 'components/input/InputField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { dispatch } from 'store/index';
import { registerInternshipOutOffcial } from 'store/slices/registerInternUserSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const RegisterOutInternshipForm = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        company_name: '',
        position_name: '',
        company_address: ''
      }}
      validationSchema={Yup.object().shape({
        company_name: Yup.string().max(255).required('Nhập tên công ty'),
        position_name: Yup.string().max(255).required('Nhập vị trí thự tập tại công ty'),
        company_address: Yup.string().max(255).required('Nhập địa chỉ công ty')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const result = await dispatch(registerInternshipOutOffcial(values));
          if (result && !result.error) {
            setStatus({ success: true });
            setSubmitting(false);
            toast.success('Đăng ký thực tập thành công');
            navigate('/register_intern/result');
          } else {
            setStatus({ success: false });
            setErrors(result.payload.errors);
            setSubmitting(false);
            toast.error('Có lỗi khi đăng ký thực tập');
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
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <InputField
                    id="company_name"
                    type="text"
                    value={values.company_name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập tên công ty"
                    label="Tên công ty"
                    fullWidth
                    error={Boolean(touched.company_name && errors.company_name)}
                    helperText={errors.company_name}
                  />
                  <InputField
                    id="position_name"
                    type="text"
                    value={values.position_name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập vị trí thực tập"
                    label="Vị trí thực tập"
                    fullWidth
                    error={Boolean(touched.position_name && errors.position_name)}
                    helperText={errors.position_name}
                  />
                  <InputField
                    id="company_address"
                    type="text"
                    value={values.company_address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ công ty"
                    label="Địa chỉ công ty"
                    fullWidth
                    error={Boolean(touched.company_address && errors.company_address)}
                    helperText={errors.company_address}
                  />
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              Đăng ký
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
};

export default RegisterOutInternshipForm;
