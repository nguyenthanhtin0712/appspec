import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, Grid } from '@mui/material';
import SelectField from 'components/input/SelectField';
import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { changeSpecialty, fetchData } from 'store/reducers/registerSpecialtyUserSlice';
import { toast } from 'react-toastify';

const ChangeSpecialtyDialog = ({ open, handleClose, rowSelection, setRowSelection }) => {
  const { statistic, columnFilters, globalFilter, sorting, pagination, majorId, registerSpecialtyId, status } = useSelector(
    (state) => state.register_specialty_user
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogTitle>Thay đổi chuyên ngành</DialogTitle>
      <Formik
        initialValues={{
          students: Object.keys(rowSelection),
          specialty_id: ''
        }}
        validationSchema={Yup.object().shape({
          specialty_id: Yup.string().max(255).required('Vui lòng chọn chuyên ngành !')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log(values);
            const result = await dispatch(changeSpecialty(values));
            if (result) {
              setRowSelection({});
              toast.success('Thay đổi thông tin thành công');
              setStatus({ success: true });
              setSubmitting(false);
              await dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination, majorId, registerSpecialtyId, status }));
              handleClose();
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
              <DialogContentText>Các sinh viên được chọn sẽ được thay đổi chuyên ngành</DialogContentText>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <SelectField
                    id="specialty_id"
                    labelId="specialty_id"
                    name="specialty_id"
                    label="Chọn chuyên ngành"
                    value={values.specialty_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.specialty_id && errors.specialty_id)}
                    helperText={errors.specialty_id}
                    list={statistic}
                    getOptionLabel={(option) => option.specialty_name}
                    getOptionValue={(option) => option.specialty_id}
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
              <Button onClick={handleClose} variant="contained" color="error">
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Xác nhận
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ChangeSpecialtyDialog;
