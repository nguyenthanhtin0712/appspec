import React from 'react';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import AnimateButton from 'components/@extended/AnimateButton';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const contact = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <MainCard>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7839.4039764983645!2d106.67124331235044!3d10.757435271212223!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7cc64087%3A0x84535ed662fecc27!2zS2hvYSBDw7RuZyBOZ2jhu4cgVGjDtG5nIFRpbg!5e0!3m2!1svi!2s!4v1689011178751!5m2!1svi!2s"
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              style={{ border: 'none' }}
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Grid>
          <InfoContact />
          <ContactForm />
        </Grid>
      </MainCard>
    </Container>
  );
};

const InfoContact = () => {
  return (
    <Grid item xs={12} md={4}>
      <Stack>
        <Box>
          <Typography variant="h4" gutterBottom>
            Khoa công nghệ thông tin
          </Typography>
          <Box>
            <p>
              <strong>Địa chỉ: </strong>Phòng D301, Số 273 An Dương Vương, Phường 3, Quận 5, TP. HCM
            </p>
            <p>
              <strong>Điện thoại: </strong>
              <Link href="tel:02838382664" underline="none">
                (028) 38382 664
              </Link>
            </p>
            <p>
              <strong>Email: </strong>
              <Link href="mailto:vpkcntt@sgu.edu.vn" underline="none">
                vpkcntt@sgu.edu.vn
              </Link>
            </p>
          </Box>
        </Box>
        <Box>
          <Typography variant="h4" gutterBottom>
            Quản trị viên website
          </Typography>
          <Box>
            <p>
              <strong>Họ tên: </strong>Nguyễn Thanh Sang
            </p>
            <p>
              <strong>Điện thoại: </strong>
              <Link href="tel:0366686557" underline="none">
                0366 686 557
              </Link>
            </p>
            <p>
              <strong>Email: </strong>
              <Link href="mailto:thanhsang@sgu.edu.vn" underline="none">
                thanhsang@sgu.edu.vn
              </Link>
            </p>
          </Box>
        </Box>
      </Stack>
    </Grid>
  );
};

const ContactForm = () => {
  return (
    <Grid item xs={12} md={8}>
      <MainCard>
        <Formik
          initialValues={{
            contact_fullname: '',
            contact_email: '',
            contact_phone: '',
            contact_content: ''
          }}
          validationSchema={Yup.object().shape({
            contact_fullname: Yup.string().max(255).required('Họ tên là bắt buộc !'),
            contact_email: Yup.string().email('Must be a valid email').max(255).required('Email là bắt buộc !'),
            contact_phone: Yup.number().required('Số điện thoại là bắt buộc'),
            contact_content: Yup.string().required('Nội dung là bắt buộc')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            console.log(values);
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
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="contact_fullname">Họ và tên</InputLabel>
                    <OutlinedInput
                      id="contact_fullname"
                      type="text"
                      value={values.contact_fullname}
                      name="contact_fullname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên"
                      fullWidth
                      error={Boolean(touched.contact_fullname && errors.contact_fullname)}
                    />
                    {touched.contact_fullname && errors.contact_fullname && (
                      <FormHelperText error id="standard-weight-helper-text-contact_fullname-login">
                        {errors.contact_fullname}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="contact_email">Địa chỉ email</InputLabel>
                    <OutlinedInput
                      id="contact_email"
                      type="email"
                      value={values.contact_email}
                      name="contact_email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập địa chỉ contact_email"
                      fullWidth
                      error={Boolean(touched.contact_email && errors.contact_email)}
                    />
                    {touched.contact_email && errors.contact_email && (
                      <FormHelperText error id="standard-weight-helper-text-contact_email-login">
                        {errors.contact_email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="contact_phone">Số điện thoại</InputLabel>
                    <OutlinedInput
                      id="contact_phone"
                      type="text"
                      value={values.contact_phone}
                      name="contact_phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                      fullWidth
                      error={Boolean(touched.contact_phone && errors.contact_phone)}
                    />
                    {touched.contact_phone && errors.contact_phone && (
                      <FormHelperText error id="standard-weight-helper-text-contact_phone-login">
                        {errors.contact_phone}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="contact_content">Nội dung</InputLabel>
                    <OutlinedInput
                      id="contact_content"
                      type="text"
                      value={values.contact_content}
                      name="contact_content"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập nội dung liên hệ"
                      fullWidth
                      error={Boolean(touched.contact_content && errors.contact_content)}
                      multiline
                      maxRows={4}
                      variant="standard"
                    />
                    {touched.contact_content && errors.contact_content && (
                      <FormHelperText error id="standard-weight-helper-text-contact_content-login">
                        {errors.contact_content}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Gửi liên hệ
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </MainCard>
    </Grid>
  );
};

export default contact;
