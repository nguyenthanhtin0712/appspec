import React from 'react';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import { Formik } from 'formik';
import InputField from 'components/input/InputField';
import { dispatch } from 'store/index';
import { toast } from 'react-toastify';
import MarkDownEditor from 'sections/admin/page/MarkDownEditor';
import { Typography } from '@mui/material';
import { createPage } from 'store/reducers/pageSlice';
import { useNavigate } from 'react-router';
import slugify from 'slugify';
import { ArrowRight } from 'iconsax-react';

const CreatePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography mb={2} variant="h4">
        Tạo trang
      </Typography>
      <MainCard sx={{ mb: 2 }}>
        <Formik
          initialValues={{
            page_title: '',
            page_slug: '',
            page_content: ''
          }}
          validationSchema={Yup.object().shape({
            page_title: Yup.string().max(255).required('Tên trang là bắt buộc !'),
            page_slug: Yup.string().max(255).required('Đường đẫn là bắt buộc !')
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
                <Grid item xs={6}>
                  <InputField
                    id="page_title"
                    type="text"
                    value={values.page_title}
                    onBlur={(event) => {
                      setFieldTouched('page_title', true);
                      setFieldValue(
                        'page_slug',
                        slugify(event.target.value, {
                          lower: true,
                          locale: 'vi',
                          trim: true
                        })
                      );
                    }}
                    onChange={handleChange}
                    placeholder="Nhập tên trang"
                    label="Tên trang"
                    fullWidth
                    error={Boolean(touched.page_title && errors.page_title)}
                    helperText={errors.page_title}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputField
                    id="page_slug"
                    type="text"
                    value={values.page_slug}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập đường dẫn"
                    label="Đường dẫn"
                    fullWidth
                    error={Boolean(touched.page_slug && errors.page_slug)}
                    helperText={errors.page_slug}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MarkDownEditor value={values.page_content} onChange={({ text }) => setFieldValue('page_content', text)} />
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
                    Tạo trang
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

export default CreatePage;
