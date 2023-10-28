import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import { setGrade } from 'store/slices/gradingSlice';
import { dispatch } from 'store';

const GradingUpdateTable = () => {
  const { students, grades } = useSelector((state) => state.grading);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell align="center">MSSV</TableCell>
            <TableCell>Họ</TableCell>
            <TableCell align="center">Tên</TableCell>
            <TableCell align="center">Vị trí thực tập</TableCell>
            <TableCell align="center">Công ty</TableCell>
            <TableCell align="center" sx={{ width: '100px' }}>
              Điểm số
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.length > 0 &&
            students.map((student, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{student.student_code}</TableCell>
                <TableCell align="center">{student.user_firstname}</TableCell>
                <TableCell align="center">{student.user_lastname}</TableCell>
                <TableCell align="center">{student.position_name}</TableCell>
                <TableCell align="center">{student.company_name}</TableCell>
                <TableCell align="center">
                  <TextField
                    value={grades[student.student_code]}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      const isNumeric = /^-?\d*\.?\d*$/.test(newValue);
                      if (isNumeric && newValue >= 0 && newValue <= 10) {
                        dispatch(setGrade({ [student.student_code]: newValue }));
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GradingUpdateTable;
