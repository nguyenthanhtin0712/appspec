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
import { createJobholder, updateJobholder, getAllTitle, getAllAcademicField, setCloseDialog } from 'store/reducers/jobholderSlice';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputField from 'components/input/InputField';
import DatePickerField from 'components/input/DatePickerField';
import SelectField from 'components/input/SelectField';
import { IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Brush2 } from 'iconsax-react';
import dayjs from 'dayjs';

const gender = [
  { id: 0, name: 'Nam' },
  { id: 1, name: 'Nữ' }
];

const JobholderForm = ({ initialValues, action }) => {
  const dispatch = useDispatch();
  const { dataTitle, dataAcademicField } = useSelector((state) => state.jobholder);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([dispatch(getAllTitle()), dispatch(getAllAcademicField())]);
    };
    fetchData();
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch(setCloseDialog());
  }, [dispatch]);

  const validateAdd = Yup.object().shape({
    user_firstname: Yup.string().max(255).required('Họ sinh viên là bắt buộc!'),
    user_lastname: Yup.string().max(255).required('Tên sinh viên là bắt buộc!'),
    user_gender: Yup.string().max(255).required('Vui lòng chọn giới tính!'),
    user_email: Yup.string().max(255).required('Vui nhập email'),
    user_phone: Yup.string().max(255).required('Vui nhập số điện thoại'),
    user_birthday: Yup.date().typeError('Vui lòng nhập đầy đủ!').required('Thời gian bắt đầu là bắt buộc'),
    user_password: Yup.string().max(255).required('Vui lòng nhập mật khẩu'),
    jobholder_code: Yup.string().max(255).required('Mã viên chức là bắt buộc!'),
    jobholder_position: Yup.string().max(255).required('Vị trí việc làm là bắt buộc!'),
    jobholder_type: Yup.string().max(255).required('Loại giảng viên là bắt buộc!'),
    jobholder_unit: Yup.string().max(255).required('Đơn vị công tác là bắt buộc!'),
    jobholder_degree: Yup.string().max(255).required('Học vị là  là bắt buộc!'),
    jobholder_specialty: Yup.string().max(255).required('Chuyên ngành giảng viên là bắt buộc!'),
    title_id: Yup.string().max(255).required('Chức vụ là bắt buộc!'),
    academic_field_id: Yup.string().max(255).required('Bộ môn là bắt buộc!')
  });

  const validateUpdate = Yup.object().shape({
    user_firstname: Yup.string().max(255).required('Họ sinh viên là bắt buộc!'),
    user_lastname: Yup.string().max(255).required('Tên sinh viên là bắt buộc!'),
    user_gender: Yup.string().max(255).required('Vui lòng chọn giới tính!'),
    user_email: Yup.string().max(255).required('Vui nhập email'),
    user_phone: Yup.string().max(255).required('Vui nhập số điện thoại'),
    user_birthday: Yup.date().typeError('Vui lòng nhập đầy đủ!').required('Thời gian bắt đầu là bắt buộc'),
    jobholder_code: Yup.string().max(255).required('Mã viên chức là bắt buộc!'),
    jobholder_position: Yup.string().max(255).required('Vị trí việc làm là bắt buộc!'),
    jobholder_type: Yup.string().max(255).required('Loại giảng viên là bắt buộc!'),
    jobholder_unit: Yup.string().max(255).required('Đơn vị công tác là bắt buộc!'),
    jobholder_degree: Yup.string().max(255).required('Học vị là  là bắt buộc!'),
    jobholder_specialty: Yup.string().max(255).required('Chuyên ngành giảng viên là bắt buộc!'),
    title_id: Yup.string().max(255).required('Chức vụ là bắt buộc!'),
    academic_field_id: Yup.string().max(255).required('Bộ môn là bắt buộc!')
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={action == 'add' ? validateAdd : validateUpdate}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        const value = {
          ...values,
          jobholder_isLeader: values.jobholder_isLeader ? 1 : 0
        };
        console.log('value', value);
        try {
          const actionType = action === 'update' ? updateJobholder : createJobholder;
          const result = await dispatch(actionType(value));
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
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
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
                  />
                  <InputField
                    id="user_email"
                    type="text"
                    value={values.user_email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập email"
                    label="Email"
                    fullWidth
                    error={Boolean(touched.user_email && errors.user_email)}
                    helperText={errors.user_email}
                  />
                  <InputField
                    id="user_phone"
                    type="text"
                    value={values.user_phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    label="SDT"
                    fullWidth
                    error={Boolean(touched.user_phone && errors.user_phone)}
                    helperText={errors.user_phone}
                  />
                  <SelectField
                    id="user_gender"
                    labelId="user_gender_label"
                    label="Giới tính"
                    value={values.user_gender}
                    name="user_gender"
                    error={Boolean(touched.user_gender && errors.user_gender)}
                    helperText={errors.user_gender}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    list={gender}
                    itemValue="id"
                    itemText="name"
                  />

                  <DatePickerField
                    label="Ngày sinh"
                    id="user_birthday"
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    setFieldError={setFieldError}
                    error={!!(touched.user_birthday && errors.user_birthday)}
                    value={action == 'add' ? values.user_birthday : dayjs(dayjs(values.user_birthday).valueOf())}
                    helperText={errors.user_birthday}
                    fullWidth
                  />
                  <InputField
                    id="jobholder_position"
                    type="text"
                    value={values.jobholder_position}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập vị trí việc làm"
                    label="Vị trí việc làm"
                    error={Boolean(touched.jobholder_position && errors.jobholder_position)}
                    helperText={errors.jobholder_position}
                    fullWidth
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <InputField
                    id="jobholder_type"
                    type="text"
                    value={values.jobholder_type}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập loại giảng viên"
                    label="Loại giảng viên"
                    fullWidth
                    error={Boolean(touched.jobholder_type && errors.jobholder_type)}
                    helperText={errors.jobholder_type}
                  />
                  <InputField
                    id="jobholder_specialty"
                    type="text"
                    value={values.jobholder_specialty}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập chuyên ngành"
                    label="Chuyên ngành"
                    fullWidth
                    error={Boolean(touched.jobholder_specialty && errors.jobholder_specialty)}
                    helperText={errors.jobholder_specialty}
                  />
                  <InputField
                    id="jobholder_unit"
                    type="text"
                    value={values.jobholder_unit}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập đơn vị công tác"
                    label="Đơn vị"
                    fullWidth
                    error={Boolean(touched.jobholder_unit && errors.jobholder_unit)}
                    helperText={errors.jobholder_unit}
                  />
                  <InputField
                    id="jobholder_degree"
                    type="text"
                    value={values.jobholder_degree}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập học vị"
                    label="Học vị"
                    fullWidth
                    error={Boolean(touched.jobholder_degree && errors.jobholder_degree)}
                    helperText={errors.jobholder_degree}
                  />
                  <SelectField
                    id="academic_field_id"
                    name="academic_field_id"
                    labelId="academic_field_id_label"
                    label="Bộ môn"
                    value={dataAcademicField.length == 0 ? '' : values.academic_field_id}
                    error={Boolean(touched.academic_field_id && errors.academic_field_id)}
                    helperText={errors.academic_field_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    list={dataAcademicField}
                    itemValue="academic_field_id"
                    itemText="academic_field_name"
                  />
                  <SelectField
                    id="title_id"
                    labelId="title_id_label"
                    label="Chức vụ"
                    value={dataTitle.length == 0 ? '' : values.title_id}
                    name="title_id"
                    error={Boolean(touched.title_id && errors.title_id)}
                    helperText={errors.title_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    list={dataTitle}
                    itemValue="title_id"
                    itemText="title_name"
                  />
                  {action == 'add' && (
                    <Stack spacing={1} mb="10px">
                      <InputLabel htmlFor="user_password">Mật khẩu</InputLabel>
                      <OutlinedInput
                        id="user_password"
                        type="text"
                        value={values.user_password}
                        name="user_password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu"
                        fullWidth
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              component="span"
                              sx={{ p: '0' }}
                              onClick={() => {
                                setFieldValue('user_password', 'password');
                              }}
                            >
                              <Brush2 />
                            </IconButton>
                          </InputAdornment>
                        }
                        error={Boolean(touched.user_password && errors.user_password)}
                      />
                      {errors.user_password && <FormHelperText error>{errors.user_password}</FormHelperText>}
                    </Stack>
                  )}
                  {values.academic_field_id.length > 0 && (
                    <Box mt={2}>
                      <label htmlFor="jobholder_isLeader">Trưởng bộ môn</label>
                      <Switch
                        id="jobholder_isLeader"
                        name="jobholder_isLeader"
                        checked={values.jobholder_isLeader == 1}
                        onBlur={handleBlur}
                        onChange={(e) => setFieldValue('jobholder_isLeader', e.target.checked)}
                        inputProps={{ 'aria-label': 'Switch A' }}
                      />
                    </Box>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
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
    dispatch(setCloseDialog());
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
