import React, { memo, useMemo, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { closeSubjectDialog, createSubject, getAllAcademicFields, getAllSubject, updateSubject } from 'store/slices/subjectSlice';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import InputField from 'components/input/InputField';
import DialogTitleCustom from 'components/DialogTitleCustom';
import { dispatch } from 'store/index';
import SelectField from 'components/input/SelectField';
import AsyncAutocompleteField from 'components/input/AsyncAutocompleteField';

const SubjectForm = ({ initialValues, action }) => {
  const { academicFields, subjectPreviousOptions } = useSelector((state) => state.subject);

  useEffect(() => {
    dispatch(getAllAcademicFields());
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        subject_id: Yup.string().max(255).required('Mã học phần là bắt buộc !'),
        subject_name: Yup.string().max(255).required('Tên học phần là bắt buộc !'),
        subject_credit: Yup.number().required('Số tín chỉ là bắt buộc !'),
        subject_coeffcient: Yup.number().required('Hệ số là bắt buộc !'),
        subject_LT: Yup.number().required('Số tiết lý thuyết là bắt buộc !'),
        subject_BT: Yup.number().required('Số tiết bài tập là bắt buộc !'),
        subject_TH: Yup.number().required('Số tiết thực hành là bắt buộc !'),
        academic_field_id: Yup.string().required('Bộ môn là bắt buộc !')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        const payload = {
          ...values,
          subject_previous: values.subject_previous.map((subject) => subject.subject_id)
        };
        console.log(payload);
        try {
          const actionType = action === 'update' ? updateSubject : createSubject;
          const result = await dispatch(actionType(payload));
          if (result && !result.error) {
            setStatus({ success: true });
            setSubmitting(false);
            toast.success(action === 'update' ? 'Sửa học phần thành công!' : 'Thêm học phần thành công!');
          } else {
            setStatus({ success: false });
            setErrors(result.payload.errors);
            setSubmitting(false);
            toast.error(action === 'update' ? 'Có lỗi xảy ra khi Sửa học phần!' : 'Có lỗi xảy ra khi thêm học phần!');
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
        <form noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <InputField
                  id="subject_id"
                  type="text"
                  value={values.subject_id}
                  name="subject_id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập mã học phần"
                  label="Mã học phần"
                  fullWidth
                  error={Boolean(touched.subject_id && errors.subject_id)}
                  helperText={errors.subject_id}
                  readOnly={action == 'update'}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  id="subject_name"
                  type="text"
                  value={values.subject_name}
                  name="subject_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập tên học phần"
                  label="Tên học phần"
                  fullWidth
                  error={Boolean(touched.subject_name && errors.subject_name)}
                  helperText={errors.subject_name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  id="subject_credit"
                  type="number"
                  value={values.subject_credit}
                  name="subject_credit"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập số tín chỉ"
                  label="Số tín chỉ"
                  fullWidth
                  error={Boolean(touched.subject_credit && errors.subject_credit)}
                  helperText={errors.subject_credit}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  id="subject_coeffcient"
                  type="number"
                  value={values.subject_coeffcient}
                  name="subject_coeffcient"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập hệ số"
                  label="Hệ số"
                  fullWidth
                  error={Boolean(touched.subject_coeffcient && errors.subject_coeffcient)}
                  helperText={errors.subject_coeffcient}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  id="subject_LT"
                  type="number"
                  value={values.subject_LT}
                  name="subject_LT"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập số tiết lý thuyết"
                  label="Số tiết lý thuyết"
                  fullWidth
                  error={Boolean(touched.subject_LT && errors.subject_LT)}
                  helperText={errors.subject_LT}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  id="subject_TH"
                  type="number"
                  value={values.subject_TH}
                  name="subject_TH"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập số tiết thực hành"
                  label="Số tiết thực hành"
                  fullWidth
                  error={Boolean(touched.subject_TH && errors.subject_TH)}
                  helperText={errors.subject_TH}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  id="subject_BT"
                  type="number"
                  value={values.subject_BT}
                  name="subject_BT"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập số tiết bài tập"
                  label="Số tiết bài tập"
                  fullWidth
                  error={Boolean(touched.subject_BT && errors.subject_BT)}
                  helperText={errors.subject_BT}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectField
                  id="academic_field_id"
                  labelId="academic_field_id_label"
                  label="Bộ môn"
                  value={academicFields.length == 0 ? '' : values.academic_field_id}
                  name="academic_field_id"
                  error={Boolean(touched.academic_field_id && errors.academic_field_id)}
                  helperText={errors.academic_field_id}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  list={academicFields}
                  getOptionLabel={(option) => option.academic_field_name}
                  getOptionValue={(option) => option.academic_field_id}
                />
              </Grid>
              <Grid item xs={12}>
                <AsyncAutocompleteField
                  id="subject_previous"
                  label="Môn học trước"
                  placeholder="Chọn môn học trước"
                  loading={subjectPreviousOptions.isLoading}
                  options={subjectPreviousOptions?.data}
                  value={values.subject_previous}
                  fetchOptions={() => dispatch(getAllSubject())}
                  isOptionEqualToValue={(option, value) => option.subject_id === value.subject_id}
                  getOptionLabel={(option) => `${option.subject_id} - ${option.subject_name}`}
                  onChange={(event, newValue) => setFieldValue('subject_previous', newValue)}
                  disableCloseOnSelect
                  multiple
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
            <Button onClick={() => dispatch(closeSubjectDialog())} variant="contained" color="error">
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              {action === 'add' ? 'Thêm học phần' : 'Chỉnh sửa'}
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
};

const SubjectDialog = () => {
  const { subjectDialog } = useSelector((state) => state.subject);
  const initialValues = useMemo(() => subjectDialog.initValue, [subjectDialog.initValue]);
  const action = useMemo(() => subjectDialog.action, [subjectDialog.action]);

  const handleClose = () => {
    dispatch(closeSubjectDialog());
  };
  return (
    <Dialog open={subjectDialog.open} onClose={handleClose} maxWidth="sm">
      <DialogTitleCustom onClose={handleClose}>{action === 'add' ? 'Thêm học phần' : 'Chỉnh sửa học phần'}</DialogTitleCustom>
      <SubjectForm initialValues={initialValues} action={action} />
    </Dialog>
  );
};

export default memo(SubjectDialog);
