import React, { useEffect } from 'react';
import { Stack, Button, Typography, Chip } from '@mui/material';
import MainCard from 'components/MainCard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ArrowCircleRight2 } from 'iconsax-react';
import { getRecentJobPost } from 'store/slices/dashboardSlice';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import LoadingBox from 'components/LoadingBox';
import { formatDateTimeDisplay } from 'utils/formatDateTime';
import getJobPostStatus from 'utils/getJobPostStatus';
import { Link } from 'react-router-dom';

const RecentJobPost = () => {
  const recentJobPost = useSelector((state) => state.dashboard.recentJobPost);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getRecentJobPost());
    };
    fetchData();
  }, []);

  return (
    <MainCard contentSX={{ px: 0 }}>
      <Typography variant="h5" marginBottom={2} marginLeft={2}>
        Bài đăng tuyển dụng gần đây
      </Typography>
      {recentJobPost.isLoading ? (
        <LoadingBox height={400} />
      ) : (
        <>
          <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tiêu đề</TableCell>
                  <TableCell>Người đăng</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Thời gian tạo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentJobPost.data.map((row) => (
                  <TableRow key={row.job_post_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.job_post_title}
                    </TableCell>
                    <TableCell>{row.author_name}</TableCell>
                    <TableCell>
                      <JobBadge value={row.job_post_confirm} />
                    </TableCell>
                    <TableCell>{formatDateTimeDisplay(row.updated_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="dashed"
              component={Link}
              to="./manage-job-post"
              color="success"
              sx={{ mt: 2, mr: 2 }}
              size="small"
              endIcon={<ArrowCircleRight2 />}
            >
              Xem tất cả
            </Button>
          </Stack>
        </>
      )}
    </MainCard>
  );
};

const JobBadge = ({ value }) => {
  const variant = getJobPostStatus(value);
  return <Chip label={variant.text} color={variant.color} />;
};

export default RecentJobPost;
