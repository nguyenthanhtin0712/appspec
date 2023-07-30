import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const RegistrationInfoTable = ({ data }) => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Chuyên ngành</TableCell>
            <TableCell align="center">Tối đa</TableCell>
            <TableCell align="center">Đã đăng ký</TableCell>
            <TableCell align="center">Còn lại</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ specialty_id, specialty_name, specialty_quantity, specialty_registered }) => (
            <TableRow key={specialty_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {specialty_name}
              </TableCell>
              <TableCell align="center">{specialty_quantity}</TableCell>
              <TableCell align="center">{specialty_registered}</TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: '700', color: specialty_quantity - specialty_registered < 0 ? 'error.main' : 'success.main' }}
              >
                {specialty_quantity - specialty_registered}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RegistrationInfoTable;
