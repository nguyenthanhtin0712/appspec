import React from 'react';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import JobPostTable from 'sections/admin/job-post/ManageJobPostTable';
import JobPostDeleteDialog from 'sections/admin/job-post/JobPostDeleteDialog';

const JobPostIndex = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Quản lý bài đăng tuyển dụng</Typography>
        <Button variant="contained" component={Link} to="/admin/job-post/create" startIcon={<Add />}>
          Đăng tin
        </Button>
      </Stack>
      <JobPostTable />
      <JobPostDeleteDialog />
    </>
  );
};

export default JobPostIndex;
