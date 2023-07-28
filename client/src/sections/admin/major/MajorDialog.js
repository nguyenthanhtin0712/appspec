import React, { memo, useMemo, useCallback } from 'react';
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
import { useDispatch } from 'react-redux';
import DialogTitleCustom from 'components/DialogTitleCustom';
import { dispatch } from 'store/index';

const MajorForm = ({ initialValues, action }) => {
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    dispatch(setMajorDialog({ open: false, initValue: { major_code: '', major_name: '' } }));
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        major_code: Yup.string().max(255).required('Mã ngành là bắt buộc !'),
        major_name: Yup.string().max(255).required('Tên ngành là bắt buộc !')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const actionType = action === 'update' ? updateMajor : createMajor;
          const result = await dispatch(actionType(values));
          if (result && !result.error) {
            setStatus({ success: true });
            setSubmitting(false);
            toast.success(action === 'update' ? 'Sửa ngành thành công!' : 'Thêm ngành thành công!');
          } else {
            setStatus({ success: false });
            setErrors(result.payload.errors);
            setSubmitting(false);
            toast.error(action === 'update' ? 'Có lỗi xảy ra khi Sửa ngành!' : 'Có lỗi xảy ra khi thêm ngành!');
          }
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
                <InputField
                  id="major_code"
                  type="text"
                  value={values.major_code}
                  name="major_code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập mã ngành"
                  label="Mã ngành"
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
                  label="Tên ngành"
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
              {action === 'add' ? 'Thêm ngành' : 'Chỉnh sửa'}
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
};

const MajorDialog = () => {
  const { majorDialog } = useSelector((state) => state.major);
  const initialValues = useMemo(() => majorDialog.initValue, [majorDialog.initValue]);
  const action = useMemo(() => majorDialog.action, [majorDialog.action]);

  const handleClose = () => {
    dispatch(setMajorDialog({ open: false, initValue: { major_code: '', major_name: '' } }));
  };
  return (
    <Dialog open={majorDialog.open} onClose={handleClose} maxWidth="xs">
      <DialogTitleCustom onClose={handleClose}>{action === 'add' ? 'Thêm chuyên ngành' : 'Chỉnh sửa chuyên ngành'}</DialogTitleCustom>
      <MajorForm initialValues={initialValues} action={action} />
    </Dialog>
  );
};

export default memo(MajorDialog);
