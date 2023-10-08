import React from 'react';
import WarnedStudentChart from 'sections/admin/warned-student/WarnedStudentChart';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { FormControl, InputLabel } from '@mui/material';
import { useSelector } from 'react-redux';
import { setFilterChart } from 'store/reducers/warnedStudentDetailSlice';
import { dispatch } from 'store';
import { getListCourse } from 'pages/admin/warned-student/warned-student-detail';
import { useParams } from 'react-router';

const arr = [
  {
    id: 'major',
    text: 'Ngành'
  },
  {
    id: 'course',
    text: 'Khoá'
  },
  {
    id: 'class',
    text: 'Lớp'
  }
];

const WarnedStudentStatistical = () => {
  const { id } = useParams();
  const { majors, filterChart, timeInfo } = useSelector((state) => state.warned_student_detail);
  const { type, majorId, courseId } = filterChart;
  const majorArr = [{ major_id: 0, major_name: 'Tất cả' }, ...majors];
  const courses = getListCourse(timeInfo?.openclass_time_year);

  return (
    <>
      <Grid container mb={2} spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="statistical-for">Thống kê theo</InputLabel>
            <Select
              id="type"
              value={type}
              onChange={(event) => dispatch(setFilterChart({ type: event.target.value }))}
              labelId="statistical-for"
            >
              {arr.length > 0 &&
                arr.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.text}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="statistical-for">Lọc theo ngành</InputLabel>
            <Select
              id="majorId"
              value={majorId}
              onChange={(event) => dispatch(setFilterChart({ majorId: event.target.value }))}
              labelId="statistical-for"
              disabled={type === 'major'}
            >
              {majorArr.length > 0 &&
                majorArr.map((item) => (
                  <MenuItem key={item.major_id} value={item.major_id}>
                    {item.major_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="statistical-for">Lọc theo khoá</InputLabel>
            <Select
              id="type"
              value={courseId}
              onChange={(event) => dispatch(setFilterChart({ courseId: event.target.value }))}
              labelId="statistical-for"
              disabled={type === 'major' || type === 'course'}
            >
              <MenuItem value={0}>Tất cả</MenuItem>
              {courses.length > 0 &&
                courses.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <WarnedStudentChart id={id} xTitle={arr.find((item) => item.id === type).text} />
    </>
  );
};

export default WarnedStudentStatistical;
