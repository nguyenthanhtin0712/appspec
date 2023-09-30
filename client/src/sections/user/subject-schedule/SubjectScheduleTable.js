import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { showSubjectSchedule } from 'store/reducers/subjectScheduleUserSlice';
import { dispatch } from 'store';
import LoadingBox from 'components/LoadingBox';

export default function BasicTable() {
  const { idSelect, dataDetail, isLoading, query } = useSelector((state) => state.subject_schedule_user);

  const dataDisplay = React.useMemo(() => {
    return dataDetail.filter(
      (item) => item.subject_id.includes(query) || item.subject_name.includes(query) || item.openclass_subject_for_course.includes(query)
    );
  }, [dataDetail, query]);

  useEffect(() => {
    if (idSelect !== '') dispatch(showSubjectSchedule(idSelect));
  }, [idSelect]);

  if (isLoading) {
    return <LoadingBox height={400} />;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">STT</TableCell>
            <TableCell align="center">Mã học phần</TableCell>
            <TableCell align="left">Tên học phần</TableCell>
            <TableCell align="center">Số tín chỉ</TableCell>
            <TableCell align="center">Khoá</TableCell>
            <TableCell align="center">Tổng số nhóm</TableCell>
            <TableCell align="center">Số SV / Nhóm</TableCell>
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
                <TableCell align="center">{row.subject_credit}</TableCell>
                <TableCell align="center">{row.openclass_subject_for_course}</TableCell>
                <TableCell align="center">{row.openclass_totalgroup}</TableCell>
                <TableCell align="center">{row.openclass_totalstudent}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
