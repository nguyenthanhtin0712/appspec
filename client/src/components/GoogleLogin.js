import React from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { dispatch } from 'store/index';
import { loginGoogle } from 'store/slices/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const handleCallbackResponse = async (response) => {
    var userObject = jwtDecode(response.credential);
    const value = { user_email: userObject.email };
    try {
      const result = await dispatch(loginGoogle(value));
      if (result && !result.error) {
        toast.success('Đăng nhập thành công');
        navigate('/');
      } else {
        toast.error('Vui lòng liên kết email với tài khoản!');
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
  return <div id="signInDiv"></div>;
};

export default GoogleLogin;
