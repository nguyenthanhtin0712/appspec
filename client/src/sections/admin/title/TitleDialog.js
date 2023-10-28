import React, { memo, useMemo, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { createTitle, setTitleDialog, updateTitle } from 'store/slices/titleSlice';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import InputField from 'components/input/InputField';
import { useDispatch } from 'react-redux';
import DialogTitleCustom from 'components/DialogTitleCustom';
import { dispatch } from 'store/index';

const TitleForm = ({ initialValues, action }) => {
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    dispatch(setTitleDialog({ open: false, initValue: { title_name: '' } }));
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        title_name: Yup.string().max(255).required('Tên chức vụ là bắt buộc !')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const actionType = action === 'update' ? updateTitle : createTitle;
          const result = await dispatch(actionType(values));
          if (result && !result.error) {
            setStatus({ success: true });
            setSubmitting(false);
            toast.success(action === 'update' ? 'Sửa chức vụ thành công!' : 'Thêm chức vụ thành công!');
          } else {
            setStatus({ success: false });
            setErrors(result.payload.errors);
            setSubmitting(false);
            toast.error(action === 'update' ? 'Có lỗi xảy ra khi Sửa chức vụ!' : 'Có lỗi xảy ra khi thêm chức vụ!');
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
                  id="title_name"
                  type="text"
                  value={values.title_name}
                  name="title_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập tên chức vụ"
                  label="Tên chức vụ"
                  fullWidth
                  error={Boolean(touched.title_name && errors.title_name)}
                  helperText={errors.title_name}
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
              {action === 'add' ? 'Thêm chức vụ' : 'Chỉnh sửa'}
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
};

const TitleDialog = () => {
  const { titleDialog } = useSelector((state) => state.title);
  const initialValues = useMemo(() => titleDialog.initValue, [titleDialog.initValue]);
  const action = useMemo(() => titleDialog.action, [titleDialog.action]);

  const handleClose = () => {
    dispatch(setTitleDialog({ open: false, initValue: { title_id: '', title_name: '' } }));
  };
  return (
    <Dialog open={titleDialog.open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitleCustom onClose={handleClose}>{action === 'add' ? 'Thêm chức vụ' : 'Chỉnh sửa chức vụ'}</DialogTitleCustom>
      <TitleForm initialValues={initialValues} action={action} />
    </Dialog>
  );
};

export default memo(TitleDialog);
