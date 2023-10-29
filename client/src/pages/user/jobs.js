/* eslint-disable no-unused-vars */
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Briefcase } from 'iconsax-react';
import { Grid, Link, Pagination, Typography, useTheme } from '@mui/material';

const Jobs = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <JobItem />
        </Grid>
        <Grid item xs={4}>
          <JobItem />
        </Grid>
        <Grid item xs={4}>
          <JobItem />
        </Grid>
        <Grid item xs={4}>
          <JobItem />
        </Grid>
        <Grid item xs={4}>
          <JobItem />
        </Grid>
        <Grid item xs={4}>
          <JobItem />
        </Grid>
        <Grid item xs={4}>
          <JobItem />
        </Grid>
        <Grid item xs={4}>
          <JobItem />
        </Grid>
        <Grid item xs={4}>
          <JobItem />
        </Grid>
        <Grid item xs={4}>
          <JobItem />
        </Grid>
        <Grid item xs={4}>
          <JobItem />
        </Grid>
        <Grid item xs={4}>
          <JobItem />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination count={10} page={page} onChange={handleChange} color="primary" variant="outlined" />
      </Box>
    </Container>
  );
};

const JobItem = () => {
  const theme = useTheme();
  return (
    <Box
      bgcolor={'secondary.lighter'}
      p={3}
      sx={{
        border: '1px solid',
        borderRadius: 1.5,
        borderColor: theme.palette.divider
      }}
    >
      <Stack spacing={2}>
        {/* <Box>
          <Briefcase variant="Bulk" size="40" color={theme.palette.primary.main} />
        </Box> */}
        <Stack spacing={1}>
          <Typography component={Link} variant="h4" color="inherit" href="#" underline="hover">
            Tuyển 100 công nhân lập trình
          </Typography>
          <Typography color="secondary.main" fontWeight="500">
            Đăng vào 29/10/2023
          </Typography>
          <Typography>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ducimus deserunt suscipit numquam reprehenderit quam odit
            illo iure quia saepe?
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Jobs;
