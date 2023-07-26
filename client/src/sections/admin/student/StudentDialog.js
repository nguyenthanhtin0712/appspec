import React, { memo, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { createStudent, setStudentDialog, updateStudent } from 'store/reducers/student';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { dispatch } from 'store/index';
import { Select, MenuItem, InputLabel } from '@mui/material';
import { fetchData } from '../../../store/reducers/major';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const StudentDialog = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { studentDialog } = useSelector((state) => state.student);
  const { data, columnFilters, globalFilter, sorting, pagination } = useSelector((state) => state.major);

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const handleClose = () => {
    setActiveTab(0);
    dispatch(
      setStudentDialog({
        open: false,
        initValue: {
          user_firstname: '',
          user_lastname: '',
          user_gender: '',
          user_birthday: null,
          student_course: '',
          major_id: ''
        }
      })
    );
  };

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Dialog open={studentDialog.open} onClose={handleClose} fullWidth maxWidth="md">
      <Tabs value={activeTab} onChange={handleChangeTab} sx={{ mb: '15px' }}>
        <Tab label="Thêm thủ công" />
        <Tab label="Thêm file" />
      </Tabs>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Formik
          initialValues={studentDialog.initValue}
          validationSchema={Yup.object().shape({
            student_course: Yup.number('Vui lòng nhập số').required('Vui lòng nhập khóa của sinh viên!'),
            student_code: Yup.string().max(255).required('Vui lòng nhập mã số sinh viên!'),
            user_firtname: Yup.string().max(255).required('Họ sinh viên là bắt buộc !'),
            user_lastname: Yup.string().max(255).required('Tên sinh viên là bắt buộc !'),
            major_id: Yup.string().max(255).required('Vui lòng chọn ngành !'),
            user_gender: Yup.string().max(255).required('Vui giới tính !'),
            user_birthday: Yup.date().typeError('Vui lòng nhập đầy đủ!'),
            student_class: Yup.string().required('Vui lòng nhập lớp!')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            switch (studentDialog.action) {
              case 'add':
                try {
                  const result = await dispatch(createStudent(values));
                  if (result && !result.error) {
                    setStatus({ success: true });
                    setSubmitting(false);
                    toast.success('Thêm sinh viên thành công!');
                  } else {
                    setStatus({ success: false });
                    setErrors({ submit: result.error.message });
                    setSubmitting(false);
                    toast.error('Có lỗi xảy ra khi thêm sinh viên!');
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
                    toast.success('Sửa sinh viên thành công!');
                  } else {
                    setStatus({ success: false });
                    setErrors({ submit: result.error.message });
                    setSubmitting(false);
                    toast.error('Có lỗi xảy ra khi Sửa sinh viên!');
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
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, setFieldTouched }) => (
            <form noValidate onSubmit={handleSubmit}>
              <DialogContent>
                {activeTab == 0 && (
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
                          placeholder="Nhập mã số sinh viên"
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
                      <Stack spacing={1}>
                        <InputLabel htmlFor="user_birthday">Ngày sinh</InputLabel>
                        <DatePicker
                          id="user_birthday"
                          onChange={(value) => {
                            setFieldValue('user_birthday', value);
                            setFieldTouched('user_birthday', true);
                          }}
                          disablePast
                          value={values.user_birthday}
                          displayEmpty
                          fullWidth
                          inputProps={{ 'aria-label': 'Without label' }}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack spacing={1} sx={{ mb: '10px' }}>
                        <InputLabel htmlFor="student_class">Lớp</InputLabel>
                        <OutlinedInput
                          id="student_class"
                          type="number"
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
                )}
                {activeTab == 1 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1} sx={{ mb: '10px' }}>
                        <InputLabel htmlFor="password_student">Nhập mật khẩu</InputLabel>
                        <OutlinedInput
                          id="password_student"
                          type="text"
                          value={values.password_student}
                          name="password_student"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Nhập mật khẩu cho sinh viên"
                          fullWidth
                          error={Boolean(touched.password_student && errors.password_student)}
                        />
                        {touched.password_student && errors.password_student && (
                          <FormHelperText error id="standard-weight-helper-text-password_student">
                            {errors.password_student}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1} sx={{ mb: '10px' }}>
                        <InputLabel htmlFor="file_student">Chọn file</InputLabel>
                        <OutlinedInput
                          id="file_student"
                          type="file"
                          value={values.file_student}
                          name="file_student"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Chọn file"
                          fullWidth
                          error={Boolean(touched.file_student && errors.file_student)}
                        />
                        {touched.file_student && errors.file_student && (
                          <FormHelperText error id="standard-weight-helper-text-file_student">
                            {errors.file_student}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                )}
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose} variant="contained" color="error">
                  Cancel
                </Button>
                <Button variant="contained" type="submit" disabled={isSubmitting}>
                  {studentDialog.action === 'add' ? 'Thêm sinh viên' : 'Chỉnh sửa'}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </LocalizationProvider>
    </Dialog>
  );
};

export default memo(StudentDialog);
