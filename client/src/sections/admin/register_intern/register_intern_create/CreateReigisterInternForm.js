import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import InputField from 'components/input/InputField';
import DateTimePickerField from 'components/input/DateTimePickerField';
import { dispatch } from 'store/index';
import { createRegisterSpecalty } from 'store/reducers/registerSpecialtyAdminSlice';
import { toast } from 'react-toastify';
import CompanyList from 'sections/admin/register_intern/register_intern_create/CompanyList';
import { useNavigate } from 'react-router-dom';

const CreateReigisterInternForm = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        register_specialty_name: '',
        register_specialty_start_date: null,
        register_specialty_end_date: null,
        submit: null
      }}
      validationSchema={Yup.object().shape({
        register_specialty_name: Yup.string().max(255).required('Tên đợt là bắt buộc !'),
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
          const result = await dispatch(createRegisterSpecalty({ values, data }));
          if (result && !result.error) {
            setStatus({ success: true });
            setSubmitting(false);
            toast.success('Tạo đợt đăng ký thành công!');
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
                error={!!(touched.register_specialty_name && errors.register_specialty_name)}
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
            <Grid item xs={12}>
              <CompanyList />
            </Grid>
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
                Tạo đợt đăng ký thực tập
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default CreateReigisterInternForm;
