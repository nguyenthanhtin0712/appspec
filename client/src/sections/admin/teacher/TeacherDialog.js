import React, { memo, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { createStudent, setTeacherDialog, updateStudent } from 'store/reducers/teacherSlice';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { dispatch } from 'store/index';
import { Select, MenuItem, InputLabel, DialogTitle } from '@mui/material';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fetchData } from 'store/reducers/majorSlice';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const TeacherDialog = () => {
  const { isLoading } = useSelector((state) => state.student);
  const { studentDialog } = useSelector((state) => state.teacher);
  const { data, columnFilters, globalFilter, sorting, pagination } = useSelector((state) => state.major);
  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const handleClose = () => {
    dispatch(
      setTeacherDialog({
        open: false,
        initValue: {
          user_firstname: '',
          user_lastname: '',
          user_gender: '',
          user_birthday: null,
          student_course: '',
          major_id: '',
          student_class: '',
          student_code: '',
          user_password: ''
        }
      })
    );
  };

  const StudentSchema = Yup.object().shape({
    student_course: Yup.number().typeError('Vui lòng nhập số').required('Vui lòng nhập khóa của giảng viên!'),
    student_code: Yup.string().max(255).required('Vui lòng nhập mã số giảng viên!'),
    user_firstname: Yup.string().max(255).required('Họ giảng viên là bắt buộc!'),
    user_lastname: Yup.string().max(255).required('Tên giảng viên là bắt buộc!'),
    major_id: Yup.string().max(255).required('Vui lòng chọn ngành!'),
    user_gender: Yup.string().max(255).required('Vui giới tính!'),
    user_birthday: Yup.date().typeError('Vui lòng nhập đầy đủ!').required('Thời gian bắt đầu là bắt buộc'),
    student_class: Yup.string().required('Vui lòng nhập lớp!'),
    user_password: Yup.string().max(255).required('Vui lòng nhập mật khẩu')
  });

  return (
    <Dialog open={studentDialog.open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Thêm giảng viên</DialogTitle>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Formik
          initialValues={studentDialog.initValue}
          validationSchema={StudentSchema}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            let data = values.user_birthday.$d;
            const dateObject = new Date(data);
            const year = dateObject.getFullYear();
            const month = String(dateObject.getMonth() + 1).padStart(2, '0');
            const day = String(dateObject.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            values.user_birthday = formattedDate;
            switch (studentDialog.action) {
              case 'add':
                try {
                  const result = await dispatch(createStudent(values));
                  if (result && !result.error) {
                    setStatus({ success: true });
                    setSubmitting(false);
                    toast.success('Thêm giảng viên thành công!');
                  } else {
                    setStatus({ success: false });
                    setErrors({ submit: result.error.message });
                    setSubmitting(false);
                    toast.error('Có lỗi xảy ra khi thêm giảng viên!');
                  }
                } catch (err) {
                  console.error(err);
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                }
                break;
              case 'update':
                try {
                  const id = studentDialog.initValue.student_id;
                  const result = await dispatch(updateStudent({ id, student: values }));
                  if (result && !result.error) {
                    setStatus({ success: true });
                    setSubmitting(false);
                    toast.success('Sửa giảng viên thành công!');
                  } else {
                    setStatus({ success: false });
                    setErrors({ submit: result.error.message });
                    setSubmitting(false);
                    toast.error('Có lỗi xảy ra khi Sửa giảng viên!');
                  }
                } catch (err) {
                  console.error(err);
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                }
                break;
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
            setFieldValue,
            setFieldTouched,
            setFieldError
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Stack spacing={1} sx={{ mb: '10px' }}>
                      <InputLabel htmlFor="student_code">MSSV</InputLabel>
                      <OutlinedInput
                        id="student_code"
                        type="text"
                        value={values.student_code}
                        name="student_code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Nhập mã số giảng viên"
                        fullWidth
                        error={Boolean(touched.student_code && errors.student_code)}
                      />
                      {touched.student_code && errors.student_code && (
                        <FormHelperText error id="standard-weight-helper-text-student_code">
                          {errors.student_code}
                        </FormHelperText>
                      )}
                    </Stack>
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
                        type="password"
                        value={values.user_password}
                        name="user_password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Mật khẩu"
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
                  <Grid item xs={6}>
                    <Stack spacing={1} sx={{ mb: '10px' }}>
                      <InputLabel htmlFor="student_class">Lớp</InputLabel>
                      <OutlinedInput
                        id="student_class"
                        type="text"
                        value={values.student_class}
                        name="student_class"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Nhập lớp"
                        fullWidth
                        error={Boolean(touched.student_class && errors.student_class)}
                      />
                      {touched.student_class && errors.student_class && (
                        <FormHelperText error id="standard-weight-helper-text-student_class">
                          {errors.student_class}
                        </FormHelperText>
                      )}
                    </Stack>
                    <Stack spacing={1} sx={{ mb: '10px' }}>
                      <InputLabel htmlFor="student_course">Khóa</InputLabel>
                      <OutlinedInput
                        id="student_course"
                        type="number"
                        value={values.student_course}
                        name="student_course"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Nhập khóa"
                        fullWidth
                        error={Boolean(touched.student_course && errors.student_course)}
                      />
                      {touched.student_course && errors.student_course && (
                        <FormHelperText error id="standard-weight-helper-text-student_course">
                          {errors.student_course}
                        </FormHelperText>
                      )}
                    </Stack>
                    <Stack spacing={1} sx={{ mb: '10px' }}>
                      <InputLabel htmlFor="major_id">Chọn ngành</InputLabel>
                      <Select
                        labelId="major_id"
                        id="major_id"
                        name="major_id"
                        value={values.major_id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        error={Boolean(touched.major_id && errors.major_id)}
                      >
                        <MenuItem value="" sx={{ color: 'text.secondary' }}>
                          Chọn ngành
                        </MenuItem>
                        {data.length > 0 &&
                          data.map((item) => (
                            <MenuItem key={item.major_id} value={item.major_id}>
                              {item.major_name}
                            </MenuItem>
                          ))}
                      </Select>
                      {Boolean(touched.major_id && errors.major_id) && <FormHelperText error>{errors.major_id}</FormHelperText>}
                    </Stack>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} variant="contained" color="error">
                  Cancel
                </Button>
                <Button variant="contained" type="submit" disabled={isSubmitting}>
                  {studentDialog.action === 'add' ? 'Thêm giảng viên' : 'Chỉnh sửa'}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </LocalizationProvider>
      {isLoading && (
        <Backdrop sx={{ color: '#fff', zIndex: 2000 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Dialog>
  );
};

export default memo(TeacherDialog);
