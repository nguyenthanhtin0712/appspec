import * as React from 'react';
import Box from '@mui/material/Box';
import { ArrowRight } from 'iconsax-react';
import { Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router';
import MainCard from 'components/MainCard';
import ResultTableAdmin from 'sections/admin/assignment_intern/ResultTableAdmin';
import JobholderItem from 'sections/admin/assignment_intern/JobholderItem';

const AssignmentIntern = () => {
  const theme = useTheme();
  const { Id } = useParams();
  console.log('id', Id);

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
          <Stack mb={3} spacing={1}>
            <Typography variant="h4" component="h1">
              Phân công thực tập học kỳ 1 năm 2023
            </Typography>
            <Stack direction="row" spacing={2} alignItems={'center'}>
              <Typography variant="h6">Từ 00:00 30/09/2023</Typography>
              <ArrowRight size="25" color={theme.palette.primary.main} />
              <Typography variant="h6">Đến 00:00 30/09/2023</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Box>
          <Stack spacing={2}>
            <ResultTableAdmin />
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <MainCard title="Danh sách phân công">
          <Stack justifyContent="space-between" flexWrap="wrap" spacing={1}>
            <JobholderItem name="Nguyễn Sang" total="10"></JobholderItem>
            <JobholderItem name="Nguyễn Sang" total="10"></JobholderItem>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default AssignmentIntern;
