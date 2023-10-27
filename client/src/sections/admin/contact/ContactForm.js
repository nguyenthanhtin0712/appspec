import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import { Formik } from 'formik';
// import { toast } from 'react-toastify';
import { setContactDialog } from 'store/slices/contactSlice';
import { updateContactConfig } from 'store/slices/contactSlice';
import Button from '@mui/material/Button';
import InputField from 'components/input/InputField';
import { dispatch } from 'store/index';
import { FormHelperText, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { toast } from 'react-toastify';

export const ContactForm = ({ initialValues }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        department_name: Yup.string().max(255).required('Tên bộ phận là bắt buộc!'),
        department_address: Yup.string().max(255).required('Địa chỉ bộ phận là bắt buộc!'),
        department_phone: Yup.string().max(255).required('Số điện thoại bộ phận là bắt buộc!'),
        department_email: Yup.string().max(255).required('Email bộ phận là bắt buộc!'),
        admin_name: Yup.string().max(255).required('Tên người quản trị là bắt buộc!'),
        admin_phone: Yup.string().max(255).required('Số điện thoại người quản trị là bắt buộc!'),
        admin_email: Yup.string().max(255).required('Email người quản trị là bắt buộc!')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const value = { value: values };
          const result = await dispatch(updateContactConfig(value));
          if (result && !result.error) {
            setStatus({ success: true });
            setSubmitting(false);
            dispatch(
              setContactDialog({
                open: false,
                init: values
              })
            );
            toast.success('Thay đổi thông tin thành công!');
          } else {
            setStatus({ success: false });
            setErrors(result.payload.errors);
            setSubmitting(false);
            toast.success('Có lỗi khi thay đổi thông tin!');
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
          toast.success('Có lỗi khi thay đổi thông tin!');
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Stack spacing={2}>
                  <InputField
                    id="department_name"
                    type="text"
                    value={values.department_name}
                    name="department_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập tên bộ phận"
                    label="Tên bộ phận"
                    fullWidth
                    error={Boolean(touched.department_name && errors.department_name)}
                    helperText={errors.department_name}
                  />
                  <Stack spacing={1}>
                    <InputLabel htmlFor="department_address">Địa chỉ bộ phận</InputLabel>
                    <OutlinedInput
                      id="department_address"
                      type="text"
                      value={values.department_address}
                      name="department_address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập địa chỉ bộ phận"
                      fullWidth
                      error={Boolean(touched.department_address && errors.department_address)}
                      multiline
                      maxRows={4}
                      variant="standard"
                    />
                    {touched.department_address && errors.department_address && (
                      <FormHelperText error id="standard-weight-helper-text-department_address-login">
                        {errors.department_address}
                      </FormHelperText>
                    )}
                  </Stack>
                  <InputField
                    id="department_phone"
                    type="text"
                    value={values.department_phone}
                    name="department_phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại bộ phận"
                    label="Số điện thoại bộ phận"
                    fullWidth
                    error={Boolean(touched.department_phone && errors.department_phone)}
                    helperText={errors.department_phone}
                  />
                  <InputField
                    id="department_email"
                    type="text"
                    value={values.department_email}
                    name="department_email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập email bộ phận"
                    label="Email bộ phận"
                    fullWidth
                    error={Boolean(touched.department_email && errors.department_email)}
                    helperText={errors.department_email}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={2}>
                  <InputField
                    id="admin_name"
                    type="text"
                    value={values.admin_name}
                    name="admin_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập tên quản trị viên"
                    label="Tên quản trị viên"
                    fullWidth
                    error={Boolean(touched.admin_name && errors.admin_name)}
                    helperText={errors.admin_name}
                  />
                  <InputField
                    id="admin_email"
                    type="text"
                    value={values.admin_email}
                    name="admin_email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập email quản trị viên"
                    label="Email quản trị viên"
                    fullWidth
                    error={Boolean(touched.admin_email && errors.admin_email)}
                    helperText={errors.admin_email}
                  />
                  <InputField
                    id="admin_phone"
                    type="text"
                    value={values.admin_phone}
                    name="admin_phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại quản trị viên"
                    label="Số điện thoại quản trị viên"
                    fullWidth
                    error={Boolean(touched.admin_phone && errors.admin_phone)}
                    helperText={errors.admin_phone}
                  />
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(setContactDialog({ open: false }))} variant="contained" color="error">
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              Cập nhật
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
};
