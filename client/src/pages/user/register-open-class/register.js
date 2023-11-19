import React from 'react';
import Container from '@mui/material/Container';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import Button from '@mui/material/Button';
import AsyncAutocompleteField from 'components/input/AsyncAutocompleteField';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { getAllSubject, registerOpenClass } from 'store/slices/registerOpenClassSlice';
import InputField from 'components/input/InputField';
import SelectField from 'components/input/SelectField';
import InfoItem from 'sections/user/register_speciality/index/InfoItem';
import { Chart2, Task, Warning2 } from 'iconsax-react';
import { Box, Typography, useTheme } from '@mui/material';

const RegisterOpenClass = () => {
  const theme = useTheme();
  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <MainCard title="Đăng ký mở thêm lớp học cải thiện">
        <Stack direction="row" spacing={2} mb={3} alignItems="center">
          <Box>
            <Warning2 size="50" color={theme.palette.warning.main} variant="Bulk" />
          </Box>
          <Typography>
            Đăng ký mở thêm lớp học cải thiện nhằm mục đích để khoa thống kê số lượng và mở số nhóm học phần phù hợp, sinh viên cũng phải
            đăng ký học phần tại trang Thông tin đào tạo
          </Typography>
        </Stack>
        <Grid container spacing={2} mb={3}>
          <InfoItem
            href="/register-open-class/history"
            title="Danh sách môn đã đăng ký"
            icon={<Task variant="Bulk" size="32" color={theme.palette.primary.main} />}
          />
          <InfoItem
            href="/register-open-class/statistic"
            title="Thống kê số lượng đăng ký"
            icon={<Chart2 variant="Bulk" size="32" color={theme.palette.primary.main} />}
          />
        </Grid>
        <RegisterOpenClassForm />
      </MainCard>
    </Container>
  );
};

const RegisterOpenClassForm = () => {
  const subjects = useSelector((state) => state.register_open_class.subjects);

  return (
    <Grid item xs={12} md={8}>
      <Formik
        initialValues={{
          semester: '',
          year: new Date().getFullYear(),
          subject_id: null
        }}
        validationSchema={Yup.object().shape({
          semester: Yup.string().required('Học kỳ là bắt buộc !'),
          year: Yup.string().required('Năm học là bắt buộc !'),
          subject_id: Yup.object().nullable().required('Môn học là bắt buộc !')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          const data = { ...values, subject_id: values.subject_id.subject_id };
          try {
            const result = await dispatch(registerOpenClass(data));
            if (result && result.payload.status == 200) {
              toast.success('Đăng ký thành công!');
              setStatus({ success: true });
              setSubmitting(false);
              resetForm();
            } else {
              toast.error(result.payload.message);
              setStatus({ success: false });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <AsyncAutocompleteField
                    id="subject_id"
                    label="Học phần"
                    placeholder="Chọn học phần"
                    loading={subjects.isLoading}
                    options={subjects?.data}
                    value={values.subject_id || null}
                    fetchOptions={() => dispatch(getAllSubject())}
                    isOptionEqualToValue={(option, value) => option.subject_id === value.subject_id}
                    getOptionLabel={(option) => `${option.subject_id} - ${option.subject_name}`}
                    onChange={(event, newValue) => setFieldValue('subject_id', newValue)}
                    error={!!(touched.subject_id && errors.subject_id)}
                  />
                  {touched.subject_id && errors.subject_id && <FormHelperText error>{errors.subject_id}</FormHelperText>}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <SelectField
                  id="semester"
                  labelId="semester_label"
                  label="Học kỳ"
                  value={values.semester}
                  name="semester"
                  error={Boolean(touched.semester && errors.semester)}
                  helperText={errors.semester}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  list={[1, 2]}
                  getOptionLabel={(option) => `Học kỳ ${option}`}
                  getOptionValue={(option) => option}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  id="year"
                  type="text"
                  value={`${values.year} - ${values.year + 1}`}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập năm học"
                  label="Năm học"
                  fullWidth
                  error={Boolean(touched.year && errors.year)}
                  helperText={errors.year}
                  readOnly={true}
                />
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Đăng ký
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Grid>
  );
};

export default RegisterOpenClass;
