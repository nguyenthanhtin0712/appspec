import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import SelectField from 'components/input/SelectField';
import { regsiterInternshipUser } from 'store/reducers/registerInternUserSlice';
import { dispatch } from 'store/index';
import { useNavigate } from 'react-router';

const RegisterInternsipForm = ({ companies }) => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);

  const handleChangeCompany = (company_id) => {
    setPositions(companies.find((company) => company.company_id === company_id).positions);
  };

  return (
    <Formik
      initialValues={{
        company_id: '',
        position_id: ''
      }}
      validationSchema={Yup.object().shape({
        company_id: Yup.string().max(255).required('Công ty là bắt buộc !'),
        position_id: Yup.string().max(255).required('Vị trí là bắt buộc !')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const result = await dispatch(regsiterInternshipUser(values));
          if (result) {
            toast.success('Đăng ký thực tập thành công');
            navigate('/register_intern/result');
          } else {
            setStatus({ success: false });
            setErrors(result.payload.errors);
            setSubmitting(false);
            toast.error('Đăng ký thực tập không thành công');
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleSubmit, isSubmitting, touched, values, setFieldTouched, setFieldValue }) => (
        <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <Grid container spacing={3}>
            <Grid item xs={7}>
              <SelectField
                id="company_id"
                labelId="company_id"
                name="company_id"
                label="Công ty thực tập"
                value={values.company_id}
                onChange={(e) => {
                  setFieldValue('company_id', e.target.value);
                  setFieldValue('position_id', '');
                  setFieldTouched('position_id', false);
                  handleChangeCompany(e.target.value);
                }}
                onBlur={handleBlur}
                error={Boolean(touched.company_id && errors.company_id)}
                helperText={errors.company_id}
                list={companies}
                itemValue="company_id"
                itemText="company_name"
                fullWidth
              />
            </Grid>
            <Grid item xs={5}>
              <SelectField
                id="position_id"
                labelId="position_id"
                name="position_id"
                label="Vị trí thực tập"
                value={values.position_id}
                onChange={(e) => {
                  const checkPosition = positions.find((position) => position.position_id === e.target.value);
                  if (checkPosition?.position_total_register >= checkPosition?.position_quantity) {
                    toast.warning('Vị trí của công ty đã đủ!');
                  } else {
                    setFieldValue('position_id', e.target.value);
                  }
                }}
                onBlur={handleBlur}
                error={Boolean(touched.position_id && errors.position_id)}
                helperText={errors.position_id}
                list={positions}
                itemValue="position_id"
                itemText="position_name"
                fullWidth
              />
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
          </Grid>
          <Button variant="contained" type="submit" disabled={isSubmitting} sx={{ alignSelf: 'flex-end', mt: 2 }}>
            Đăng ký
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default RegisterInternsipForm;
