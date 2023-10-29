import React from 'react';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import InputField from 'components/input/InputField';
import { dispatch } from 'store/index';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'iconsax-react';
import QuillEditor from 'sections/admin/job-post/QuillEditor';
import { createJobPost } from 'store/slices/jobPostSlice';

const CreateJobPost = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography mb={2} variant="h4">
        Chỉnh sửa tin tuyển dụng
      </Typography>
      <MainCard sx={{ mb: 2 }}>
        <Formik
          initialValues={{
            job_post_title: '',
            job_post_desc: ''
          }}
          validationSchema={Yup.object().shape({
            job_post_title: Yup.string().max(255).required('Vui lòng nhập tiêu đề !'),
            job_post_desc: Yup.string().test('has-content', 'Vui lòng nhập nội dung bài viết.', (value) => {
              return !!value?.replace(/<[^>]*>/g, '');
            })
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            console.log(values);
            try {
              const result = await dispatch(createJobPost(values));
              if (result && !result.error) {
                setStatus({ success: true });
                setSubmitting(false);
                navigate('/admin/job-post');
                toast.success('Chỉnh sửa tin thành công!');
              } else {
                setStatus({ success: false });
                setErrors(result.payload.errors);
                setSubmitting(false);
                toast.error('Chỉnh sửa tin không thành công');
              }
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isSubmitting, setFieldValue, setFieldTouched }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <InputField
                    id="job_post_title"
                    type="text"
                    value={values.job_post_title}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập tiêu đề"
                    label="Tiêu đề"
                    fullWidth
                    error={Boolean(touched.job_post_title && errors.job_post_title)}
                    helperText={errors.job_post_title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={2}>
                    <InputLabel>Mô tả công việc</InputLabel>
                    <QuillEditor
                      value={values.job_post_desc}
                      onChange={(value) => setFieldValue('job_post_desc', value)}
                      onBlur={() => setFieldTouched('job_post_desc', true)}
                      error={!!(touched.job_post_desc && errors.job_post_desc)}
                    />
                    {!!(touched.job_post_desc && errors.job_post_desc) && <FormHelperText error>{errors.job_post_desc}</FormHelperText>}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ float: 'right' }}
                    endIcon={<ArrowRight />}
                  >
                    Đăng tin
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </MainCard>
    </>
  );
};

export default CreateJobPost;
