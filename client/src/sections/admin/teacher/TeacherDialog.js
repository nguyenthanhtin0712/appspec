import React, { memo, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { createTeacher, setTeacherDialog, updateTeacher } from 'store/reducers/teacherSlice';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { dispatch } from 'store/index';
import { Select, MenuItem, InputLabel, DialogTitle } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fetchData } from 'store/reducers/majorSlice';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import InputField from 'components/input/InputField';
import { DatePicker } from '@mui/x-date-pickers';

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
          teacher_code: '',
          teacher_name: '',
          teacher_phone: '',
          teacher_email: '',
          teacher_birthday: null,
          teacher_title: '',
          teacher_spec: '',
          teacher_unit: ''
        }
      })
    );
  };

  const StudentSchema = Yup.object().shape({
    teacher_code: Yup.string().required('Vui lòng nhập mã!'),
    teacher_name: Yup.string().required('Vui lòng nhập tên!'),
    teacher_phone: Yup.string().required('Vui lòng nhập số điện thoại!'),
    teacher_email: Yup.string().required('Vui lòng nhập email!'),
    teacher_birthday: Yup.date().typeError('Vui lòng nhập đầy đủ!').required('Ngày sinh là bắt buộc'),
    teacher_title: Yup.string().required('Vui lòng nhập trình độ!'),
    teacher_spec: Yup.string().required('Vui lòng chọn chuyên ngành!'),
    teacher_unit: Yup.string().required('Vui lòng nhập đơn vị!')
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
                  const result = await dispatch(createTeacher(values));
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
                  const result = await dispatch(updateTeacher({ id, student: values }));
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
                    <InputField
                      id="teacher_code"
                      type="text"
                      value={values.teacher_code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập mã giáo viên"
                      label="MAGV"
                      mb="8px"
                      fullWidth
                      error={Boolean(touched.teacher_code && errors.teacher_code)}
                      helperText={errors.teacher_code}
                    />
                    <InputField
                      id="teacher_name"
                      type="text"
                      value={values.teacher_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên"
                      label="Họ tên"
                      mb="8px"
                      fullWidth
                      error={Boolean(touched.teacher_name && errors.teacher_name)}
                      helperText={errors.teacher_name}
                    />
                    <InputField
                      id="teacher_phone"
                      type="text"
                      value={values.teacher_phone}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                      label="SDT"
                      fullWidth
                      mb="8px"
                      error={Boolean(touched.teacher_phone && errors.teacher_phone)}
                      helperText={errors.teacher_phone}
                    />
                    <InputField
                      id="teacher_email"
                      type="text"
                      value={values.teacher_email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập email"
                      label="Email"
                      fullWidth
                      mb="8px"
                      error={Boolean(touched.teacher_email && errors.teacher_email)}
                      helperText={errors.teacher_email}
                    />
                    <Stack spacing={1} sx={{ mb: '10px' }}>
                      <InputLabel htmlFor="teacher_birthday">Ngày sinh</InputLabel>
                      <DatePicker
                        id="teacher_birthday"
                        onChange={(value) => setFieldValue('teacher_birthday', value)}
                        onClose={() => setFieldTouched('teacher_birthday', true)}
                        value={values.teacher_birthday}
                        error={touched.teacher_birthday && errors.teacher_birthday}
                        onError={(newError) => setFieldError('teacher_birthday', newError)}
                        fullWidth
                      />
                      {touched.teacher_birthday && errors.teacher_birthday && (
                        <FormHelperText error>{errors.teacher_birthday}</FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <InputField
                      id="teacher_title"
                      type="text"
                      value={values.teacher_title}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập trình độ"
                      label="Trình độ"
                      fullWidth
                      mb="8px"
                      error={Boolean(touched.teacher_title && errors.teacher_title)}
                      helperText={errors.teacher_title}
                    />
                    <InputField
                      id="teacher_unit"
                      type="text"
                      value={values.teacher_unit}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập đơn vị"
                      label="Đơn vị"
                      mb="8px"
                      fullWidth
                      error={Boolean(touched.teacher_unit && errors.teacher_unit)}
                      helperText={errors.teacher_unit}
                    />
                    <Stack spacing={1} sx={{ mb: '10px' }}>
                      <InputLabel htmlFor="teacher_spec">Bộ môn</InputLabel>
                      <Select
                        labelId="teacher_spec"
                        id="teacher_spec"
                        name="teacher_spec"
                        value={values.teacher_spec}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        error={Boolean(touched.teacher_spec && errors.teacher_spec)}
                      >
                        <MenuItem value="" sx={{ color: 'text.secondary' }}>
                          Chọn bộ môn
                        </MenuItem>
                        {data.length > 0 &&
                          data.map((item) => (
                            <MenuItem key={item.major_id} value={item.major_id}>
                              {item.major_name}
                            </MenuItem>
                          ))}
                      </Select>
                      {Boolean(touched.teacher_spec && errors.teacher_spec) && <FormHelperText error>{errors.teacher_spec}</FormHelperText>}
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
