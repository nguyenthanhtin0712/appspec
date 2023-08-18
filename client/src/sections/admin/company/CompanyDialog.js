import React, { memo, useMemo, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { createCompany, updateCompany, setCloseDialog } from 'store/reducers/companySlice';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import InputField from 'components/input/InputField';
import { useDispatch } from 'react-redux';
import DialogTitleCustom from 'components/DialogTitleCustom';
import { dispatch } from 'store/index';
import { Box, Stack, Switch } from '@mui/material';

const CompanyForm = ({ initialValues, action }) => {
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    dispatch(setCloseDialog());
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        company_name: Yup.string().max(255).required('Tên công ty là bắt buộc !'),
        company_email: Yup.string().max(255).required('Tên công ty là bắt buộc !'),
        company_phone: Yup.string().max(255).required('Số điện thoại là bắt buộc !'),
        company_address: Yup.string().max(255).required('Địa chỉ là bắt buộc !'),
        company_host: Yup.string().max(255).required('Địa chỉ hosting là bắt buộc !')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          values.company_is_official = values.company_is_official ? 1 : 0;
          console.log('values', values);
          const actionType = action === 'update' ? updateCompany : createCompany;
          const result = await dispatch(actionType(values));
          if (result && !result.error) {
            setStatus({ success: true });
            setSubmitting(false);
            toast.success(action === 'update' ? 'Sửa công ty thành công!' : 'Thêm công ty thành công!');
          } else {
            setStatus({ success: false });
            setErrors(result.payload.errors);
            setSubmitting(false);
            toast.error(action === 'update' ? 'Có lỗi xảy ra khi Sửa công ty!' : 'Có lỗi xảy ra khi thêm công ty!');
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
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <InputField
                    id="company_name"
                    type="text"
                    value={values.company_name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập tên công ty"
                    label="Tên công ty"
                    fullWidth
                    error={Boolean(touched.company_name && errors.company_name)}
                    helperText={errors.company_name}
                  />
                  <InputField
                    id="company_phone"
                    type="text"
                    value={values.company_phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    label="SDT"
                    fullWidth
                    error={Boolean(touched.company_phone && errors.company_phone)}
                    helperText={errors.company_phone}
                  />
                  <InputField
                    id="company_email"
                    type="text"
                    value={values.company_email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập email"
                    label="Email"
                    fullWidth
                    error={Boolean(touched.company_email && errors.company_email)}
                    helperText={errors.company_email}
                  />
                  <InputField
                    id="company_address"
                    type="text"
                    value={values.company_address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ"
                    label="Địa chỉ"
                    fullWidth
                    error={Boolean(touched.company_address && errors.company_address)}
                    helperText={errors.company_address}
                  />
                  <InputField
                    id="company_host"
                    type="text"
                    value={values.company_host}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập host"
                    label="Link"
                    fullWidth
                    error={Boolean(touched.company_host && errors.company_host)}
                    helperText={errors.company_host}
                  />
                  <Box mt={2}>
                    <label htmlFor="company_is_official">Công ty chính thức</label>
                    <Switch
                      id="company_is_official"
                      name="company_is_official"
                      checked={values.company_is_official == 1}
                      onBlur={handleBlur}
                      onChange={(e) => setFieldValue('company_is_official', e.target.checked)}
                      inputProps={{ 'aria-label': 'Switch A' }}
                    />
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="error">
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              {action === 'add' ? 'Thêm công ty' : 'Chỉnh sửa'}
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
};

const CompanyDialog = () => {
  const { companyDialog } = useSelector((state) => state.company);
  const initialValues = useMemo(() => companyDialog.initValue, [companyDialog.initValue]);
  const action = useMemo(() => companyDialog.action, [companyDialog.action]);

  const handleClose = () => {
    dispatch(setCloseDialog());
  };

  return (
    <Dialog open={companyDialog.open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitleCustom onClose={handleClose}>{action === 'add' ? 'Thêm công ty' : 'Chỉnh sửa công ty'}</DialogTitleCustom>
      <CompanyForm initialValues={initialValues} action={action} />
    </Dialog>
  );
};

export default memo(CompanyDialog);
