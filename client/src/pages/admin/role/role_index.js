import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const RoleIndex = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap">
        <Typography variant="h4">Quản lý phân quyền</Typography>
        <Button variant="contained" component={Link} to="./create">
          Thêm nhóm quyền
        </Button>
      </Stack>
    </>
  );
};

export default RoleIndex;
