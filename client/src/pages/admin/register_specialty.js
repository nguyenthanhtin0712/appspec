import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { RecordCircle } from 'iconsax-react';
import { useTheme } from '@mui/material/styles';

const major_list = [
  {
    major_id: 1,
    major_name: 'Công nghệ thông tin',
    children: [
      {
        specialty_id: 1,
        specialty_name: 'Kỹ thuật phần mềm'
      },
      {
        specialty_id: 2,
        specialty_name: 'Hệ thống thông tin'
      },
      {
        specialty_id: 3,
        specialty_name: 'Kỹ thuật máy tính'
      },
      {
        specialty_id: 4,
        specialty_name: 'Khoa học máy tính'
      }
    ]
  },
  {
    major_id: 2,
    major_name: 'Kỹ thuật phần mềm',
    children: [
      {
        specialty_id: 5,
        specialty_name: 'Lập trình web'
      },
      {
        specialty_id: 6,
        specialty_name: 'Lập trình ứng dụng'
      }
    ]
  }
];

const RegisterSpecialty = () => {
  return (
    <>
      <Typography variant="h4" component="h1" mb={2}>
        Tạo đợt đăng ký chuyên ngành
      </Typography>
      <MainCard sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Formik
            initialValues={{
              registration_name: '',
              cource_accept: '',
              start_time: null,
              end_time: null,
              submit: null
            }}
            validationSchema={Yup.object().shape({
              registration_name: Yup.string().max(255).required('Tên đợt là bắt buộc !'),
              cource_accept: Yup.string().max(255).required('Khóa là bắt buộc !'),
              start_time: Yup.date()
                .typeError('Vui lòng nhập đầy đủ')
                .min(new Date(), 'Thời gian bắt đầu phải lớn hơn thời gian hiện tại')
                .required('Thời gian bắt đầu là bắt buộc'),
              end_time: Yup.date()
                .typeError('Vui lòng nhập đầy đủ')
                .min(Yup.ref('start_time'), 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu')
                .test('is-future-date', 'Thời gian kết thúc phải lớn hơn thời gian hiện tại', function (value) {
                  return value === null || value > new Date();
                })
                .required('Thời gian kết thúc là bắt buộc')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                setStatus({ success: true });
                setSubmitting(false);
                console.log(values);
              } catch (err) {
                console.error(err);
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, setFieldTouched }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="registration_name">Tên đợt đăng ký</InputLabel>
                      <OutlinedInput
                        id="registration_name"
                        type="text"
                        value={values.registration_name}
                        name="registration_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Nhập tên đợt đăng ký"
                        fullWidth
                        error={Boolean(touched.registration_name && errors.registration_name)}
                      />
                      {touched.registration_name && errors.registration_name && (
                        <FormHelperText error id="standard-weight-helper-text-registration_name">
                          {errors.registration_name}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel id="cource_accept_label">Khóa được phép đăng ký</InputLabel>
                      <Select
                        labelId="cource_accept_label"
                        id="cource_accept"
                        type="text"
                        value={values.cource_accept}
                        name="cource_accept"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        error={Boolean(touched.cource_accept && errors.cource_accept)}
                      >
                        <MenuItem value="" sx={{ color: 'text.secondary' }}>
                          Chọn khóa được phép đăng ký
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      {touched.cource_accept && errors.cource_accept && (
                        <FormHelperText error id="standard-weight-helper-text-cource_accept">
                          {errors.cource_accept}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="start_time">Thời gian bắt đầu</InputLabel>
                      <DateTimePicker
                        id="start_time"
                        onChange={(value) => {
                          setFieldValue('start_time', value);
                          setFieldTouched('start_time', true);
                        }}
                        disablePast
                        value={values.start_time}
                        displayEmpty
                        fullWidth
                        inputProps={{ 'aria-label': 'Without label' }}
                        error={Boolean(touched.start_time && errors.start_time)}
                      />
                      {touched.start_time && errors.start_time && (
                        <FormHelperText error id="standard-weight-helper-text-start_time">
                          {errors.start_time}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="end_time">Thời gian kết thúc</InputLabel>
                      <DateTimePicker
                        id="end_time"
                        onChange={(value) => {
                          setFieldValue('end_time', value);
                          setFieldTouched('end_time', true);
                        }}
                        disablePast
                        value={values.end_time}
                        displayEmpty
                        fullWidth
                        inputProps={{ 'aria-label': 'Without label' }}
                        error={Boolean(touched.end_time && errors.end_time)}
                      />
                      {touched.end_time && errors.end_time && (
                        <FormHelperText error id="standard-weight-helper-text-end_time">
                          {errors.end_time}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  {major_list.map((major) => (
                    <MajorSelector key={major.major_id} major={major}></MajorSelector>
                  ))}
                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ float: 'right' }}
                    >
                      Tạo đợt đăng ký chuyên ngành
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </LocalizationProvider>
      </MainCard>
    </>
  );
};

const MajorSelector = ({ major }) => {
  // eslint-disable-next-line no-unused-vars
  const [checked, setChecked] = useState(Array(major.children.length).fill(0));
  const theme = useTheme();
  return (
    <Grid item xs={6}>
      <MainCard>
        <Stack direction="row" spacing={1} mb={2}>
          <Typography variant="h5">Ngành {major.major_name}</Typography>
        </Stack>
        <Stack spacing={2} direction="column">
          {major.children.length > 0 &&
            major.children.map((item) => (
              <Grid container key={item.specialty_id}>
                <Grid item sm={6} xs={12} sx={{ margin: 'auto 0' }}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <RecordCircle size="18" color={theme.palette.primary.main} variant="Bulk" />
                    <p>{item.specialty_name}</p>
                  </Stack>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <OutlinedInput type="number" size="small" placeholder="Nhập số lượng"></OutlinedInput>
                </Grid>
              </Grid>
            ))}
        </Stack>
      </MainCard>
    </Grid>
  );
};

export default RegisterSpecialty;
