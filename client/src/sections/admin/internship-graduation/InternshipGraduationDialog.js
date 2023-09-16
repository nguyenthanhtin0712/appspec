import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { updateMajor } from 'store/reducers/majorSlice';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import InputField from 'components/input/InputField';
import DialogTitleCustom from 'components/DialogTitleCustom';
import { dispatch } from 'store/index';
import { closeInternshipGraduationDialog, createInternshipGraduation } from 'store/reducers/internshipGraduationSlice';
import DatePickerField from 'components/input/DatePickerField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const InternshipGraduationForm = ({ initialValues, action }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        openclass_semester: Yup.string().max(255).required('Học kỳ là bắt buộc !'),
        openclass_year: Yup.string().max(255).required('Năm học là bắt buộc !'),
        internship_graduation_start_date: Yup.date()
          .typeError('Vui lòng nhập đầy đủ')
          .min(new Date(), 'Thời gian bắt đầu phải lớn hơn thời gian hiện tại')
          .required('Thời gian bắt đầu là bắt buộc'),
        internship_graduation_end_date: Yup.date()
          .typeError('Vui lòng nhập đầy đủ')
          .min(Yup.ref('internship_graduation_start_date'), 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu')
          .test('is-future-date', 'Thời gian kết thúc phải lớn hơn thời gian hiện tại', function (value) {
            return value === null || value > new Date();
          })
          .required('Thời gian kết thúc là bắt buộc')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const actionType = action === 'update' ? updateMajor : createInternshipGraduation;
          const result = await dispatch(actionType(values));
          console.log(result);
          if (result && !result.error) {
            if (result.payload.status != 409) {
              setStatus({ success: true });
              setSubmitting(false);
              toast.success(action === 'update' ? 'Cập nhật thành công!' : 'Thêm thành công!');
            } else {
              toast.error('Đợt thực tập đã tồn tại');
            }
          } else {
            setStatus({ success: false });
            setErrors(result.payload.errors);
            setSubmitting(false);
            toast.error('Có lỗi xảy ra!');
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        setFieldTouched,
        setFieldValue,
        setFieldError
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <InputField
                  id="openclass_semester"
                  type="number"
                  value={values.openclass_semester}
                  name="openclass_semester"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập học kỳ"
                  label="Học kỳ"
                  fullWidth
                  error={Boolean(touched.openclass_semester && errors.openclass_semester)}
                  helperText={errors.openclass_semester}
                  disabled={action === 'update'}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  id="openclass_year"
                  type="number"
                  value={values.openclass_year}
                  name="openclass_year"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập năm học"
                  label="Năm học"
                  fullWidth
                  error={Boolean(touched.openclass_year && errors.openclass_year)}
                  helperText={errors.openclass_year}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePickerField
                  label="Ngày bắt đầu thực tập"
                  id="internship_graduation_start_date"
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  error={!!(touched.internship_graduation_start_date && errors.internship_graduation_start_date)}
                  value={
                    action == 'add'
                      ? values.internship_graduation_start_date
                      : dayjs(dayjs(values.internship_graduation_start_date).valueOf())
                  }
                  helperText={errors.internship_graduation_start_date}
                  disablePast
                />
              </Grid>
              <Grid item xs={6}>
                <DatePickerField
                  label="Ngày kết thúc thực tập"
                  id="internship_graduation_end_date"
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  error={!!(touched.internship_graduation_end_date && errors.internship_graduation_end_date)}
                  value={
                    action == 'add' ? values.internship_graduation_end_date : dayjs(dayjs(values.internship_graduation_end_date).valueOf())
                  }
                  helperText={errors.internship_graduation_end_date}
                  disablePast
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
            <Button onClick={() => dispatch(closeInternshipGraduationDialog())} variant="contained" color="error">
              Huỷ
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              {action === 'add' ? 'Thêm đợt' : 'Chỉnh sửa'}
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
};

const InternshipGraduationDialog = () => {
  const { internshipGraduationDialog } = useSelector((state) => state.internship_graduation);
  const { initValue, action } = internshipGraduationDialog;

  return (
    <Dialog open={internshipGraduationDialog.open} onClose={() => dispatch(closeInternshipGraduationDialog())} maxWidth="sm">
      <DialogTitleCustom onClose={() => dispatch(closeInternshipGraduationDialog())}>
        {action === 'add' ? 'Thêm đợt thực tập' : 'Chỉnh sửa đợt thực tập'}
      </DialogTitleCustom>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <InternshipGraduationForm initialValues={initValue} action={action} />
      </LocalizationProvider>
    </Dialog>
  );
};

export default InternshipGraduationDialog;
