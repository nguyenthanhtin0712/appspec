import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SelectField from 'components/input/SelectField';
import InputField from 'components/input/InputField';
import DateTimePickerField from 'components/input/DateTimePickerField';
import { dispatch } from 'store/index';
import { getAll } from 'store/reducers/major';
import MajorContainerForm from 'sections/admin/register_specialty/create/MajorContainerForm';

const cource_list = () => {
  const currentYear = new Date().getFullYear();
  const fourMostRecentYears = Array.from({ length: 4 }, (_, index) => currentYear - index);
  return fourMostRecentYears;
};

const xulymang = (arr) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].specialties) {
      for (let j = 0; j < arr[i].specialties.length; j++) {
        result.push({
          specialty_id: arr[i].specialties[j].specialty_id,
          specialty_quantity: 0
        });
      }
    }
  }
  return result;
};

const RegisterSpecialty = () => {
  const [majorList, setMajorList] = useState([]);
  const years = cource_list();
  useEffect(() => {
    const fetch = async () => {
      const response = await dispatch(getAll());
      setMajorList(response.payload.data);
    };
    fetch();
  }, []);
  if (majorList.length == 0) {
    return;
  }
  return (
    <>
      <Typography variant="h4" component="h1" mb={2}>
        Tạo đợt đăng ký chuyên ngành
      </Typography>
      <MainCard sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Formik
            initialValues={{
              register_specialty_name: '',
              register_specialty_course: '',
              register_specialty_start_date: null,
              register_specialty_end_date: null,
              submit: null,
              register_specialty_detail: xulymang(majorList)
            }}
            validationSchema={Yup.object().shape({
              register_specialty_name: Yup.string().max(255).required('Tên đợt là bắt buộc !'),
              register_specialty_course: Yup.string().max(255).required('Khóa là bắt buộc !'),
              register_specialty_start_date: Yup.date()
                .typeError('Vui lòng nhập đầy đủ')
                .min(new Date(), 'Thời gian bắt đầu phải lớn hơn thời gian hiện tại')
                .required('Thời gian bắt đầu là bắt buộc'),
              register_specialty_end_date: Yup.date()
                .typeError('Vui lòng nhập đầy đủ')
                .min(Yup.ref('register_specialty_start_date'), 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu')
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
                      id="register_specialty_name"
                      type="text"
                      value={values.register_specialty_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập tên đợt đăng ký"
                      label="Tên đợt đăng ký"
                      fullWidth
                      error={Boolean(touched.register_specialty_name && errors.register_specialty_name)}
                      helperText={errors.register_specialty_name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectField
                      id="register_specialty_course"
                      label="Khóa được phép đăng ký"
                      labelId="register_specialty_course_label"
                      value={values.register_specialty_course}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.register_specialty_course && errors.register_specialty_course)}
                      helperText={errors.register_specialty_course}
                      list={years}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePickerField
                      label="Thời gian bắt đầu"
                      id="register_specialty_start_date"
                      onChange={(value) => setFieldValue('register_specialty_start_date', value)}
                      onClose={() => setFieldTouched('register_specialty_start_date', true)}
                      onError={(newError) => setFieldError('register_specialty_start_date', newError)}
                      error={touched.register_specialty_start_date && errors.register_specialty_start_date}
                      value={values.register_specialty_start_date}
                      helperText={errors.register_specialty_start_date}
                      disablePast
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePickerField
                      label="Thời gian kết thúc"
                      id="register_specialty_end_date"
                      onChange={(value) => setFieldValue('register_specialty_end_date', value)}
                      onClose={() => setFieldTouched('register_specialty_end_date', true)}
                      onError={(newError) => setFieldError('register_specialty_end_date', newError)}
                      error={touched.register_specialty_end_date && errors.register_specialty_end_date}
                      value={values.register_specialty_end_date}
                      helperText={errors.register_specialty_end_date}
                      disablePast
                      fullWidth
                    />
                  </Grid>
                  {majorList && <MajorContainerForm majorList={majorList} values={values} setFieldValue={setFieldValue} />}
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

export default RegisterSpecialty;
