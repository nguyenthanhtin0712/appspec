import React from 'react';
import { Add } from 'iconsax-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ManageJobPostTable from 'sections/admin/manage-job-post/ManageJobPostTable';
import JobPostDeleteDialog from 'sections/admin/manage-job-post/ManageJobPostDeleteDialog';
import ConfirmJobPostDialog from 'sections/admin/manage-job-post/ConfirmJobPostDialog';
import WithPermission from 'guards/WithPermission';

const JobPostManage = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Quản lý bài đăng tuyển dụng</Typography>
        <WithPermission requiredPermission={['job_post.create']}>
          <Button variant="contained" component={Link} to="/admin/job-post/create" startIcon={<Add />}>
            Đăng tin
          </Button>
        </WithPermission>
      </Stack>
      <ManageJobPostTable />
      <JobPostDeleteDialog />
      <ConfirmJobPostDialog />
    </>
  );
};

export default JobPostManage;
