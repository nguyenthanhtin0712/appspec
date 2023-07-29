import React, { memo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { createStudent, setStudentFileDialog } from 'store/reducers/student';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { dispatch } from 'store/index';
import { InputLabel } from '@mui/material';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
// import * as XLSX from 'xlsx';

const StudentFileDialog = () => {
  const { studentFileDialog } = useSelector((state) => state.student);

  // const handleImportData = async (e) => {
  //   e.preventDefault();
  //   const file = e.target.files[0];
  //   if (!file) {
  //     console.error('Không có file được chọn.');
  //     return;
  //   }
  //   const reader = new FileReader();
  //   reader.readAsBinaryString(file);
  //   reader.onload = async (e) => {
  //     const data = e.target.result;
  //     const workbook = XLSX.read(data, { type: 'binary' });
  //     const sheetName = workbook.SheetNames[1];
  //     if (!sheetName) {
  //       toast.error('Không đúng định dạng.');
  //       return;
  //     }
  //     const sheet = workbook.Sheets[sheetName];
  //     const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 2 });

  //     let result = { data: [] };
  //     jsonData.forEach((row) => {
  //       result.data.push({
  //         student_code: row['MaSV'],
  //         user_firstname: row['HoLotSV'],
  //         user_lastname: row['TenSV'],
  //         user_birthday: row['NgaySinhC'],
  //         user_gender: row['Phai'],
  //         student_course: row['KhoaHoc'],
  //         student_class: row['MaLop'],
  //         major_code: row['MaNganh']
  //       });
  //     });
  //     console.log(result);
  //   };
  // };

  const handleClose = () => {
    dispatch(
      setStudentFileDialog({
        open: false,
        initValue: {
          file_student: '',
          password_student: ''
        }
      })
    );
  };

  return (
    <Dialog open={studentFileDialog.open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Thêm sinh viên đầu khóa</DialogTitle>
      <Formik
        initialValues={studentFileDialog.initValue}
        validationSchema={Yup.object().shape({
          file_student: Yup.mixed().required('Vui lòng chọn file!'),
          password_student: Yup.string().required('Vui lòng nhập mật khẩu cho sinh viên!')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log(values);
            const result = await dispatch(createStudent(values));
            if (result && !result.error) {
              setStatus({ success: true });
              setSubmitting(false);
              toast.success('Thêm sinh viên thành công!');
            } else {
              setStatus({ success: false });
              setErrors({ submit: result.error.message });
              setSubmitting(false);
              toast.error('Có lỗi xảy ra khi thêm sinh viên!');
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
                  <Stack spacing={1} sx={{ mb: '10px' }}>
                    <InputLabel htmlFor="password_student">Nhập mật khẩu</InputLabel>
                    <OutlinedInput
                      id="password_student"
                      type="text"
                      value={values.password_student}
                      name="password_student"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu cho sinh viên"
                      fullWidth
                      error={Boolean(touched.password_student && errors.password_student)}
                    />
                    {touched.password_student && errors.password_student && (
                      <FormHelperText error id="standard-weight-helper-text-password_student">
                        {errors.password_student}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1} sx={{ mb: '10px' }}>
                    <InputLabel htmlFor="file_student">Chọn file</InputLabel>
                    <OutlinedInput
                      id="file_student"
                      type="file"
                      value={values.file_student}
                      name="file_student"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setFieldValue('file_student', e.target.files[0]);
                      }}
                      placeholder="Chọn file"
                      fullWidth
                      error={Boolean(touched.file_student && errors.file_student)}
                    />
                    {touched.file_student && errors.file_student && (
                      <FormHelperText error id="standard-weight-helper-text-file_student">
                        {errors.file_student}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="error">
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Thêm sinh viên
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default memo(StudentFileDialog);
