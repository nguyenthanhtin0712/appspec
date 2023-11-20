import React, { useMemo } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { SearchNormal } from 'iconsax-react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { v4 } from 'uuid';
import { setQuery, setTimeOption } from 'store/slices/registerOpenClassSlice';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';

const getTimes = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2023;
  const semesters = [];

  semesters.push({ id: 0, semester: '', year: '', label: `Từ trước đến nay` });
  for (let year = currentYear; year >= startYear; year--) {
    semesters.push({ id: v4(), semester: 2, year, label: `Học kỳ 2 năm học ${year}` });
    semesters.push({ id: v4(), semester: 1, year, label: `Học kỳ 1 năm học ${year}` });
  }
  return semesters;
};

const FilterOpenClass = () => {
  const { timeOption, query } = useSelector((state) => state.register_open_class.statistic);

  const semesters = useMemo(() => getTimes(), []);

  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={5}>
        <FormControl fullWidth>
          <Select
            id="select-subject-schedule"
            value={timeOption.id}
            onChange={(event) => {
              dispatch(setTimeOption(semesters.find((item) => item.id == event.target.value)));
            }}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {semesters.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={7}>
        <OutlinedInput
          id="query"
          type="text"
          value={query}
          name="query"
          placeholder="Tìm kiếm mã học phần, tên học phần..."
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

export default FilterOpenClass;
