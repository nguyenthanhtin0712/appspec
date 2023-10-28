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
import { createPage } from 'store/slices/pageSlice';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'iconsax-react';
import QuillEditor from 'sections/admin/job-post/QuillEditor';

const CreateJobPost = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography mb={2} variant="h4">
        Đăng tin tuyển dụng
      </Typography>
      <MainCard sx={{ mb: 2 }}>
        <Formik
          initialValues={{
            page_title: '',
            page_content: ''
          }}
          validationSchema={Yup.object().shape({
            page_title: Yup.string().max(255).required('Tên trang là bắt buộc !'),
            page_content: Yup.string().test('has-content', 'Vui lòng nhập nội dung bài viết.', (value) => {
              return !!value?.replace(/<[^>]*>/g, '');
            })
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            console.log(values);
            try {
              const result = await dispatch(createPage(values));
              if (result && !result.error) {
                setStatus({ success: true });
                setSubmitting(false);
                navigate('/admin/page');
                toast.success('Tạo trang thành công!');
              } else {
                setStatus({ success: false });
                setErrors(result.payload.errors);
                setSubmitting(false);
                toast.error('Tạo trang không thành công');
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
                    id="page_title"
                    type="text"
                    value={values.page_title}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập tiêu đề"
                    label="Tiêu đề"
                    fullWidth
                    error={Boolean(touched.page_title && errors.page_title)}
                    helperText={errors.page_title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={2}>
                    <InputLabel>Mô tả công việc</InputLabel>
                    <QuillEditor
                      value={values.page_content}
                      onChange={(value) => setFieldValue('page_content', value)}
                      onBlur={() => setFieldTouched('page_content', true)}
                      error={!!(touched.page_content && errors.page_content)}
                    />
                    {!!(touched.page_content && errors.page_content) && <FormHelperText error>{errors.page_content}</FormHelperText>}
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
