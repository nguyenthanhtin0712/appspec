import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import GradingTable from 'sections/admin/grading/gradingTable';

const RoleIndex = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap">
        <Typography variant="h4">Quản lý điểm cho sinh viên</Typography>
      </Stack>
      <GradingTable />
    </>
  );
};

export default RoleIndex;
