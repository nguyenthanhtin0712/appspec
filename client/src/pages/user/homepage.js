import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import BannerSection from 'sections/user/homepage/Banner';
import FeatureContainer from 'sections/user/homepage/FeatureContainer';
import { dispatch } from 'store/index';
import { login_google } from 'store/slices/authSlice';
import { toast } from 'react-toastify';

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isAuthenticated) {
      const handleCallbackResponse = async (response) => {
        var userObject = jwtDecode(response.credential);
        const value = { user_email: userObject.email };
        try {
          const result = await dispatch(login_google(value));
          if (result && !result.error) {
            toast.success('Đăng nhập thành công');
          } else {
            toast.error(result.payload.message);
          }
        } catch (err) {
          console.error(err);
        }
      };
      const loginGoolge = () => {
        google.accounts.id.initialize({
          client_id: '387483545489-muknqkprotf0b41nlgai6msu2dqf8ftt.apps.googleusercontent.com',
          callback: handleCallbackResponse
        });
        google.accounts.id.prompt();
      };
      loginGoolge();
    }
  }, [isAuthenticated]);

  return (
    <>
      <BannerSection />
      <FeatureContainer />
    </>
  );
};

export default HomePage;
