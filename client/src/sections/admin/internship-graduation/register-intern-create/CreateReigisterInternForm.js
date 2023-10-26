/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import DateTimePickerField from 'components/input/DateTimePickerField';
import { dispatch } from 'store/index';
import { toast } from 'react-toastify';
import CompanyList from 'sections/admin/internship-graduation/register-intern-create/CompanyList';
import { updateRegisterInternShip } from 'store/reducers/createRegisterInternSlice';
import { useSelector } from 'react-redux';
import { formatDateTimeSubmit } from 'utils/formatDateTime';
import dayjs from 'dayjs';

const cleanData = (companies, registerInternInfo) => {
  const companiesResult = companies.map(({ company_id, company_isInterview, positions }) => ({
    company_id,
    company_isInterview,
    positions: positions.map(({ position_id, position_quantity }) => ({
      position_id,
      position_quantity
    }))
  }));
  const payload = {
    ...registerInternInfo,
    register_internship_start_date: formatDateTimeSubmit(registerInternInfo.register_internship_start_date),
    register_internship_end_date: formatDateTimeSubmit(registerInternInfo.register_internship_end_date),
    companies: companiesResult
  };
  return payload;
};

const CreateReigisterInternForm = () => {
  const { companySelected, internshipGraduationInfo } = useSelector((state) => state.create_register_intern);
  const { internship_graduation_id, register_internship_start_date, register_internship_end_date } = internshipGraduationInfo;

  return (
    <Formik
      initialValues={{
        internship_graduation_id: internship_graduation_id,
        register_internship_start_date: register_internship_start_date ? dayjs(register_internship_start_date) : null,
        register_internship_end_date: register_internship_end_date ? dayjs(register_internship_end_date) : null,
        submit: null
      }}
      validationSchema={Yup.object().shape({
        register_internship_start_date: Yup.date()
          .typeError('Vui lòng nhập đầy đủ')
          .min(new Date(), 'Thời gian bắt đầu phải lớn hơn thời gian hiện tại')
          .required('Thời gian bắt đầu là bắt buộc'),
        register_internship_end_date: Yup.date()
          .typeError('Vui lòng nhập đầy đủ')
          .min(Yup.ref('register_internship_start_date'), 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu')
          .test('is-future-date', 'Thời gian kết thúc phải lớn hơn thời gian hiện tại', function (value) {
            return value === null || value > new Date();
          })
          .required('Thời gian kết thúc là bắt buộc')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        const payload = cleanData(companySelected, values);
        try {
          const result = await dispatch(updateRegisterInternShip(payload));
          if (result && !result.error) {
            setStatus({ success: true });
            setSubmitting(false);
            toast.success('Cập nhật đợt thực tập thành công!');
          } else {
            setStatus({ success: false });
            setErrors(result.payload.errors);
            setSubmitting(false);
            toast.error('Cập nhật đợt thực tập không thành công');
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleSubmit, isSubmitting, touched, values, setFieldValue, setFieldError, setFieldTouched }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <DateTimePickerField
                label="Thời gian bắt đầu đăng ký"
                id="register_internship_start_date"
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                error={!!(touched.register_internship_start_date && errors.register_internship_start_date)}
                value={values.register_internship_start_date}
                helperText={errors.register_internship_start_date}
                disablePast
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <DateTimePickerField
                label="Thời gian kết thúc đăng ký"
                id="register_internship_end_date"
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                error={!!(touched.register_internship_end_date && errors.register_internship_end_date)}
                value={values.register_internship_end_date}
                helperText={errors.register_internship_end_date}
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
                Cập nhật đợt thực tập
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default CreateReigisterInternForm;
