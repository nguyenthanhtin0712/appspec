import React, { memo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { dispatch } from 'store/index';
import FileField from 'components/input/FileField';
import InputField from 'components/input/InputField';
import { closeSubjectScheduleDialog } from 'store/reducers/subjectScheduleSlice';
import * as XLSX from 'xlsx';

const SubjectScheduleDialog = () => {
  const { open, initValue } = useSelector((state) => state.subject_schedule.subjectScheduleDialog);
  const handleClose = () => {
    dispatch(closeSubjectScheduleDialog());
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Thêm kế hoạch mở nhóm</DialogTitle>
      <Formik
        initialValues={initValue}
        validationSchema={Yup.object().shape({
          openclass_time_semester: Yup.string().required('Vui lòng nhập học kỳ!'),
          openclass_time_year: Yup.string().required('Vui lòng nhập năm học!'),
          file_schedule: Yup.mixed().required('Vui lòng chọn file!')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const result = await handleImportData(values.file_schedule[0]);
          try {
            if (result && !result.error) {
              setStatus({ success: true });
              setSubmitting(false);
              toast.success('Thêm kế hoạch thành công!');
            } else {
              setStatus({ success: false });
              setErrors({ submit: result.error.message });
              setSubmitting(false);
              toast.error('Thêm kế hoạch không thành công!');
            }
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleSubmit, isSubmitting, touched, values, handleChange, setFieldValue, setFieldTouched }) => (
          <form noValidate onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <InputField
                    id="openclass_time_semester"
                    name="openclass_time_semester"
                    type="number"
                    value={values.openclass_time_semester}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Học kỳ"
                    placeholder="Nhập học kỳ"
                    fullWidth
                    error={Boolean(touched.openclass_time_semester && errors.openclass_time_semester)}
                    helperText={errors.openclass_time_semester}
                  ></InputField>
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    id="openclass_time_year"
                    name="openclass_time_year"
                    type="number"
                    value={values.openclass_time_year}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Năm học"
                    placeholder="Nhập năm học"
                    fullWidth
                    error={Boolean(touched.openclass_time_year && errors.openclass_time_year)}
                    helperText={errors.openclass_time_year}
                  ></InputField>
                </Grid>
                <Grid item xs={12}>
                  <FileField
                    id="file_schedule"
                    name="file_schedule"
                    label="File kế hoạch"
                    placeholder="Chọn file excel"
                    value={values?.file_schedule}
                    error={Boolean(touched.file_schedule && errors.file_schedule)}
                    helperText={errors.file_schedule}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="error">
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Thêm kế hoạch
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
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log(jsonData);
        resolve(jsonData);
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

export default memo(SubjectScheduleDialog);
