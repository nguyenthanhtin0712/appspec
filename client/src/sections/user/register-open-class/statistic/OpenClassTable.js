import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material';
import LoadingBox from 'components/LoadingBox';
import { useSelector } from 'react-redux';
import EmptyBox from 'components/EmptyBox';

const OpenClassTable = () => {
  const theme = useTheme();
  const { data, isLoading, query } = useSelector((state) => state.register_open_class.statistic);

  const dataDisplay = React.useMemo(() => {
    return data.filter((item) => item.subject_id.includes(query) || item.subject_name.toLowerCase().includes(query.toLowerCase()));
  }, [data, query]);

  if (isLoading) return <LoadingBox height={500} />;
  if (dataDisplay.length == 0) return <EmptyBox />;

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
          {dataDisplay.map((row, index) => (
            <TableRow key={row.subject_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" align="center">
                {index + 1}
              </TableCell>
              <TableCell align="center">{row.subject_id}</TableCell>
              <TableCell align="left">{row.subject_name}</TableCell>
              <TableCell align="center">{row.student_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OpenClassTable;
