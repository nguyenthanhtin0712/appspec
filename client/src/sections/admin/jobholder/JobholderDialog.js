/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo, useMemo, useCallback, useEffect } from 'react';
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
import {
  createJobholder,
  setJobholderDialog,
  updateJobholder,
  getAllDegree,
  getAllTitle,
  getAllAcademicField
} from 'store/reducers/jobholderSlice';
import { Select, MenuItem, InputLabel, Switch, Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputField from 'components/input/InputField';

const JobholderForm = ({ initialValues, action }) => {
  const dispatch = useDispatch();
  const { dataDegree, dataTitle, dataAcademicField } = useSelector((state) => state.jobholder);
  useEffect(() => {
    dispatch(getAllDegree({}));
    dispatch(getAllTitle({}));
    dispatch(getAllAcademicField({}));
  }, [dispatch, initialValues]);
  const handleClose = useCallback(() => {
    dispatch(
      setJobholderDialog({
        open: false,
        initValue: {
          user_firstname: '',
          user_lastname: '',
          user_gender: '',
          user_birthday: null,
          user_password: '',
          jobholder_code: '',
          degree_id: '',
          title_id: '',
          academic_field_id: '',
          jobholder_isLeader: false
        }
      })
    );
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        user_firstname: Yup.string().max(255).required('Họ sinh viên là bắt buộc!'),
        user_lastname: Yup.string().max(255).required('Tên sinh viên là bắt buộc!'),
        user_gender: Yup.string().max(255).required('Vui giới tính!'),
        user_birthday: Yup.date().typeError('Vui lòng nhập đầy đủ!').required('Thời gian bắt đầu là bắt buộc'),
        user_password: Yup.string().max(255).required('Vui lòng nhập mật khẩu'),
        jobholder_code: Yup.string().max(255).required('Mã viên chức là bắt buộc!'),
        degree_id: Yup.string().max(255).required('Học vị là bắt buộc!'),
        title_id: Yup.string().max(255).required('Chức vụ là bắt buộc!'),
        academic_field_id: Yup.string().max(255).required('Bộ môn là bắt buộc!')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        values.jobholder_isLeader = values.jobholder_isLeader ? 1 : 0;
        console.log('values', values);
        try {
          const actionType = action === 'update' ? updateJobholder : createJobholder;
          const result = await dispatch(actionType(values));
          if (result && !result.error) {
            setStatus({ success: true });
            setSubmitting(false);
            toast.success(action === 'update' ? 'Sửa viên chức thành công!' : 'Thêm viên chức thành công!');
          } else {
            setStatus({ success: false });
            setErrors(result.payload.errors);
            setSubmitting(false);
            toast.error(action === 'update' ? 'Có lỗi xảy ra khi Sửa viên chức!' : 'Có lỗi xảy ra khi thêm viên chức!');
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
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
        setFieldTouched,
        setFieldValue,
        setFieldError
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <InputField
                  id="jobholder_code"
                  type="text"
                  value={values.jobholder_code}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập mã viên chức"
                  label="Mã viên chức"
                  fullWidth
                  error={Boolean(touched.jobholder_code && errors.jobholder_code)}
                  helperText={errors.jobholder_code}
                  mb="10px"
                />
                <InputField
                  id="user_firstname"
                  type="text"
                  value={values.user_firstname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập họ"
                  label="Họ"
                  fullWidth
                  error={Boolean(touched.user_firstname && errors.user_firstname)}
                  helperText={errors.user_firstname}
                  mb="10px"
                />
                <InputField
                  id="user_lastname"
                  type="text"
                  value={values.user_lastname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập tên"
                  label="Tên"
                  fullWidth
                  error={Boolean(touched.user_lastname && errors.user_lastname)}
                  helperText={errors.user_lastname}
                  mb="10px"
                />
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
                  {Boolean(touched.user_gender && errors.user_gender) && <FormHelperText error>{errors.user_gender}</FormHelperText>}
                </Stack>
                <Stack spacing={1} sx={{ mb: '10px' }}>
                  <InputLabel htmlFor="user_birthday">Ngày sinh</InputLabel>
                  <DatePicker
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
                <InputField
                  id="user_password"
                  type="password"
                  value={values.user_password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  label="Mật khẩu"
                  fullWidth
                  disabled={action == 'update' ? true : false}
                  error={Boolean(touched.user_password && errors.user_password)}
                  helperText={errors.user_password}
                  mb="10px"
                />
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1} sx={{ mb: '10px' }}>
                  <InputLabel htmlFor="academic_field_id">Chọn bộ môn</InputLabel>
                  <Select
                    labelId="academic_field_id"
                    id="academic_field_id"
                    name="academic_field_id"
                    value={values.academic_field_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    error={Boolean(touched.academic_field_id && errors.academic_field_id)}
                  >
                    <MenuItem value="" sx={{ color: 'text.secondary' }}>
                      Chọn bộ môn
                    </MenuItem>
                    {dataAcademicField?.length > 0 &&
                      dataAcademicField?.map((item) => (
                        <MenuItem key={item?.academic_field_id} value={item?.academic_field_id}>
                          {item?.academic_field_name}
                        </MenuItem>
                      ))}
                  </Select>
                  {Boolean(touched.academic_field_id && errors.academic_field_id) && (
                    <FormHelperText error>{errors.academic_field_id}</FormHelperText>
                  )}
                </Stack>
                <Stack spacing={1} sx={{ mb: '10px' }}>
                  <InputLabel htmlFor="degree_id">Chọn học vị</InputLabel>
                  <Select
                    labelId="degree_id"
                    id="degree_id"
                    name="degree_id"
                    value={values.degree_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    error={Boolean(touched.degree_id && errors.degree_id)}
                  >
                    <MenuItem value="" sx={{ color: 'text.secondary' }}>
                      Chọn học vị
                    </MenuItem>
                    {dataDegree?.length > 0 &&
                      dataDegree?.map((item) => (
                        <MenuItem key={item?.degree_id} value={item?.degree_id}>
                          {item?.degree_name}
                        </MenuItem>
                      ))}
                  </Select>
                  {Boolean(touched.degree_id && errors.degree_id) && <FormHelperText error>{errors.degree_id}</FormHelperText>}
                </Stack>
                <Stack spacing={1} sx={{ mb: '10px' }}>
                  <InputLabel htmlFor="title_id">Chọn chức vụ</InputLabel>
                  <Select
                    labelId="title_id"
                    id="title_id"
                    name="title_id"
                    value={values.title_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    error={Boolean(touched.title_id && errors.title_id)}
                  >
                    <MenuItem value="" sx={{ color: 'text.secondary' }}>
                      Chọn chức vụ
                    </MenuItem>
                    {dataTitle?.length > 0 &&
                      dataTitle?.map((item) => (
                        <MenuItem key={item?.title_id} value={item?.title_id}>
                          {item?.title_name}
                        </MenuItem>
                      ))}
                  </Select>
                  {Boolean(touched.title_id && errors.title_id) && <FormHelperText error>{errors.title_id}</FormHelperText>}
                </Stack>
                <Box mt={2}>
                  <label htmlFor="jobholder_isLeader">Trưởng phòng</label>
                  <Switch
                    id="jobholder_isLeader"
                    name="jobholder_isLeader"
                    value={values.jobholder_isLeader}
                    checked={values.jobholder_isLeader === 1}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'Switch A' }}
                  />
                </Box>
              </Grid>
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
              {action === 'add' ? 'Thêm viên chức' : 'Chỉnh sửa'}
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
    dispatch(
      setJobholderDialog({
        open: false,
        initValue: {
          user_firstname: '',
          user_lastname: '',
          user_gender: '',
          user_birthday: null,
          user_password: '',
          jobholder_code: '',
          degree_id: '',
          title_id: '',
          academic_field_id: '',
          jobholder_isLeader: false
        }
      })
    );
  };
  return (
    <Dialog open={jobholderDialog.open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitleCustom onClose={handleClose}>{action === 'add' ? 'Thêm viên chức' : 'Chỉnh sửa viên chức'}</DialogTitleCustom>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <JobholderForm initialValues={initialValues} action={action} />
      </LocalizationProvider>
    </Dialog>
  );
};

export default memo(JobholderDialog);
