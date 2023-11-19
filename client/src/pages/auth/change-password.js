import React from 'react';
import { Grid } from '@mui/material';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthChangePassword from 'sections/auth/auth-forms/AuthChangePassword';

const ChangePassword = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AuthChangePassword />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ChangePassword;
