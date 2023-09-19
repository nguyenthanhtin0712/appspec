import * as React from 'react';
import Box from '@mui/material/Box';
import { ArrowRight } from 'iconsax-react';
import { Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router';
import ResultTableAdmin from 'sections/admin/assignment_intern/ResultTableAdmin';
import { dispatch } from 'store/index';
import { getRegisterInternship, setAssignmentInternId } from 'store/reducers/assignmentIntenship';
import { useSelector } from 'react-redux';
import { formatDDMMYYYY } from 'utils/formatDateTime';
import AssignmentInternForm from 'sections/admin/assignment_intern/AssignmentInternForm';

const AssignmentIntern = () => {
  const theme = useTheme();
  const { Id } = useParams();
  const { assignment_intern } = useSelector((state) => state.assignment_internship);
  React.useEffect(() => {
    const getAssignmentIntern = async () => {
      await dispatch(setAssignmentInternId(Id));
      await dispatch(getRegisterInternship(Id));
    };
    getAssignmentIntern();
  }, [Id]);
  if (!assignment_intern) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
          <Stack mb={3} spacing={1}>
            <Typography variant="h4" component="h1">
              Phân công thực tập học kỳ {assignment_intern.openclasstime.openclass_time_semester} năm{' '}
              {assignment_intern.openclasstime.openclass_time_year}
            </Typography>
            <Stack direction="row" spacing={2} alignItems={'center'}>
              <Typography variant="h6">Từ {formatDDMMYYYY(assignment_intern.internship_graduation_start_date)}</Typography>
              <ArrowRight size="25" color={theme.palette.primary.main} />
              <Typography variant="h6">Đến {formatDDMMYYYY(assignment_intern.internship_graduation_end_date)}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Box>
          <Stack spacing={2}>
            <ResultTableAdmin />
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <AssignmentInternForm />
      </Grid>
    </Grid>
  );
};

export default AssignmentIntern;
