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
import InputField from 'components/input/InputField';
import DateTimePickerField from 'components/input/DateTimePickerField';
import { dispatch } from 'store/index';
import { getAll } from 'store/reducers/majorSlice';
import { getRegisterSpecalty } from 'store/reducers/registerSpecialtyAdminSlice';
import MajorContainerForm from 'sections/admin/register_specialty/register-specialty-create/MajorContainerForm';
import { updateRegisterSpecalty } from 'store/reducers/registerSpecialtyAdminSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const xulydata = (arr) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let data = arr[i]['specialties'];
    result = [...result, ...data];
  }
  return result;
};

const RegisterSpecialtyEdit = () => {
  const { id } = useParams();
  const { isLoading } = useSelector((state) => state.register_specialty);
  const navigate = useNavigate();
  const [majorList, setMajorList] = useState([]);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const response = await dispatch(getAll());
      setMajorList(response.payload.data);
      const specialtyData = await dispatch(getRegisterSpecalty(id));
      setData(specialtyData.payload.data);
    };
    fetch();
  }, [id]);
  if (majorList.length == 0 || data == null) {
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
              register_specialty_name: data?.register_specialty_name || '',
              register_specialty_start_date: dayjs(dayjs(data?.register_specialty_start_date).valueOf()) || null,
              register_specialty_end_date: dayjs(dayjs(data?.register_specialty_end_date).valueOf()) || null,
              submit: null,
              register_specialty_detail: xulydata(data.register_specialty_detail)
            }}
            validationSchema={Yup.object().shape({
              register_specialty_name: Yup.string().max(255).required('Tên đợt là bắt buộc !'),
              register_specialty_start_date: Yup.date().typeError('Vui lòng nhập đầy đủ').required('Thời gian bắt đầu là bắt buộc'),
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
                console.log(values);
                const result = await dispatch(updateRegisterSpecalty({ values, id }));
                if (result && !result.error) {
                  setStatus({ success: true });
                  setSubmitting(false);
                  toast.success('Cập nhật đợt đăng ký thành công!');
                  navigate('/admin/register_specialty');
                } else {
                  setStatus({ success: false });
                  setErrors(result.payload.errors);
                  setSubmitting(false);
                  toast.error('Tạo đợt đăng ký không thành công');
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
              setFieldValue,
              setFieldError,
              setFieldTouched
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
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
                    <DateTimePickerField
                      label="Thời gian bắt đầu"
                      id="register_specialty_start_date"
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      setFieldError={setFieldError}
                      error={!!(touched.register_specialty_start_date && errors.register_specialty_start_date)}
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
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      setFieldError={setFieldError}
                      error={!!(touched.register_specialty_end_date && errors.register_specialty_end_date)}
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
                      Cập nhật
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
          {isLoading && (
            <Backdrop sx={{ color: '#fff', zIndex: 2000 }} open={isLoading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </LocalizationProvider>
      </MainCard>
    </>
  );
};

export default RegisterSpecialtyEdit;
