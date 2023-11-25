import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import InputField from 'components/input/InputField';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { dispatch } from 'store/index';
import { getFunctional, setSelectedCheckboxes, updateRole, getRole } from 'store/slices/roleSlice';
import RoleCard from 'sections/admin/role/RoleCard';
import LoadingBox from 'components/LoadingBox';
import { Backdrop, CircularProgress, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';

const RoleUpdate = () => {
  const { id } = useParams();
  const navigate = new useNavigate();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { functional, isLoadingFunc, selectedCheckboxes, isLoadingCreate, infoRole } = useSelector((state) => state.role);

  useEffect(() => {
    const getFunc = async () => {
      await dispatch(getFunctional());
      await dispatch(getRole(id));
      setIsLoadingData(false);
    };
    getFunc();
  }, [id]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    dispatch(
      setSelectedCheckboxes({
        ...selectedCheckboxes,
        [name]: checked
      })
    );
  };

  const getSelectedCheckboxesArray = () => {
    return Object.keys(selectedCheckboxes).filter((key) => selectedCheckboxes[key]);
  };
  if (isLoadingData) {
    return null;
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Cập nhật nhóm quyền</Typography>
        </Grid>
        <Grid item xs={12}>
          <MainCard>
            <Formik
              initialValues={{
                name: `${infoRole?.name}`
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string().max(255).required('Tên nhóm quyền là bắt buộc !')
              })}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                const permissions = getSelectedCheckboxesArray();
                if (permissions.length === 0) {
                  toast.warning('Nhóm quyền có ít nhất 1 chức năng');
                  return null;
                }
                const value = {
                  ...values,
                  permissions: permissions
                };
                try {
                  const result = await dispatch(updateRole({ id, value }));
                  if (result && !result.error) {
                    setStatus({ success: true });
                    setSubmitting(false);
                    toast.success('Cập nhât nhóm quyền thành công!');
                    navigate('/admin/role');
                  } else {
                    setStatus({ success: false });
                    setErrors(result.payload.errors);
                    setSubmitting(false);
                    toast.error('Có lỗi khi thêm nhóm quyền');
                  }
                } catch (err) {
                  console.error(err);
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                }
              }}
            >
              {({ handleSubmit, isSubmitting, values, handleBlur, handleChange, touched, errors }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <InputField
                        id="name"
                        type="text"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Nhập tên nhóm quyền"
                        label="Tên nhóm quyền"
                        fullWidth
                        error={Boolean(touched.name && errors.name)}
                        helperText={errors.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        {isLoadingFunc ? (
                          <Grid item xs={12}>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                              <LoadingBox />
                            </Stack>
                          </Grid>
                        ) : (
                          functional.length > 0 &&
                          functional.map((func, index) => (
                            <RoleCard key={index} func={func} handleChange={handleCheckboxChange} select={selectedCheckboxes} />
                          ))
                        )}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ float: 'right' }}
                      >
                        Cập nhật nhóm quyền
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </MainCard>
        </Grid>
      </Grid>
      {isLoadingCreate && (
        <Backdrop sx={{ color: '#fff', zIndex: 2000 }} open={isLoadingCreate}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default RoleUpdate;
