import React, { useEffect } from 'react';
import MainCard from 'components/MainCard';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { SearchNormal } from 'iconsax-react';
import BasicTable from 'sections/user/subject-schedule/SubjectScheduleTable';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { fetchData, setIdSelect, setQuery } from 'store/slices/subjectScheduleUserSlice';

const SubjectSchedulePage = () => {
  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchData());
    };
    fetch();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <MainCard title="Xem kế hoạch mở nhóm học phần">
        <FilterSubject />
        <BasicTable />
      </MainCard>
    </Container>
  );
};

const FilterSubject = () => {
  const { data, idSelect, query } = useSelector((state) => state.subject_schedule_user);

  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <Select
            id="select-subject-schedule"
            value={idSelect}
            onChange={(event) => dispatch(setIdSelect(event.target.value))}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" sx={{ color: 'text.secondary' }} disabled>
              Chọn thời gian
            </MenuItem>
            {data.length > 0 &&
              data.map((item) => (
                <MenuItem key={item.openclass_time_id} value={item.openclass_time_id}>
                  {`Học kỳ ${item.openclass_time_semester} năm học ${item.openclass_time_year}`}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={8}>
        <OutlinedInput
          id="query"
          type="text"
          value={query}
          name="query"
          placeholder="Tìm kiếm mã học phần, tên học phần, khoá..."
          startAdornment={
            <InputAdornment position="start">
              <SearchNormal />
            </InputAdornment>
          }
          onChange={(event) => dispatch(setQuery(event.target.value))}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default SubjectSchedulePage;
