import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';

const GradingUpdateTable = () => {
  const { students } = useSelector((state) => state.grading);
  // Tạo một state để lưu trạng thái điểm của từng sinh viên
  const [studentGrades, setStudentGrades] = useState({});

  // Hàm xử lý khi giá trị điểm thay đổi
  const handleGradeChange = (studentCode, grade) => {
    // Chuyển đổi giá trị thành số (nếu có thể)
    const numericGrade = parseFloat(grade);

    // Kiểm tra xem giá trị là null hoặc nằm trong khoảng từ 0 đến 10
    if (!isNaN(numericGrade) && numericGrade >= 0 && numericGrade <= 10) {
      // Thực hiện cập nhật giá trị trong state hoặc trạng thái tương tự ở đây
      // Ở đây, ví dụ, chúng ta cập nhật giá trị trong studentGrades
      setStudentGrades({ ...studentGrades, [studentCode]: numericGrade });
    } else {
      // Nếu giá trị không hợp lệ, bạn có thể cập nhật giá trị trong state thành null hoặc giá trị mà bạn muốn.
      setStudentGrades({ ...studentGrades, [studentCode]: null });
    }
  };

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
                    type="number"
                    inputProps={{ min: 0, max: 10 }}
                    // Thay đổi giá trị value của TextField để hiển thị điểm từ trạng thái
                    value={studentGrades[student.student_code] || null}
                    onChange={(e) => handleGradeChange(student.student_code, e.target.value)}
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
