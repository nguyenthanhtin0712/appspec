import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import { SearchNormal } from 'iconsax-react';
import { useSelector } from 'react-redux';
import { getMajors, setMajorId, setStudentCourse, setStudentQuery } from 'store/reducers/warnedStudentDetailSlice';
import { dispatch } from 'store';
import WarnedStudentDetailTable from 'sections/admin/warned-student/WarnedStudentDetailTable';
import RepeatCustomerChart from 'sections/dashboard/RepeatCustomerChart';

const getListCourse = () => {
  let year = new Date().getFullYear();
  let result = [];
  for (let i = year - 1; i >= year - 4; i--) {
    result.push(i);
  }
  return result;
};

const WarnedStudentPage = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Typography variant="h4" component="h1" mb={2}>
        Kết quả xét cảnh báo, buộc thôi học đợt 2 năm 2023
      </Typography>
      <Card>
        <TabContext value={value}>
          <CardHeader
            subheader={
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Tra cứu" value="1" />
                <Tab label="Thống kê" value="2" />
              </TabList>
            }
            sx={{ p: 0 }}
          />
          <Divider />
          <TabPanel value="1">
            <FilterStudent />
            <WarnedStudentDetailTable />
          </TabPanel>
          <TabPanel value="2">
            <RepeatCustomerChart />
          </TabPanel>
        </TabContext>
      </Card>
    </>
  );
};

const FilterStudent = () => {
  const { majors, majorId, studentCourse, studentQuery } = useSelector((state) => state.warned_student_detail);
  const listCourse = getListCourse();

  useEffect(() => {
    const fetchMajors = async () => {
      await dispatch(getMajors());
    };
    fetchMajors();
  }, []);

  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <Select
            id="major_id"
            value={majorId}
            onChange={(event) => dispatch(setMajorId(event.target.value))}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" sx={{ color: 'text.secondary' }}>
              Chọn ngành
            </MenuItem>
            {majors.length > 0 &&
              majors.map((item) => (
                <MenuItem key={item.major_id} value={item.major_id}>
                  {item.major_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <Select
            id="student-course"
            value={studentCourse}
            onChange={(event) => dispatch(setStudentCourse(event.target.value))}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" sx={{ color: 'text.secondary' }}>
              Chọn khoá
            </MenuItem>
            {listCourse.length > 0 &&
              listCourse.map((item) => (
                <MenuItem key={item} value={item}>
                  {`Khoá ${item}`}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <OutlinedInput
          id="student-query"
          type="text"
          value={studentQuery}
          name="student-query"
          placeholder="Tìm kiếm mã sinh viên, họ tên..."
          startAdornment={
            <InputAdornment position="start">
              <SearchNormal />
            </InputAdornment>
          }
          onChange={(event) => dispatch(setStudentQuery(event.target.value))}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default WarnedStudentPage;
