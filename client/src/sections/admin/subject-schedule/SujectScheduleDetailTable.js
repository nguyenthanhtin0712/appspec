import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const SujectScheduleDetailTable = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell align="center">Mã học phần</TableCell>
            <TableCell>Tên học phần</TableCell>
            <TableCell align="center">Số TC</TableCell>
            <TableCell align="center">Khoá</TableCell>
            <TableCell align="center">Số tiết LT</TableCell>
            <TableCell align="center">Số tiết TH</TableCell>
            <TableCell align="center">Số tiết BT</TableCell>
            <TableCell align="center">Số nhóm</TableCell>
            <TableCell align="center">Số SV / Nhóm</TableCell>
            <TableCell align="center">Bộ môn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.openclass_subject_id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="center">{row.subject_id}</TableCell>
              <TableCell>{row.subject_name}</TableCell>
              <TableCell align="center">{row.subject_credit}</TableCell>
              <TableCell align="center">{row.openclass_subject_for_course}</TableCell>
              <TableCell align="center">{row.subject_LT}</TableCell>
              <TableCell align="center">{row.subject_TH}</TableCell>
              <TableCell align="center">{row.subject_BT}</TableCell>
              <TableCell align="center">{row.openclass_totalgroup}</TableCell>
              <TableCell align="center">{row.openclass_totalstudent}</TableCell>
              <TableCell align="center">{row.academic_field_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SujectScheduleDetailTable;
