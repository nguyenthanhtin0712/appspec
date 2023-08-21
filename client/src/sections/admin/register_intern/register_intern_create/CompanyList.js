import React from 'react';
import { SearchNormal1 } from 'iconsax-react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const CompanyList = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Danh sách công ty</Typography>
        <Button startIcon={<SearchNormal1 />} variant="contained" color="success">
          Chọn công ty
        </Button>
      </Stack>
    </>
  );
};

export default CompanyList;
