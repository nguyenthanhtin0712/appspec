/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Grid, Pagination, Skeleton, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { fetchListJobPost, setPagination } from 'store/slices/jobPostHomeSlice';
import { formatDDMMYYYY } from 'utils/formatDateTime';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const { page, query, data, isLoading, total_page } = useSelector((state) => state.job_post_home);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchListJobPost({ query, page }));
    };
    fetch();
  }, [page, query]);

  if (isLoading) {
    const numSkeletons = 9;
    const skeletonItems = Array.from({ length: numSkeletons }, (_, index) => (
      <Grid item key={index} xs={4}>
        <JobItemSkeleton />
      </Grid>
    ));

    return (
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Grid container spacing={2} alignItems="stretch">
          {skeletonItems}
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      {data && (
        <Grid container spacing={2}>
          {data.length > 0 &&
            data.map((post) => (
              <Grid item key={post.job_post_id} xs={4}>
                <JobItem info={post} />
              </Grid>
            ))}
        </Grid>
      )}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={total_page}
          page={page}
          onChange={(event, value) => {
            dispatch(setPagination(value));
          }}
          color="primary"
          variant="outlined"
        />
      </Box>
    </Container>
  );
};

const JobItem = ({ info }) => {
  const { job_post_id, job_post_title, job_post_desc, created_at } = info;
  const theme = useTheme();
  return (
    <Box
      bgcolor={'secondary.lighter'}
      p={3}
      sx={{
        border: '1px solid',
        borderRadius: 1.5,
        borderColor: theme.palette.divider,
        height: '100%'
      }}
    >
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography
            component={Link}
            variant="h4"
            color="inherit"
            sx={{
              textDecoration: 'none',
              ':hover': {
                textDecoration: 'underline'
              }
            }}
            to={`/jobs/${job_post_id}`}
          >
            {job_post_title}
          </Typography>
          <Typography color="secondary.main" fontWeight="500">
            Đăng vào {formatDDMMYYYY(created_at)}
          </Typography>
          <Typography>{job_post_desc}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

const JobItemSkeleton = () => {
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
        <Stack spacing={0.5}>
          <Typography variant="h4">
            <Skeleton />
            <Skeleton />
          </Typography>
          <Typography>
            <Skeleton width={100} />
          </Typography>
          <Typography>
            <Skeleton />
          </Typography>
          <Typography>
            <Skeleton />
          </Typography>
          <Typography>
            <Skeleton />
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Jobs;
