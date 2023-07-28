/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { RecordCircle } from 'iconsax-react';
import { useTheme } from '@mui/material/styles';
import SelectField from 'components/input/SelectField';
import InputField from 'components/input/InputField';
import DateTimePickerField from 'components/input/DateTimePickerField';
import { dispatch } from 'store/index';
import { getAll } from 'store/reducers/major';

// const cource_list = () => {
//   let year = new Date().getFullYear();
// };

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
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              setFieldValue,
              setFieldError,
              setFieldTouched
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <InputField
                      id="registration_name"
                      type="text"
                      value={values.registration_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập tên đợt đăng ký"
                      label="Tên đợt đăng ký"
                      fullWidth
                      error={Boolean(touched.registration_name && errors.registration_name)}
                      helperText={errors.registration_name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectField
                      id="cource_accept"
                      label="Khóa được phép đăng ký"
                      labelId="cource_accept_label"
                      value={values.cource_accept}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.cource_accept && errors.cource_accept)}
                      helperText={errors.cource_accept}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePickerField
                      label="Thời gian bắt đầu"
                      id="start_time"
                      onChange={(value) => setFieldValue('start_time', value)}
                      onClose={() => setFieldTouched('start_time', true)}
                      onError={(newError) => setFieldError('start_time', newError)}
                      error={touched.start_time && errors.start_time}
                      value={values.start_time}
                      helperText={errors.start_time}
                      disablePast
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePickerField
                      label="Thời gian kết thúc"
                      id="end_time"
                      onChange={(value) => setFieldValue('end_time', value)}
                      onClose={() => setFieldTouched('end_time', true)}
                      onError={(newError) => setFieldError('end_time', newError)}
                      error={touched.end_time && errors.end_time}
                      value={values.end_time}
                      helperText={errors.end_time}
                      disablePast
                      fullWidth
                    />
                  </Grid>
                  <MajorContainerForm />
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

const MajorContainerForm = () => {
  const [majorList, setMajorList] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await dispatch(getAll());
      console.log('fetching...');
      setMajorList(response.payload.data);
    };
    fetch();
  }, []);
  console.log(majorList);
  if (!majorList) return null;
  return (
    <Grid item xs={12} sx={{ display: 'flex', gap: 3, alignItems: 'stretch' }}>
      {majorList.map((major) => {
        if (major.specialties.length > 0) {
          return <MajorSelector key={major.major_id} major={major}></MajorSelector>;
        }
      })}
    </Grid>
  );
};

const MajorSelector = ({ major }) => {
  // eslint-disable-next-line no-unused-vars
  const [checked, setChecked] = useState(Array(major.specialties.length).fill(0));
  const theme = useTheme();
  return (
    <Grid item xs={6}>
      <MainCard sx={{ height: '100%' }}>
        <Stack direction="row" spacing={1} mb={2}>
          <Typography variant="h5">Ngành {major.major_name}</Typography>
        </Stack>
        <Stack spacing={2} direction="column">
          {major.specialties.length > 0 &&
            major.specialties.map((item) => (
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
