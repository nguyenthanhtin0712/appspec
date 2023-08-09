import React, { useState } from 'react';
import { Box, FormHelperText, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import SelectField from 'components/input/SelectField';

const ConfigPage = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <MainCard>
        <Typography variant="h4" mb={3}>
          Cấu hình
        </Typography>
        <Stack spacing={3}>
          <Box onClick={() => setOpen(true)} sx={{ cursor: 'pointer' }}>
            <Typography fontSize={16}>Đăng ký chuyên ngành</Typography>
            <Typography color="#00000085" gutterBottom>
              Đăng ký chuyên ngành khóa 21
            </Typography>
          </Box>
          <Box>
            <Typography fontSize={16}>Đăng ký thực tập</Typography>
            <Typography color="#00000085" gutterBottom>
              Đăng ký thực tập học kỳ 2, năm học 2022 - 2023
            </Typography>
          </Box>
        </Stack>
      </MainCard>
      <SpecialtyDisplayDialog open={open} handleClose={handleClose} />
    </>
  );
};

const data = [
  {
    register_specialty_id: 1,
    register_specialty_name: 'Đăng ký chuyên ngành khóa 21',
    register_specialty_start_date: '2023-08-08 07:55:00',
    register_specialty_end_date: '2023-08-31 00:00:00',
    register_specialty_isDelete: 0
  },
  {
    register_specialty_id: 3,
    register_specialty_name: 'Đăng ký chuyên ngành khóa 22',
    register_specialty_start_date: '2023-08-08 12:15:00',
    register_specialty_end_date: '2023-08-31 00:00:00',
    register_specialty_isDelete: 0
  }
];

const SpecialtyDisplayDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Chọn đợt đăng ký chuyên ngành</DialogTitle>
      <Formik
        initialValues={{
          register_specialty: ''
        }}
        validationSchema={Yup.object().shape({
          register_specialty: Yup.string().max(255).required('Vui lòng chọn đợt đăng ký !')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log(values);
            setStatus({ success: true });
            setSubmitting(false);
            toast.success('Lưu thành công!');
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
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <SelectField
                    id="register_specialty"
                    labelId="register_specialty"
                    name="register_specialty"
                    label="Chọn đợt đăng ký"
                    value={values.register_specialty}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.register_specialty && errors.register_specialty)}
                    helperText={errors.register_specialty}
                    list={data}
                    itemValue="register_specialty_id"
                    itemText="register_specialty_name"
                    fullWidth
                  />
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Lưu
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ConfigPage;
