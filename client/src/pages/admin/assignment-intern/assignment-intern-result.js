import * as React from 'react';
import Box from '@mui/material/Box';
import { Add, ArrowRight } from 'iconsax-react';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router';
import ResultTableAdmin from 'sections/admin/assignment-intern/ResultTableAdmin';
import { dispatch } from 'store/index';
import { getRegisterInternship, setAssignmentInternId } from 'store/slices/assignmentIntenship';
import { useSelector } from 'react-redux';
import { formatDDMMYYYY } from 'utils/formatDateTime';
import AssignmentInternForm from 'sections/admin/assignment-intern/AssignmentInternForm';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import { submitListStudents } from 'store/slices/assignmentIntenship';

const AssignmentInternResult = () => {
  const theme = useTheme();
  const { Id } = useParams();
  const { assignment_intern } = useSelector((state) => state.assignment_internship);
  React.useEffect(() => {
    const getAssignmentIntern = async () => {
      await dispatch(setAssignmentInternId(Id));
      await dispatch(getRegisterInternship(Id));
    };
    getAssignmentIntern();
  }, [Id]);
  if (!assignment_intern) return null;

  const FormRender = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
            <Stack mb={3} spacing={1}>
              <Typography variant="h4" component="h1">
                Phân công thực tập học kỳ {assignment_intern.openclasstime.openclass_time_semester} năm{' '}
                {assignment_intern.openclasstime.openclass_time_year}
              </Typography>
              <Stack direction="row" spacing={2} alignItems={'center'}>
                <Typography variant="h6">Từ {formatDDMMYYYY(assignment_intern.internship_graduation_start_date)}</Typography>
                <ArrowRight size="25" color={theme.palette.primary.main} />
                <Typography variant="h6">Đến {formatDDMMYYYY(assignment_intern.internship_graduation_end_date)}</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Box>
            <Stack spacing={2}>
              <ResultTableAdmin />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <AssignmentInternForm />
        </Grid>
      </Grid>
    );
  };

  const FormImport = () => {
    const fileInputRef = React.useRef(null);
    const handleInputLabelClick = () => {
      fileInputRef.current.click();
    };
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
            <Stack mb={3} spacing={1}>
              <Typography variant="h4" component="h1">
                Phân công thực tập học kỳ {assignment_intern.openclasstime.openclass_time_semester} năm{' '}
                {assignment_intern.openclasstime.openclass_time_year}
              </Typography>
              <Stack direction="row" spacing={2} alignItems={'center'}>
                <Typography variant="h6">Từ {formatDDMMYYYY(assignment_intern.internship_graduation_start_date)}</Typography>
                <ArrowRight size="25" color={theme.palette.primary.main} />
                <Typography variant="h6">Đến {formatDDMMYYYY(assignment_intern.internship_graduation_end_date)}</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button variant="contained" startIcon={<Add />} onClick={handleInputLabelClick}>
              Nhập danh sách sinh viên
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={async (e) => {
                const files = Array.from(e.target.files);
                const data = await handleImportData(files[0]);
                const result = {
                  students: data,
                  internship_graduation_id: Id
                };
                if (data.length == 0) {
                  toast.warning('File không đúng định dạng');
                } else {
                  const check = await dispatch(submitListStudents(result));
                  if (check) {
                    await dispatch(getRegisterInternship(Id));
                    toast.success('Nhập file thành công');
                  } else {
                    toast.success('Lỗi khi nhập file thành công');
                  }
                }
              }}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              style={{ display: 'none' }}
            />
          </Box>
        </Grid>
      </Grid>
    );
  };
  return assignment_intern.internship_graduation_status == 1 ? FormRender() : <FormImport />;
};

function handleImportData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const students = [];
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        jsonData.forEach((row) => {
          if (typeof row['TRƯỜNG ĐẠI HỌC SÀI GÒN'] === 'number' && !isNaN(row['TRƯỜNG ĐẠI HỌC SÀI GÒN'])) students.push(row['__EMPTY']);
        });
        resolve(students);
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

export default AssignmentInternResult;
