import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import SelectField from 'components/input/SelectField';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { getJobholderIntenship, setDialog, changeJobholder, fetchData } from 'store/slices/assignmentIntenship';
import { toast } from 'react-toastify';

const AssignmentInternDialog = ({ rowSelection, setRowSelection }) => {
  const { jobholders, dialog, assignment_intern_id, columnFilters, globalFilter, sorting, pagination, status } = useSelector(
    (state) => state.assignment_internship
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getJobholderIntenship(assignment_intern_id));
    };
    fetchData();
  }, [assignment_intern_id]);

  return (
    <Dialog
      open={dialog}
      onClose={() => {
        dispatch(setDialog(false));
      }}
      maxWidth="xs"
    >
      <DialogTitle>Phân công giảng viên</DialogTitle>
      <Formik
        initialValues={{
          id: assignment_intern_id,
          jobholder_code: '',
          students: Object.keys(rowSelection)
        }}
        validationSchema={Yup.object().shape({
          jobholder_code: Yup.string().max(255).required('Vui lòng chọn giảng viên !')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const result = await dispatch(changeJobholder(values));
            if (result) {
              setRowSelection({});
              toast.success('Phân công thành công!');
              setStatus({ success: true });
              setSubmitting(false);
              await dispatch(getJobholderIntenship(assignment_intern_id));
              await dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination, status, assignment_intern_id }));
              dispatch(setDialog(false));
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
              <DialogContentText>Các sinh viên được chọn sẽ được phân công</DialogContentText>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <SelectField
                    id="jobholder_code"
                    labelId="jobholder_code"
                    name="jobholder_code"
                    label="Chọn giảng viên"
                    value={values.jobholder_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.jobholder_code && errors.jobholder_code)}
                    helperText={errors.jobholder_code}
                    list={jobholders}
                    getOptionLabel={(option) => option.jobholder_name}
                    getOptionValue={(option) => option.jobholder_code}
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
              <Button
                onClick={() => {
                  dispatch(setDialog(false));
                }}
                variant="contained"
                color="error"
              >
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

export default AssignmentInternDialog;
