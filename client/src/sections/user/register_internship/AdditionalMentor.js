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
import { addMentorStudent } from 'store/slices/registerInternUserSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const AdditionalMentor = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        mentor_name: '',
        mentor_email: '',
        mentor_phone: ''
      }}
      validationSchema={Yup.object().shape({
        mentor_name: Yup.string().max(255).required('Nhập tên người hướng dẫn'),
        mentor_email: Yup.string().max(255).email('Địa chỉ email không hợp lệ').required('Nhập vị trí thự tập tại người hướng dẫn'),
        mentor_phone: Yup.string().max(255).required('Nhập địa chỉ người hướng dẫn')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const result = await dispatch(addMentorStudent(values));
          if (result && !result.error) {
            setStatus({ success: true });
            setSubmitting(false);
            toast.success('Bổ sung thông tin thành công!');
            navigate('/register_intern/result');
          } else {
            setStatus({ success: false });
            setErrors(result.payload.errors);
            setSubmitting(false);
            toast.error('Có lỗi khi bổ sung thông tin');
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
                    id="mentor_name"
                    type="text"
                    value={values.mentor_name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập tên người hướng dẫn"
                    label="Người hướng dẫn"
                    fullWidth
                    error={Boolean(touched.mentor_name && errors.mentor_name)}
                    helperText={errors.mentor_name}
                  />
                  <InputField
                    id="mentor_email"
                    type="text"
                    value={values.mentor_email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập tên email người hướng dẫn"
                    label="Email người hướng dẫn"
                    fullWidth
                    error={Boolean(touched.mentor_email && errors.mentor_email)}
                    helperText={errors.mentor_email}
                  />
                  <InputField
                    id="mentor_phone"
                    type="text"
                    value={values.mentor_phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại người hướng dẫn"
                    label="Số điện thoại người hướng dẫn"
                    fullWidth
                    error={Boolean(touched.mentor_phone && errors.mentor_phone)}
                    helperText={errors.mentor_phone}
                  />
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              Bổ sung
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
};

export default AdditionalMentor;
