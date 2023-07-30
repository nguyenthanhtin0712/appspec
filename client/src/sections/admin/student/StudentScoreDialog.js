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
import { fetchData, setStudentScoreDialog, addScoreStudent } from 'store/reducers/student';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { dispatch } from 'store/index';
import { InputLabel } from '@mui/material';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as XLSX from 'xlsx';

const StudentScoreDialog = () => {
  const { studentScoreDialog, columnFilters, globalFilter, sorting, pagination } = useSelector((state) => state.student);

  const handleClose = () => {
    dispatch(
      setStudentScoreDialog({
        open: false,
        initValue: {
          file_student: null
        }
      })
    );
  };

  return (
    <Dialog open={studentScoreDialog.open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Thêm điểm sinh viên</DialogTitle>
      <Formik
        initialValues={studentScoreDialog.initValue}
        validationSchema={Yup.object().shape({
          file_student: Yup.mixed().required('Vui lòng chọn file!')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const data = await handleImportData(values.file_student);
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
        {({ errors, handleBlur, handleSubmit, isSubmitting, touched, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1} sx={{ mb: '10px' }}>
                    <InputLabel htmlFor="file_student">Chọn file</InputLabel>
                    <OutlinedInput
                      id="file_student"
                      type="file"
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

function handleImportData(file) {
  return new Promise((resolve, reject) => {
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

        let result = { data: [] };

        jsonData.forEach((row) => {
          result.data.push({
            student_code: row['MaSV'],
            student_score: row['DTBTLHK']
          });
        });
        console.log(result);
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
}
export default memo(StudentScoreDialog);