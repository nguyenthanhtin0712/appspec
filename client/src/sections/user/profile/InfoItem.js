import { Grid, Typography } from '@mui/material';
import React from 'react';

const InfoItem = ({ label, value }) => {
  return (
    <>
      <Grid item xs={6}>
        <Typography variant="h6">{label}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">{value}</Typography>
      </Grid>
    </>
  );
};

export default InfoItem;
