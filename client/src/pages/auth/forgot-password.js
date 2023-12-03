import React from 'react';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import AuthWrapper from 'sections/auth/AuthWrapper';
import { Link } from 'react-router-dom';
import AuthForgotPassword from 'sections/auth/auth-forms/AuthForgotPassword';
import SentIcon from 'assets/SentIcon';
import { useSelector } from 'react-redux';

const ForgotPassword = () => {
  const { sendSuccess, email } = useSelector((state) => state.forgotpassword);
  return (
    <AuthWrapper>
      {sendSuccess ? (
        <Box sx={{ textAlign: 'center' }}>
          <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />
          <Typography variant="h3" gutterBottom>
            Request sent successfully
          </Typography>
          <Typography>
            We have sent a confirmation email to &nbsp;
            <strong>{email}</strong>
            <br />
            Please check your email.
          </Typography>
          <Button size="large" variant="contained" component={Link} to="/" sx={{ mt: 5 }}>
            Back
          </Button>
        </Box>
      ) : (
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
      )}
    </AuthWrapper>
  );
};

export default ForgotPassword;
