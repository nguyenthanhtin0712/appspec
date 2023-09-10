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
import CompanyList from 'sections/admin/internship-graduation/register_intern_create/CompanyList';
import { useNavigate } from 'react-router-dom';
import SelectField from 'components/input/SelectField';
import { createRegisterInternShip, getCompany, getUnregisteredInternshipGraduations } from 'store/reducers/createRegisterInternSlice';
import { useSelector } from 'react-redux';
import { formatDDMMYYYY, formatDateTimeSubmit } from 'utils/formatDateTime';

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
  const navigate = useNavigate();
  const { unregisteredGraduations, companySelected } = useSelector((state) => state.create_register_intern);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUnregisteredInternshipGraduations());
    };
    fetchData();
  }, []);

  return (
    <Formik
      initialValues={{
        register_internship_id: '',
        register_internship_start_date: null,
        register_internship_end_date: null,
        submit: null
      }}
      validationSchema={Yup.object().shape({
        register_internship_id: Yup.string().max(255).required('Đợt thực tập là bắt buộc !'),
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
        console.log(payload);
        try {
          const result = await dispatch(createRegisterInternShip(payload));
          if (result && !result.error) {
            setStatus({ success: true });
            setSubmitting(false);
            toast.success('Tạo đợt đăng ký thành công!');
            navigate('/admin/register_intern');
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
      {({ errors, handleBlur, handleSubmit, isSubmitting, touched, values, setFieldValue, setFieldError, setFieldTouched }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SelectField
                id="register_internship_id"
                labelId="register_internship_id_label"
                label="Đợt thực tập tốt nghiệp"
                value={values.register_internship_id}
                name="register_internship_id"
                error={Boolean(touched.register_internship_id && errors.register_internship_id)}
                helperText={errors.register_internship_id}
                onBlur={handleBlur}
                onChange={async (e) => {
                  setFieldValue('register_internship_id', e.target.value);
                  await dispatch(getCompany(e.target.value));
                }}
                list={unregisteredGraduations}
                itemValue="openclass_time_id"
                getOptionLabel={(option) =>
                  `Học kỳ ${option.openclass_time_semester} - năm ${option.openclass_time_year} - Từ ${formatDDMMYYYY(
                    option.internship_graduation_start_date
                  )} đến ${formatDDMMYYYY(option.internship_graduation_end_date)}`
                }
                itemText="name"
              />
            </Grid>
            <Grid item xs={6}>
              <DateTimePickerField
                label="Thời gian bắt đầu"
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
                label="Thời gian kết thúc"
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
