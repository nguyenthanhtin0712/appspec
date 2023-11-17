import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import MainCard from 'components/MainCard';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import 'assets/third-party/markdown.css';
import { Box, useTheme } from '@mui/material';
import { formatDDMMYYYY } from 'utils/formatDateTime';
import { ArrowSquareRight } from 'iconsax-react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { dispatch } from 'store';
import { getRelatedPost } from 'store/slices/jobPostHomeSlice';
import LoadingBox from 'components/LoadingBox';

const JobDetail = () => {
  const theme = useTheme();
  const { job_post_title, job_post_desc, created_at } = useSelector((state) => state.job_post_home.viewData);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8.5}>
          <MainCard sx={{ minHeight: 'calc(100vh - 100px)' }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
                Trang chủ
              </Link>
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/jobs">
                Tuyển dụng
              </Link>
              <Typography color="text.primary">{job_post_title}</Typography>
            </Breadcrumbs>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                position: 'relative',
                mb: 2,
                fontWeight: 600,
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: '-5px',
                  background: theme.palette.primary.main,
                  width: '40px',
                  height: '3px'
                }
              }}
            >
              {job_post_title}
            </Typography>
            <Typography mb={2} fontStyle="italic">
              Đăng vào {formatDDMMYYYY(created_at)}
            </Typography>
            {<div className="markdown-body" dangerouslySetInnerHTML={{ __html: job_post_desc }} />}
          </MainCard>
        </Grid>
        <Grid item xs={12} md={3.5}>
          <RelatedPost />
        </Grid>
      </Grid>
    </Container>
  );
};

const RelatedPost = () => {
  const { relatedPost, viewData } = useSelector((state) => state.job_post_home);
  const { data, isLoading } = relatedPost;

  useEffect(() => {
    const fetchRelatedPost = async () => {
      await dispatch(getRelatedPost(viewData.job_post_id));
    };
    fetchRelatedPost();
  }, [viewData.job_post_id]);

  return (
    <MainCard title="Tin tuyển dụng gần đây">
      {isLoading ? (
        <LoadingBox />
      ) : (
        <Stack spacing={1}>
          {data.map((post) => (
            <RelatedPostItem key={post.job_post_id} info={post} />
          ))}
        </Stack>
      )}
    </MainCard>
  );
};

const LinkStyle = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  fontSize: '15px',
  fontWeight: '500',
  ':hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.main
  }
}));

const RelatedPostItem = ({ info }) => {
  const theme = useTheme();
  const { job_post_id, job_post_title } = info;
  return (
    <Stack direction="row" spacing={1} alignItems="flex-start">
      <Box>
        <ArrowSquareRight size="20" variant="Bulk" color={theme.palette.primary.main} />
      </Box>
      <LinkStyle to={`/jobs/${job_post_id}`}>{job_post_title}</LinkStyle>
    </Stack>
  );
};

export default JobDetail;
