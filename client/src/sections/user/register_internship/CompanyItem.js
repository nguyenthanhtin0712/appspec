import { Box, Grid, useTheme } from '@mui/material';
import React from 'react';
import HoverPopperPopupState from 'sections/user/register_internship/HoverPopperPopupState';
import ListInternPosition from 'sections/user/register_internship/ListInternPosition';

const CompanyItem = ({ data }) => {
  const theme = useTheme();
  return (
    <Grid item xs={12} md={4} sm={6}>
      <Box sx={{ p: 2, border: '1px solid', borderRadius: 1.5, borderColor: theme.palette.divider }}>
        <HoverPopperPopupState data={data} />
        <ListInternPosition positions={data?.list_position}></ListInternPosition>
      </Box>
    </Grid>
  );
};

export default CompanyItem;
