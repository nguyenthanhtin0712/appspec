import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import AuthWrapper from 'sections/auth/AuthWrapper';
import { Link } from 'react-router-dom';
import AuthForgotPassword from 'sections/auth/auth-forms/AuthForgotPassword';

const ForgotPassword = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h4">Quên mật khẩu</Typography>
            <Typography component={Link} to="/auth/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Đăng nhập
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthForgotPassword />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ForgotPassword;
