import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const GradingUpdateTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell align="center">Mã học phần</TableCell>
            <TableCell>Tên học phần</TableCell>
            <TableCell align="center">Số TC</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={1}>
            <TableCell component="th" scope="row">
              1
            </TableCell>
            <TableCell align="center">2</TableCell>
            <TableCell>3</TableCell>
            <TableCell align="center">4</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GradingUpdateTable;
