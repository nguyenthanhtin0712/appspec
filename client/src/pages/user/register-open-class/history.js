import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import MainCard from 'components/MainCard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { dispatch } from 'store';
import { getHistory } from 'store/slices/registerOpenClassSlice';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import LoadingBox from 'components/LoadingBox';
import EmptyBox from 'components/EmptyBox';

const RegisterOpenClassHistory = () => {
  useEffect(() => {
    const fetchHistory = async () => {
      await dispatch(getHistory());
    };
    fetchHistory();
  }, []);
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <MainCard title="Danh sách môn học bạn đã yêu cầu mở nhóm" sx={{ minHeight: 'calc(100vh - 100px)' }}>
        <OpenClassTableHistory />
      </MainCard>
    </Container>
  );
};

const OpenClassTableHistory = () => {
  const theme = useTheme();
  const { data, isLoading } = useSelector((state) => state.register_open_class.history);
  if (isLoading) return <LoadingBox height={300} />;
  if (data.length === 0) return <EmptyBox message="Bạn chưa yêu cầu mở môn học nào" />;
  return (
    <TableContainer
      component={Paper}
      sx={{
        border: '1px solid',
        borderColor: theme.palette.divider
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="Danh sách môn học bạn đã yêu cầu mở nhóm">
        <TableHead>
          <TableRow>
            <TableCell align="center">STT</TableCell>
            <TableCell align="center">Mã học phần</TableCell>
            <TableCell align="left">Tên học phần</TableCell>
            <TableCell align="center">Học kỳ</TableCell>
            <TableCell align="center">Năm học</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 &&
            data.map((row, index) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{row.subject_id}</TableCell>
                <TableCell align="left">{row.subject_name}</TableCell>
                <TableCell align="center">{row.semester}</TableCell>
                <TableCell align="center">{row.year}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RegisterOpenClassHistory;
