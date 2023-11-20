import { Grid, Stack, Typography } from '@mui/material';
import Logo from 'components/logo';
// import AuthSocButton from 'sections/auth/AuthSocButton';
// import AuthDivider from 'sections/auth/AuthDivider';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';
import AuthDivider from 'sections/auth/AuthDivider';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { dispatch } from 'store/index';
import { login_google } from 'store/slices/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();

  const handleCallbackResponse = async (response) => {
    var userObject = jwtDecode(response.credential);
    const value = { user_email: userObject.email };
    try {
      const result = await dispatch(login_google(value));
      if (result && !result.error) {
        toast.success('Đăng nhập thành công');
        navigate('/');
      } else {
        toast.error(result.payload.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '387483545489-muknqkprotf0b41nlgai6msu2dqf8ftt.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), { theme: 'outline', size: 'large' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Logo />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="center" alignItems="center">
                <div id="signInDiv"></div>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <AuthDivider>
            <Typography variant="body1">OR</Typography>
          </AuthDivider>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h4">Đăng nhập</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
