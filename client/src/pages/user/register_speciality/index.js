import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Calendar, Chart, InfoCircle, Stickynote, Call, Check, MedalStar } from 'iconsax-react';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoItem from 'sections/user/register_speciality/index/InfoItem';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Hệ thống thông tin', 159, 6.0, 24, 4.0),
  createData('Kỹ thuật phần mềm', 237, 9.0, 37, 4.3),
  createData('Kỹ thuật máy tính', 262, 16.0, 24, 6.0),
  createData('Khoa học máy tính', 305, 3.7, 67, 4.3)
];

const Register_speciality = () => {
  const theme = useTheme();
  return (
    <Box component={Container} maxWidth="lg" sx={{ p: 3, pt: 0, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} mx="auto">
          <MainCard title="Thông tin đăng ký chuyên ngành">
            <Box sx={{ borderBottom: '1px solid', borderColor: theme.palette.divider, pb: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <Calendar size="20" color={theme.palette.primary.main} />
                <Typography variant="h6">Lịch đăng ký</Typography>
              </Stack>
              <Stack ml={4}>
                <Typography variant="h6">Thời gian bắt đầu: 28-05-23 12:00 AM</Typography>
                <Typography variant="h6">Thời gian kết thúc: 10-06-23 4:00 PM</Typography>
              </Stack>
            </Box>
            <Box sx={{ borderBottom: '1px solid', borderColor: theme.palette.divider, py: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <Chart size="20" color={theme.palette.primary.main} />
                <Typography variant="h6">Thống kê</Typography>
              </Stack>
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
                    {rows.map((row) => (
                      <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.calories}</TableCell>
                        <TableCell align="center">{row.fat}</TableCell>
                        <TableCell align="center">{row.carbs}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box sx={{ borderBottom: '1px solid', borderColor: theme.palette.divider, py: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <InfoCircle size="20" color={theme.palette.primary.main} />
                <Typography variant="h6">Thông tin</Typography>
              </Stack>
              <Grid container spacing={2}>
                <InfoItem
                  href="/"
                  title="Hướng dẫn đăng ký chuyên ngành"
                  icon={<Stickynote size="32" color={theme.palette.primary.main} />}
                />
                <InfoItem href="/" title="Điều lệ đăng ký chuyên ngành" icon={<Check size="32" color={theme.palette.primary.main} />} />
                <InfoItem href="/" title="Kết quả đăng ký chuyên ngành" icon={<MedalStar size="32" color={theme.palette.primary.main} />} />
                <InfoItem href="/" title="Liên hệ với Ban quản trị website" icon={<Call size="32" color={theme.palette.primary.main} />} />
              </Grid>
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register_speciality;
