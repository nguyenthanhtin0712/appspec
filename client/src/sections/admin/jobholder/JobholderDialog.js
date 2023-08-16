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
  updateJobholder,
  getAllDegree,
  getAllTitle,
  getAllAcademicField,
  setCloseDialog
} from 'store/reducers/jobholderSlice';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputField from 'components/input/InputField';
import DatePickerField from 'components/input/DatePickerField';
import SelectField from 'components/input/SelectField';
import CircularProgress from '@mui/material/CircularProgress';

const gender = [
  { id: 1, name: 'Nữ' },
  { id: 0, name: 'Nam' }
];

const JobholderForm = ({ initialValues, action }) => {
  const dispatch = useDispatch();
  const { dataDegree, dataTitle, dataAcademicField } = useSelector((state) => state.jobholder);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([dispatch(getAllDegree()), dispatch(getAllTitle()), dispatch(getAllAcademicField())]);
    };
    fetchData();
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch(setCloseDialog());
  }, [dispatch]);

  if (dataDegree.length == 0 || dataTitle.length == 0 || dataAcademicField.length == 0)
    return (
      <>
        <DialogContent sx={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </DialogContent>
      </>
    );

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
                    value={values.user_birthday}
                    helperText={errors.user_birthday}
                    fullWidth
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <SelectField
                    id="academic_field_id"
                    name="academic_field_id"
                    labelId="academic_field_id_label"
                    label="Bộ môn"
                    value={values.academic_field_id}
                    error={Boolean(touched.academic_field_id && errors.academic_field_id)}
                    helperText={errors.academic_field_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    list={dataAcademicField}
                    itemValue="academic_field_id"
                    itemText="academic_field_name"
                  />
                  <SelectField
                    id="degree_id"
                    labelId="degree_id_label"
                    label="Chức vụ"
                    value={values.degree_id}
                    name="degree_id"
                    error={Boolean(touched.degree_id && errors.degree_id)}
                    helperText={errors.degree_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    list={dataDegree}
                    itemValue="degree_id"
                    itemText="degree_name"
                  />

                  <SelectField
                    id="title_id"
                    labelId="title_id_label"
                    label="Học vị"
                    value={values.title_id}
                    name="title_id"
                    error={Boolean(touched.title_id && errors.title_id)}
                    helperText={errors.title_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    list={dataTitle}
                    itemValue="title_id"
                    itemText="title_name"
                  />

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
                  />
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
