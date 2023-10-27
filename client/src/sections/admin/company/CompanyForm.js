import Button from '@mui/material/Button';
import InputField from 'components/input/InputField';
import { useDispatch } from 'react-redux';
import { Box, Stack, Switch } from '@mui/material';
import { Formik } from 'formik';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { createCompany, updateCompany, setCloseDialog } from 'store/slices/companySlice';
import React, { useCallback } from 'react';

const CompanyForm = ({ initialValues, action }) => {
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    dispatch(setCloseDialog());
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={action == 'update' ? validateUpdate : validateCreate}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const value = {
            ...values,
            company_is_official: values.company_is_official ? 1 : 0
          };
          const actionType = action === 'update' ? updateCompany : createCompany;
          const result = await dispatch(actionType(value));
          if (result && !result.error) {
            setStatus({ success: true });
            setSubmitting(false);
            toast.success(action === 'update' ? 'Sửa công ty thành công!' : 'Thêm công ty thành công!');
          } else {
            setStatus({ success: false });
            setErrors(result.payload.errors);
            setSubmitting(false);
            toast.error(action === 'update' ? 'Có lỗi xảy ra khi sửa công ty!' : 'Có lỗi xảy ra khi thêm công ty!');
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
        <form noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Stack spacing={2}>
                  <InputField
                    id="user_firstname"
                    type="text"
                    value={values.user_firstname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập họ người liên hệ"
                    label="Họ"
                    fullWidth
                    error={Boolean(touched.user_firstname && errors.user_firstname)}
                    helperText={errors.user_firstname}
                  />
                  <InputField
                    id="user_lastname"
                    type="text"
                    value={values.user_lastname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập tên người liên hệ"
                    label="Tên"
                    fullWidth
                    error={Boolean(touched.user_lastname && errors.user_lastname)}
                    helperText={errors.user_lastname}
                  />
                  <InputField
                    id="user_phone"
                    type="text"
                    value={values.user_phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại người liên hệ"
                    label="Số điện thoại"
                    fullWidth
                    error={Boolean(touched.user_phone && errors.user_phone)}
                    helperText={errors.user_phone}
                  />
                  <InputField
                    id="user_email"
                    type="text"
                    value={values.user_email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập email người liên hệ"
                    label="Email"
                    fullWidth
                    error={Boolean(touched.user_email && errors.user_email)}
                    helperText={errors.user_email}
                  />
                  {action != 'update' && (
                    <InputField
                      id="user_password"
                      type="text"
                      value={values.user_password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu"
                      label="Mật khẩu"
                      fullWidth
                      error={Boolean(touched.user_password && errors.user_password)}
                      helperText={errors.user_password}
                    />
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
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
                    id="company_address"
                    type="text"
                    value={values.company_address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ"
                    label="Địa chỉ"
                    fullWidth
                    error={Boolean(touched.company_address && errors.company_address)}
                    helperText={errors.company_address}
                  />
                  <InputField
                    id="company_host"
                    type="text"
                    value={values.company_host}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ website công ty"
                    label="Địa chỉ website"
                    fullWidth
                    error={Boolean(touched.company_host && errors.company_host)}
                    helperText={errors.company_host}
                  />
                  <Box mt={2}>
                    <label htmlFor="company_is_official">Công ty chính thức</label>
                    <Switch
                      id="company_is_official"
                      name="company_is_official"
                      checked={values.company_is_official == 1 ? true : false}
                      onBlur={handleBlur}
                      onChange={(e) => setFieldValue('company_is_official', e.target.checked)}
                      inputProps={{ 'aria-label': 'Switch A' }}
                    />
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="error">
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              {action === 'add' ? 'Thêm công ty' : 'Chỉnh sửa'}
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
};

const validateCreate = Yup.object().shape({
  user_firstname: Yup.string().max(255).required('Nhập họ người liên hệ'),
  user_lastname: Yup.string().max(255).required('Nhập tên người liên hệ'),
  user_phone: Yup.string().max(255).required('Nhập số điện thoại người liên hệ'),
  user_email: Yup.string().max(255).required('Nhập số email người liên hệ'),
  user_password: Yup.string().max(255).required('Nhập mật khẩu là bắt buộc '),
  company_name: Yup.string().max(255).required('Tên công ty là bắt buộc !'),
  company_address: Yup.string().max(255).required('Địa chỉ công ty là bắt buộc !'),
  company_host: Yup.string().max(255).required('Địa chỉ website là bắt buộc !')
});

const validateUpdate = Yup.object().shape({
  user_firstname: Yup.string().max(255).required('Nhập họ người liên hệ'),
  user_lastname: Yup.string().max(255).required('Nhập tên người liên hệ'),
  user_phone: Yup.string().max(255).required('Nhập số điện thoại người liên hệ'),
  user_email: Yup.string().max(255).required('Nhập số email người liên hệ'),
  company_name: Yup.string().max(255).required('Tên công ty là bắt buộc !'),
  company_address: Yup.string().max(255).required('Địa chỉ là bắt buộc !'),
  company_host: Yup.string().max(255).required('Địa chỉ hosting là bắt buộc !')
});

export default CompanyForm;
