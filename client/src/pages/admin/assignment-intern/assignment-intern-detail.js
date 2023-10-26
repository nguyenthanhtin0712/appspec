import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { dispatch } from 'store/index';
import { getRegisterInternship } from 'store/reducers/assignmentInternshipDetail';
import { Box, Button, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ArrowRight, Printer } from 'iconsax-react';
import { useTheme } from '@mui/material/styles';
import { formatDDMMYYYY } from 'utils/formatDateTime';
import ResultTableAdmin from 'sections/admin/assignment-intern-detail/ResultTableAdmin';
import { setId } from 'store/reducers/assignmentInternshipDetail';

const AssignmentInternDetail = () => {
  const { Id } = useParams();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { info } = useSelector((state) => state.assignment_internship_detail);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    dispatch(setId(Id));
    dispatch(getRegisterInternship(Id));
  }, [Id]);

  if (!info) return null;
  console.log('info', info);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
        <Stack mb={3} spacing={1}>
          <Typography variant="h4" component="h1">
            Thực tập năm {info.openclasstime.openclass_time_year} học kì {info.openclasstime.openclass_time_semester}
          </Typography>
          <Stack direction="row" spacing={2} alignItems={'center'}>
            <Typography variant="h6">Từ {formatDDMMYYYY(info.internship_graduation_start_date)}</Typography>
            <ArrowRight size="25" color={theme.palette.primary.main} />
            <Typography variant="h6">Đến {formatDDMMYYYY(info.internship_graduation_end_date)}</Typography>
          </Stack>
        </Stack>
        <Box my="auto">
          <Button
            variant="contained"
            color="success"
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            startIcon={<Printer />}
          >
            Xuất dữ liệu
          </Button>
        </Box>
      </Stack>
      <ResultTableAdmin />
    </>
  );
};

export default AssignmentInternDetail;
