import { Button, Stack, Typography } from '@mui/material';
import WithPermission from 'guards/WithPermission';
import React from 'react';
import { Link } from 'react-router-dom';
import RoleTable from 'sections/admin/role/RoleTable';

const RoleIndex = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap">
        <Typography variant="h4">Quản lý phân quyền</Typography>
        <WithPermission requiredPermission={['role.create']}>
          <Button variant="contained" component={Link} to="./create">
            Thêm nhóm quyền
          </Button>
        </WithPermission>
      </Stack>
      <RoleTable />
    </>
  );
};

export default RoleIndex;
