import React from 'react';
import Container from '@mui/material/Container';
import MainCard from 'components/MainCard';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useSelector } from 'react-redux';
import 'assets/third-party/markdown.css';
import { useTheme } from '@mui/material';
import { formatDDMMYYYY } from 'utils/formatDateTime';

const JobDetail = () => {
  const theme = useTheme();
  const { job_post_title, job_post_desc, created_at } = useSelector((state) => state.job_post_home.viewData);

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <MainCard>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" href="/">
            Trang chủ
          </Link>
          <Link underline="hover" color="inherit" href="/jobs">
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
    </Container>
  );
};

export default JobDetail;
