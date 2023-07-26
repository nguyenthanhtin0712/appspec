import React, { memo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { createMajor, setMajorDialog, updateMajor } from 'store/reducers/major';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import InputField from 'components/input/InputField';
import { dispatch } from 'store/index';
import DialogTitleCustom from 'components/DialogTitleCustom';

const MajorDialog = () => {
  const { majorDialog } = useSelector((state) => state.major);
  const handleClose = () => {
    dispatch(setMajorDialog({ open: false, initValue: { major_code: '', major_name: '' } }));
  };

  return (
    <Dialog open={majorDialog.open} onClose={handleClose} maxWidth="xs">
      <DialogTitleCustom onClose={handleClose}>
        {majorDialog.action === 'add' ? 'Thêm chuyên ngành' : 'Chỉnh sửa chuyên ngành'}
      </DialogTitleCustom>
      <Formik
        initialValues={majorDialog.initValue}
        validationSchema={Yup.object().shape({
          major_code: Yup.string().max(255).required('Mã ngành là bắt buộc !'),
          major_name: Yup.string().max(255).required('Tên ngành là bắt buộc !')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          switch (majorDialog.action) {
            case 'update':
              try {
                const id = majorDialog.initValue.major_id;
                const result = await dispatch(updateMajor({ id, major: values }));
                if (result && !result.error) {
                  setStatus({ success: true });
                  setSubmitting(false);
                  toast.success('Sửa ngành thành công!');
                } else {
                  setStatus({ success: false });
                  setErrors({ submit: result.error.message });
                  setSubmitting(false);
                  toast.error('Có lỗi xảy ra khi Sửa ngành!');
                }
              } catch (err) {
                console.error(err);
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
              break;
            case 'add':
              try {
                const result = await dispatch(createMajor(values));
                console.log(result);
                if (result && !result.error) {
                  setStatus({ success: true });
                  setSubmitting(false);
                  toast.success('Thêm ngành thành công!');
                } else {
                  setStatus({ success: false });
                  setErrors({ submit: result.error.message });
                  setSubmitting(false);
                  toast.error('Có lỗi xảy ra khi thêm ngành!');
                }
              } catch (err) {
                console.error(err);
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
              break;
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <InputField
                    id="major_code"
                    type="text"
                    value={values.major_code}
                    name="major_code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập mã ngành"
                    fullWidth
                    error={Boolean(touched.major_code && errors.major_code)}
                    helperText={errors.major_code}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    id="major_name"
                    type="text"
                    value={values.major_name}
                    name="major_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập tên ngành"
                    fullWidth
                    error={Boolean(touched.major_name && errors.major_name)}
                    helperText={errors.major_name}
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
              <Button onClick={handleClose} variant="contained" color="error">
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                {majorDialog.action === 'add' ? 'Thêm ngành' : 'Chỉnh sửa'}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default memo(MajorDialog);
