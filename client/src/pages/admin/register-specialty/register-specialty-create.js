import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputField from 'components/input/InputField';
import DateTimePickerField from 'components/input/DateTimePickerField';
import { dispatch } from 'store/index';
import { getAll } from 'store/reducers/majorSlice';
import MajorContainerForm from 'sections/admin/register_specialty/register_specialty_create/MajorContainerForm';
import { createRegisterSpecalty } from 'store/reducers/registerSpecialtyAdminSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FileField from 'components/input/FileField';
import * as XLSX from 'xlsx';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const xulymang = (arr) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].specialties) {
      for (let j = 0; j < arr[i].specialties.length; j++) {
        result.push({
          specialty_id: arr[i].specialties[j].specialty_id,
          specialty_quantity: 0
        });
      }
    }
  }
  return result;
};

const RegisterSpecialty = () => {
  const { isLoading } = useSelector((state) => state.register_specialty);
  const navigate = useNavigate();
  const [majorList, setMajorList] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await dispatch(getAll());
      setMajorList(response.payload.data);
    };
    fetch();
  }, []);
  if (majorList.length == 0) {
    return;
  }
  return (
    <>
      <Typography variant="h4" component="h1" mb={2}>
        Tạo đợt đăng ký chuyên ngành
      </Typography>
      <MainCard sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Formik
            initialValues={{
              register_specialty_name: '',
              file_student: null,
              password_student: '',
              register_specialty_start_date: null,
              register_specialty_end_date: null,
              submit: null,
              register_specialty_detail: xulymang(majorList)
            }}
            validationSchema={Yup.object().shape({
              register_specialty_name: Yup.string().max(255).required('Tên đợt là bắt buộc !'),
              file_student: Yup.mixed().required('Vui lòng chọn file!'),
              password_student: Yup.string().max(255).required('Vui lòng nhập mật khẩu cho sinh viên!'),
              register_specialty_start_date: Yup.date()
                .typeError('Vui lòng nhập đầy đủ')
                .min(new Date(), 'Thời gian bắt đầu phải lớn hơn thời gian hiện tại')
                .required('Thời gian bắt đầu là bắt buộc'),
              register_specialty_end_date: Yup.date()
                .typeError('Vui lòng nhập đầy đủ')
                .min(Yup.ref('register_specialty_start_date'), 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu')
                .test('is-future-date', 'Thời gian kết thúc phải lớn hơn thời gian hiện tại', function (value) {
                  return value === null || value > new Date();
                })
                .required('Thời gian kết thúc là bắt buộc')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              const data = await handleImportData(values.file_student, values.password_student);
              try {
                const result = await dispatch(createRegisterSpecalty({ values, data }));
                if (result && !result.error) {
                  setStatus({ success: true });
                  setSubmitting(false);
                  toast.success('Tạo đợt đăng ký thành công!');
                  navigate('/admin/register_specialty');
                } else {
                  setStatus({ success: false });
                  setErrors(result.payload.errors);
                  setSubmitting(false);
                  toast.error('Tạo đợt đăng ký không thành công');
                }
              } catch (err) {
                console.error(err);
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              setFieldValue,
              setFieldError,
              setFieldTouched
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <InputField
                      id="register_specialty_name"
                      type="text"
                      value={values.register_specialty_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập tên đợt đăng ký"
                      label="Tên đợt đăng ký"
                      fullWidth
                      error={Boolean(touched.register_specialty_name && errors.register_specialty_name)}
                      helperText={errors.register_specialty_name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FileField
                      id="file_student"
                      name="file_student"
                      label="Danh sách sinh viên đăng ký"
                      placeholder="Chọn file"
                      value={values?.file_student}
                      error={Boolean(touched.file_student && errors.file_student)}
                      helperText={errors.file_student}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      multiple
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputField
                      id="password_student"
                      type="text"
                      value={values.password_student}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu"
                      label="Mật khẩu"
                      fullWidth
                      error={Boolean(touched.password_student && errors.password_student)}
                      helperText={errors.password_student}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DateTimePickerField
                      label="Thời gian bắt đầu"
                      id="register_specialty_start_date"
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      setFieldError={setFieldError}
                      error={!!(touched.register_specialty_start_date && errors.register_specialty_start_date)}
                      value={values.register_specialty_start_date}
                      helperText={errors.register_specialty_start_date}
                      disablePast
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DateTimePickerField
                      label="Thời gian kết thúc"
                      id="register_specialty_end_date"
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      setFieldError={setFieldError}
                      error={!!(touched.register_specialty_end_date && errors.register_specialty_end_date)}
                      value={values.register_specialty_end_date}
                      helperText={errors.register_specialty_end_date}
                      disablePast
                      fullWidth
                    />
                  </Grid>
                  {majorList && <MajorContainerForm majorList={majorList} values={values} setFieldValue={setFieldValue} />}
                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
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
                      Tạo đợt đăng ký chuyên ngành
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
          {isLoading && (
            <Backdrop sx={{ color: '#fff', zIndex: 2000 }} open={isLoading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </LocalizationProvider>
      </MainCard>
    </>
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

export default RegisterSpecialty;
