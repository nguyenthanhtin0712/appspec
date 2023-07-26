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
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        position: 'BackEnd',
        position_request: '20',
        position_request_apply: 'GPA 3.2',
        remain: 10
      },
      {
        position: 'FontEnd',
        position_request: '12',
        position_request_apply: 'GPA 3.2',
        remain: 6
      }
    ]
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.calories}</TableCell>
        <TableCell align="center">{row.fat}</TableCell>
        <TableCell align="center">{row.carbs}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Chi tiết
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Vị trí</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell align="left">Yêu cầu</TableCell>
                    <TableCell align="center">Còn lại</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.position}>
                      <TableCell>{historyRow.position}</TableCell>
                      <TableCell>{historyRow.position_request}</TableCell>
                      <TableCell align="left">{historyRow.position_request_apply}</TableCell>
                      <TableCell align="center">{historyRow.remain}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box
                sx={{
                  mt: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h4">Mô tả công việc</Typography>
                <ul>
                  <li>
                    Tham gia phát triển phần mềm cho các hệ thống và giải pháp trong lĩnh vực: Điều khiển không lưu, An ninh công cộng, An
                    ninh quốc phòng,…
                  </li>
                  <li>Tham gia đầy đủ quá trình phát triển phần mềm từ phân tích thiết kế, lập trình đến kiểm thử chất lượng phần mềm.</li>
                  <li>Tham gia các hoạt động code reviews, team meeting,…</li>
                  <li>Áp dụng clean code trong phát triển phần mềm, đảm bảo phần mềm linh hoạt, dễ bảo trì và dễ mở rộng.</li>
                </ul>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        position_request_apply: PropTypes.number.isRequired,
        position_request: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired
  }).isRequired
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

const Register_speciality = () => {
  const theme = useTheme();
  return (
    <Box component={Container} maxWidth="lg" sx={{ p: 3, pt: 0, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} mx="auto">
          <MainCard title="Thông tin đăng ký thực tập">
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
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Tên công ty</TableCell>
                      <TableCell align="center">Tối đa</TableCell>
                      <TableCell align="center">Đang ứng tuyển</TableCell>
                      <TableCell align="center">Còn lai</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <Row key={row.name} row={row} />
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
                <InfoItem href="/" title="Hướng dẫn đăng ký thực tập" icon={<Stickynote size="32" color={theme.palette.primary.main} />} />
                <InfoItem href="/" title="Điều lệ đăng ký thực tập" icon={<Check size="32" color={theme.palette.primary.main} />} />
                <InfoItem href="/" title="Kết quả đăng ký thực tập" icon={<MedalStar size="32" color={theme.palette.primary.main} />} />
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
