import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import HoverPopperPopupState from 'sections/user/register_internship/HoverPopperPopupState';
import InternPosition from 'sections/user/register_internship/InternPosition';
import { useTheme } from '@mui/material';

const CompanyItem = () => {
  const theme = useTheme();

  return (
    <Grid item xs={12} md={4} sm={6}>
      <Box sx={{ p: 2, border: '1px solid', borderRadius: 1.5, borderColor: theme.palette.divider }}>
        <HoverPopperPopupState />
        <Stack spacing={2}>
          <InternPosition name="FrontEnd Developer" />
          <InternPosition name="Backend Developer" />
          <InternPosition name="FullStack Developer" />
        </Stack>
      </Box>
    </Grid>
  );
};

export default CompanyItem;
