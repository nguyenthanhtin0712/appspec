import React, { memo, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { fetchData, setStudentScoreDialog, addScoreStudent } from 'store/reducers/studentSlice';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { dispatch } from 'store/index';
import { IconButton, InputAdornment, InputLabel } from '@mui/material';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as XLSX from 'xlsx';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PublishIcon from '@mui/icons-material/Publish';

const StudentScoreDialog = () => {
  const { isLoading } = useSelector((state) => state.student);
  const { studentScoreDialog, columnFilters, globalFilter, sorting, pagination } = useSelector((state) => state.student);
  console.log(studentScoreDialog);
  const handleClose = () => {
    dispatch(
      setStudentScoreDialog({
        open: false,
        initValue: {
          file_student: null,
          password_student: ''
        }
      })
    );
  };

  const fileInputRef = useRef(null);

  const handleInputLabelClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Dialog open={studentScoreDialog.open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Thêm điểm sinh viên</DialogTitle>
      <Formik
        initialValues={studentScoreDialog.initValue}
        validationSchema={Yup.object().shape({
          file_student: Yup.mixed().required('Vui lòng chọn file!'),
          password_student: Yup.string().required('Vui lòng nhập mật khẩu cho sinh viên!')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const data = await handleImportData(values.file_student, values.password_student);
            console.log(data);
            const result = await dispatch(addScoreStudent(data));
            handleClose();
            if (result && !result.error) {
              setStatus({ success: true });
              setSubmitting(false);
              dispatch(fetchData({ columnFilters, globalFilter, sorting, pagination }));
              toast.success('Thêm điểm thành công!');
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
        {({ errors, handleBlur, handleSubmit, isSubmitting, touched, values, handleChange, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <label htmlFor="file_student" style={{ cursor: 'pointer!important' }}>
                      <InputLabel htmlFor="password_student">Nhập mật khẩu</InputLabel>
                      <OutlinedInput
                        id="password_student"
                        style={{ cursor: 'pointer' }}
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
                    </label>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1} sx={{ mb: '10px' }}>
                    <InputLabel onClick={handleInputLabelClick}>Chọn file</InputLabel>
                    <OutlinedInput
                      fullWidth
                      sx={{
                        '& .MuiInputBase-input': {
                          cursor: 'pointer'
                        }
                      }}
                      value={values?.file_student}
                      readOnly
                      placeholder="Chọn file"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton component="span" aria-label="upload" style={{ padding: '0' }}>
                            <PublishIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      onClick={handleInputLabelClick}
                    />
                    {touched.file_student && errors.file_student && (
                      <FormHelperText error id="standard-weight-helper-text-file_student">
                        {errors.file_student}
                      </FormHelperText>
                    )}
                    <input
                      id="file_student"
                      type="file"
                      name="file_student"
                      ref={fileInputRef}
                      onBlur={() => {}}
                      onChange={(e) => {
                        const selectedFiles = Array.from(e.target.files);
                        setFieldValue('file_student', selectedFiles);
                      }}
                      multiple
                      style={{ display: 'none' }}
                    />
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
      {isLoading && (
        <Backdrop sx={{ color: '#fff', zIndex: 2000 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Dialog>
  );
};

async function handleImportData(files, pass) {
  const results = { data: [], password: pass };
  for (const file of files) {
    try {
      const data = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Xử lý sự kiện khi đọc file hoàn tất
        reader.onload = (e) => {
          try {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];

            if (!sheetName) {
              const error = new Error('Không đúng định dạng.');
              toast.error('File không đúng format!' + error);
              reject(error);
              return;
            }

            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 2 });

            if (!jsonData.some((row) => 'MaSV' in row && 'DTBTLHK' in row)) {
              const error = new Error("Thiếu cột 'MaSV' hoặc 'DTBTLHK'.");
              toast.error('File không đúng format!' + error);
              reject(error);
              return;
            }

            let result = { data: [] };

            jsonData.forEach((row) => {
              result.data.push({
                student_code: row['MaSV'],
                user_firstname: row['HoLotSV'],
                user_lastname: row['TenSV'],
                user_birthday: convertDateFormat(row['NgaySinhC']),
                student_class: row['MaLop'],
                major_id: row['MaNgChng'],
                student_score: row['DTBTLHK']
              });
            });
            resolve(result);
          } catch (error) {
            toast.error('' + error);
            reject(error);
          }
        };

        reader.onerror = (error) => {
          reject(error);
          toast.error('' + error);
        };

        reader.readAsBinaryString(file);
      });
      results.data = [...results.data, ...data.data];
    } catch (error) {
      console.error(error);
    }
  }

  return results;
}

function convertDateFormat(dateString) {
  // Tách ngày, tháng và năm bằng cách split chuỗi
  var parts = dateString.split('/');
  // Kiểm tra xem chuỗi có đúng định dạng ngày/tháng/năm hay không
  if (parts.length === 3) {
    var day = parts[0];
    var month = parts[1];
    var year = parts[2];

    var newDateString = year + '-' + month + '-' + day;
    return newDateString;
  } else {
    return 'Invalid date format.';
  }
}

export default memo(StudentScoreDialog);
