import React from 'react';
import Container from '@mui/material/Container';
import MainCard from 'components/MainCard';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { SearchNormal } from 'iconsax-react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { dispatch } from 'store';
import { useTheme } from '@mui/material';

const StatisticOpenClass = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <MainCard title="Thông tin đăng ký nguyện vọng học lại của sinh viên">
        <FilterOpenClass />
        <OpenClassTable />
      </MainCard>
    </Container>
  );
};

const FilterOpenClass = () => {
  const { data, idSelect, query } = useSelector((state) => state.subject_schedule_user);
  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={5}>
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

const dataDisplay = [
  { subject_id: 841307, subject_name: 'Công nghệ phần mềm', count: 10 },
  { subject_id: 841308, subject_name: 'Kiểm thử phần mềm', count: 10 }
];

const OpenClassTable = () => {
  const theme = useTheme();
  return (
    <TableContainer
      component={Paper}
      sx={{
        border: '1px solid',
        borderColor: theme.palette.divider
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">Mã môn học</TableCell>
            <TableCell align="left">Tên môn học</TableCell>
            <TableCell align="center">Đã đăng ký</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataDisplay.length > 0 &&
            dataDisplay.map((row, index) => (
              <TableRow key={row.subject_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{row.subject_id}</TableCell>
                <TableCell align="left">{row.subject_name}</TableCell>
                <TableCell align="center">{row.count}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatisticOpenClass;
