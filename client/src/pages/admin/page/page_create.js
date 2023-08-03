import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputField from 'components/input/InputField';
import { dispatch } from 'store/index';
import { getAll } from 'store/reducers/majorSlice';
import { createRegisterSpecalty } from 'store/reducers/registerSpecialtyAdminSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import TinyEditor from 'components/TinyEditor';

const RegisterSpecialty = () => {
  const navigate = useNavigate();
  const [majorList, setMajorList] = useState([]);
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
        Tạo trang
      </Typography>
      <MainCard sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Formik
            initialValues={{
              register_specialty_name: '',
              register_specialty_course: ''
            }}
            validationSchema={Yup.object().shape({
              page_name: Yup.string().max(255).required('Tên trang là bắt buộc !'),
              page_link: Yup.string().max(255).required('Đường đẫn là bắt buộc !')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                const result = await dispatch(createRegisterSpecalty(values));
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
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <InputField
                      id="page_name"
                      type="text"
                      value={values.page_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập tên trang"
                      label="Tên trang"
                      fullWidth
                      error={Boolean(touched.page_name && errors.page_name)}
                      helperText={errors.page_name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField
                      id="page_link"
                      type="text"
                      value={values.page_link}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập đường dẫn"
                      label="Đường dẫn"
                      fullWidth
                      error={Boolean(touched.page_link && errors.page_link)}
                      helperText={errors.page_link}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TinyEditor />
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
