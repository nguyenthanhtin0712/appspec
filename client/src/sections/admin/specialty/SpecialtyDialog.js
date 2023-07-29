import React, { memo, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { createSpecialty, setSpecialtyDialog, updateSpecialty } from 'store/reducers/specialty';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { dispatch } from 'store/index';
import { Select, MenuItem, InputLabel } from '@mui/material';
import { fetchData } from '../../../store/reducers/major';
import InputField from 'components/input/InputField';

const SpecialtyDialog = () => {
  const { specialtyDialog } = useSelector((state) => state.specialty);
  const { data, columnFilters, globalFilter, sorting, pagination } = useSelector((state) => state.major);

  useEffect(() => {
    dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
  }, [columnFilters, globalFilter, sorting, pagination]);

  const handleClose = () => {
    dispatch(setSpecialtyDialog({ open: false, initValue: { specialty_id: '', specialty_name: '', major_id: '' } }));
  };

  return (
    <Dialog open={specialtyDialog.open} onClose={handleClose} maxWidth="xs">
      <DialogTitle>{specialtyDialog.action === 'add' ? 'Thêm chuyên ngành' : 'Chỉnh sửa chuyên ngành'}</DialogTitle>
      <Formik
        initialValues={specialtyDialog.initValue}
        validationSchema={Yup.object().shape({
          specialty_id: Yup.string().max(255).required('Mã chuyên ngành là bắt buộc !'),
          specialty_name: Yup.string().max(255).required('Tên chuyên ngành là bắt buộc !'),
          major_id: Yup.string().max(255).required('Vui lòng chọn chuyên ngành !')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const actionType = specialtyDialog.action === 'update' ? updateSpecialty : createSpecialty;
            const result = await dispatch(actionType(values));
            if (result && !result.error) {
              setStatus({ success: true });
              setSubmitting(false);
              toast.success(specialtyDialog.action === 'update' ? 'Sửa chuyên ngành thành công!' : 'Thêm chuyên ngành thành công!');
            } else {
              setStatus({ success: false });
              setErrors(result.payload.errors);
              setSubmitting(false);
              toast.error(
                specialtyDialog.action === 'update' ? 'Có lỗi xảy ra khi sửa chuyên ngành!' : 'Có lỗi xảy ra khi thêm chuyên ngành!'
              );
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
                    id="specialty_id"
                    type="text"
                    value={values.specialty_id}
                    name="specialty_id"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập mã chuyên ngành"
                    label="Mã chuyên ngành"
                    fullWidth
                    error={Boolean(touched.specialty_id && errors.specialty_id)}
                    helperText={errors.specialty_id}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    id="specialty_name"
                    type="text"
                    value={values.specialty_name}
                    name="specialty_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập tên chuyên ngành"
                    label="Tên chuyên ngành"
                    fullWidth
                    error={Boolean(touched.specialty_name && errors.specialty_name)}
                    helperText={errors.specialty_name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="major_id" sx={{ mb: '5px' }}>
                    Chọn ngành
                  </InputLabel>
                  <Select
                    labelId="major_id"
                    id="major_id"
                    name="major_id"
                    value={values.major_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    error={Boolean(touched.major_id && errors.major_id)}
                  >
                    <MenuItem value="" sx={{ color: 'text.secondary' }}>
                      Chọn ngành
                    </MenuItem>
                    {data.length > 0 &&
                      data.map((item) => (
                        <MenuItem key={item.major_id} value={item.major_id}>
                          {item.major_name}
                        </MenuItem>
                      ))}
                    {/* Thêm các MenuItem cho các ngành học khác */}
                  </Select>
                  {Boolean(touched.major_id && errors.major_id) && <FormHelperText error>{errors.major_id}</FormHelperText>}
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
                {specialtyDialog.action === 'add' ? 'Thêm chuyên ngành' : 'Chỉnh sửa'}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default memo(SpecialtyDialog);
