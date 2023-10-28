import React, { memo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { dispatch } from 'store/index';
import FileField from 'components/input/FileField';
import InputField from 'components/input/InputField';
import { closeWarnedStudentDialog, createWarnedStudent } from 'store/slices/warnedStudentSlice';
import * as XLSX from 'xlsx';
import { Typography } from '@mui/material';
import DialogTitleCustom from 'components/DialogTitleCustom';

const WarningStudentDialog = () => {
  const { open, initValue } = useSelector((state) => state.warned_student.warnedStudentDialog);
  const handleClose = () => {
    dispatch(closeWarnedStudentDialog());
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitleCustom onClose={handleClose}>Thêm đợt xét CC & BTH</DialogTitleCustom>
      <Formik
        initialValues={initValue}
        validationSchema={Yup.object().shape({
          openclass_time_semester: Yup.string().required('Vui lòng nhập đợt!'),
          openclass_time_year: Yup.string().required('Vui lòng nhập năm học!'),
          warned_student: Yup.mixed().required('Vui lòng chọn file!')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const formatedData = {
            openclass_time_semester: values.openclass_time_semester,
            openclass_time_year: values.openclass_time_year,
            students: await handleImportData(values.warned_student)
          };
          const result = await dispatch(createWarnedStudent(formatedData));
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
                    label="Đợt"
                    placeholder="Nhập đợt"
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
                    id="warned_student"
                    name="warned_student"
                    label="File kết quả"
                    placeholder="Chọn một hoặc nhiều file excel"
                    value={values?.warned_student}
                    error={Boolean(touched.warned_student && errors.warned_student)}
                    helperText={errors.warned_student}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    multiple
                  />
                </Grid>
              </Grid>
              <Typography mt={2}>
                Lưu ý: Nếu kế hoạch mở nhóm vào học kỳ và năm học ở trên đã tồn tại thì hệ thống sẽ xoá và tạo lại mới dựa vào nội dung file
                mới
              </Typography>
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

const validStudent = (studentCode) => {
  const regex = /^31\d{2}(41|56)\d{4}$/;
  return !isNaN(studentCode) && regex.test(studentCode);
};

async function handleImportData(files) {
  let results = [];
  for (const file of files) {
    try {
      const data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });

            let dataFormated = [];
            workbook.SheetNames.forEach((sheetName) => {
              const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
              sheetData?.forEach((item) => {
                const arVl = Object.values(item);
                if (validStudent(arVl[1])) {
                  if (arVl.length === 10) arVl.splice(2, 1);
                  if (arVl.length === 11) arVl.splice(2, 2);

                  const obj = {
                    student_code: arVl[1],
                    student_year: arVl[3],
                    student_semester: arVl[4],
                    total_warning_count: arVl[5],
                    semester_gpa: arVl[6],
                    cumulative_gpa: arVl[7],
                    result: arVl[8]
                  };
                  dataFormated.push(obj);
                }
              });
            });

            resolve(dataFormated);
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
      results = [...results, ...data];
    } catch (error) {
      console.error(error);
    }
  }

  return results;
}

export default memo(WarningStudentDialog);
