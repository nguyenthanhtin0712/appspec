import React, { memo, useMemo, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { createDegree, setDegreeDialog, updateDegree } from 'store/reducers/degreeSlice';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import InputField from 'components/input/InputField';
import { useDispatch } from 'react-redux';
import DialogTitleCustom from 'components/DialogTitleCustom';
import { dispatch } from 'store/index';

const DegreeForm = ({ initialValues, action }) => {
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    dispatch(setDegreeDialog({ open: false, initValue: { degree_name: '' } }));
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        degree_name: Yup.string().max(255).required('Tên học vị là bắt buộc !')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const actionType = action === 'update' ? updateDegree : createDegree;
          const result = await dispatch(actionType(values));
          if (result && !result.error) {
            setStatus({ success: true });
            setSubmitting(false);
            toast.success(action === 'update' ? 'Sửa học vị thành công!' : 'Thêm học vị thành công!');
          } else {
            setStatus({ success: false });
            setErrors(result.payload.errors);
            setSubmitting(false);
            toast.error(action === 'update' ? 'Có lỗi xảy ra khi Sửa học vị!' : 'Có lỗi xảy ra khi thêm học vị!');
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
                  id="degree_name"
                  type="text"
                  value={values.degree_name}
                  name="degree_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập tên học vị"
                  label="Tên học vị"
                  fullWidth
                  error={Boolean(touched.degree_name && errors.degree_name)}
                  helperText={errors.degree_name}
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
              {action === 'add' ? 'Thêm học vị' : 'Chỉnh sửa'}
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
};

const DegreeDialog = () => {
  const { degreeDialog } = useSelector((state) => state.degree);
  const initialValues = useMemo(() => degreeDialog.initValue, [degreeDialog.initValue]);
  const action = useMemo(() => degreeDialog.action, [degreeDialog.action]);

  const handleClose = () => {
    dispatch(setDegreeDialog({ open: false, initValue: { degree_id: '', degree_name: '' } }));
  };
  return (
    <Dialog open={degreeDialog.open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitleCustom onClose={handleClose}>{action === 'add' ? 'Thêm học vị' : 'Chỉnh sửa học vị'}</DialogTitleCustom>
      <DegreeForm initialValues={initialValues} action={action} />
    </Dialog>
  );
};

export default memo(DegreeDialog);
