import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import LoadingBox from 'components/LoadingBox';
import EmptyBox from 'components/EmptyBox';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';

const LookUpTable = () => {
  const theme = useTheme();
  const { data, isLoading } = useSelector((state) => state.warned_student.lookUpDialog);
  console.log(isLoading, data);
  if (isLoading) return <LoadingBox height={235} />;
  if (data.length === 0) return <EmptyBox message="Không tìm thấy dữ liệu" />;
  return (
    <TableContainer
      component={Paper}
      sx={{
        border: '1px solid',
        borderColor: theme.palette.divider
      }}
    >
      <Table sx={{ minHeight: '230px' }} aria-label="Danh sách sinh viên">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">STT</TableCell>
            <TableCell align="center">Mã SV</TableCell>
            <TableCell align="left">Họ tên</TableCell>
            <TableCell align="center">Ngày sinh</TableCell>
            <TableCell align="center">Số lần CB</TableCell>
            <TableCell align="center">Lớp</TableCell>
            <TableCell align="center">Ngành</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{data.length > 0 && data.map((row, index) => <Row key={row.student_code} row={row} index={index} />)}</TableBody>
      </Table>
    </TableContainer>
  );
};

const Row = ({ row, index }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow key={row.student_code} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <ArrowUp2 /> : <ArrowDown2 />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {index + 1}
        </TableCell>
        <TableCell align="center">{row.student_code}</TableCell>
        <TableCell align="left">{row.user_firstname + ' ' + row.user_lastname}</TableCell>
        <TableCell align="center">{row.user_birthday}</TableCell>
        <TableCell align="center">{row.detail.length}</TableCell>
        <TableCell align="center">{row.student_class}</TableCell>
        <TableCell align="center">{row.major_id}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0, width: '100%' }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <TableContainer
                component={Paper}
                sx={{
                  border: '1px solid',
                  borderColor: theme.palette.divider
                }}
              >
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">#</TableCell>
                      <TableCell align="center">HK</TableCell>
                      <TableCell align="center">NH</TableCell>
                      <TableCell align="center">Điểm TB HK</TableCell>
                      <TableCell align="center">Điểm TB TL</TableCell>
                      <TableCell align="center">SỐ LẦN CB</TableCell>
                      <TableCell align="center">Kết quả</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.detail.map((dt, index) => (
                      <TableRow key={dt.warned_dismissed_student_id}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{dt.openclass_time_semester}</TableCell>
                        <TableCell align="center">{dt.openclass_time_year}</TableCell>
                        <TableCell align="center">{dt.semester_gpa}</TableCell>
                        <TableCell align="center">{dt.cumulative_gpa}</TableCell>
                        <TableCell align="center">{dt.total_warning_count}</TableCell>
                        <TableCell align="center">{dt.result}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default LookUpTable;
