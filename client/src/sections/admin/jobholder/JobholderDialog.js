import React, { memo, useMemo, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import DialogTitleCustom from 'components/DialogTitleCustom';
import { dispatch } from 'store/index';
import { createMajor, setJobholderDialog, updateMajor } from 'store/reducers/jobholderSlice';
import { Select, MenuItem, InputLabel } from '@mui/material';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';

const JobholderForm = ({ initialValues, action }) => {
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    dispatch(setJobholderDialog({ open: false, initValue: { major_id: '', major_name: '' } }));
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        user_firstname: Yup.string().max(255).required('Họ sinh viên là bắt buộc!'),
        user_lastname: Yup.string().max(255).required('Tên sinh viên là bắt buộc!'),
        user_gender: Yup.string().max(255).required('Vui giới tính!'),
        user_birthday: Yup.date().typeError('Vui lòng nhập đầy đủ!').required('Thời gian bắt đầu là bắt buộc'),
        user_password: Yup.string().max(255).required('Vui lòng nhập mật khẩu')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const actionType = action === 'update' ? updateMajor : createMajor;
          const result = await dispatch(actionType(values));
          if (result && !result.error) {
            setStatus({ success: true });
            setSubmitting(false);
            toast.success(action === 'update' ? 'Sửa ngành thành công!' : 'Thêm ngành thành công!');
          } else {
            setStatus({ success: false });
            setErrors(result.payload.errors);
            setSubmitting(false);
            toast.error(action === 'update' ? 'Có lỗi xảy ra khi Sửa ngành!' : 'Có lỗi xảy ra khi thêm ngành!');
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
              <Grid item xs={6}>
                <Stack spacing={1} sx={{ mb: '10px' }}>
                  <InputLabel htmlFor="user_firstname">Họ</InputLabel>
                  <OutlinedInput
                    id="user_firstname"
                    type="text"
                    value={values.user_firstname}
                    name="user_firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập họ"
                    fullWidth
                    error={Boolean(touched.user_firstname && errors.user_firstname)}
                  />
                  {touched.user_firstname && errors.user_firstname && (
                    <FormHelperText error id="standard-weight-helper-text-user_firstname">
                      {errors.user_firstname}
                    </FormHelperText>
                  )}
                </Stack>
                <Stack spacing={1} sx={{ mb: '10px' }}>
                  <InputLabel htmlFor="user_lastname">Tên</InputLabel>
                  <OutlinedInput
                    id="user_lastname"
                    type="text"
                    value={values.user_lastname}
                    name="user_lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập tên"
                    fullWidth
                    error={Boolean(touched.user_lastname && errors.user_lastname)}
                  />
                  {touched.user_lastname && errors.user_lastname && (
                    <FormHelperText error id="standard-weight-helper-text-user_lastname">
                      {errors.user_lastname}
                    </FormHelperText>
                  )}
                </Stack>
                <Stack spacing={1} sx={{ mb: '10px' }}>
                  <InputLabel htmlFor="user_gender" sx={{ mb: '5px' }}>
                    Chọn giới tính
                  </InputLabel>
                  <Select
                    labelId="user_gender"
                    id="user_gender"
                    name="user_gender"
                    value={values.user_gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    error={Boolean(touched.user_gender && errors.user_gender)}
                  >
                    <MenuItem value="" sx={{ color: 'text.secondary' }}>
                      Chọn giới tính
                    </MenuItem>
                    <MenuItem value="0">Nam</MenuItem>
                    <MenuItem value="1">Nữ</MenuItem>
                  </Select>
                  {Boolean(touched.user_gender && errors.user_gender) && <FormHelperText error>{errors.major_id}</FormHelperText>}
                </Stack>
                <Stack spacing={1} sx={{ mb: '10px' }}>
                  <InputLabel htmlFor="user_birthday">Ngày sinh</InputLabel>
                  <DatePicker
                    label="Ngày sinh"
                    id="user_birthday"
                    onChange={(value) => setFieldValue('user_birthday', value)}
                    onClose={() => setFieldTouched('user_birthday', true)}
                    value={values.user_birthday}
                    error={touched.user_birthday && errors.user_birthday}
                    onError={(newError) => setFieldError('user_birthday', newError)}
                    fullWidth
                  />
                  {touched.user_birthday && errors.user_birthday && <FormHelperText error>{errors.user_birthday}</FormHelperText>}
                </Stack>
                <Stack spacing={1} sx={{ mb: '10px' }}>
                  <InputLabel htmlFor="user_password">Mật khẩu</InputLabel>
                  <OutlinedInput
                    id="user_password"
                    type="text"
                    value={values.user_password}
                    name="user_password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Mật khẩu"
                    autoComplete="off"
                    fullWidth
                    error={Boolean(touched.user_password && errors.user_password)}
                  />
                  {touched.user_password && errors.user_password && (
                    <FormHelperText error id="standard-weight-helper-text-user_password">
                      {errors.user_password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}></Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="error">
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              {action === 'add' ? 'Thêm ngành' : 'Chỉnh sửa'}
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
};

const JobholderDialog = () => {
  const { jobholderDialog } = useSelector((state) => state.jobholder);
  const initialValues = useMemo(() => jobholderDialog.initValue, [jobholderDialog.initValue]);
  const action = useMemo(() => jobholderDialog.action, [jobholderDialog.action]);

  const handleClose = () => {
    dispatch(setJobholderDialog({ open: false, initValue: { major_id: '', major_name: '' } }));
  };
  return (
    <Dialog open={jobholderDialog.open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitleCustom onClose={handleClose}>{action === 'add' ? 'Thêm chuyên ngành' : 'Chỉnh sửa chuyên ngành'}</DialogTitleCustom>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <JobholderForm initialValues={initialValues} action={action} />
      </LocalizationProvider>
      {/* {isLoading && (
        <Backdrop sx={{ color: '#fff', zIndex: 2000 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )} */}
    </Dialog>
  );
};

export default memo(JobholderDialog);
