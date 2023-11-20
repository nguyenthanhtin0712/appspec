import ThemeCustomization from 'themes';
import { useLayoutEffect } from 'react';
import { getUserDataFromToken } from 'store/slices/authSlice';
import { dispatch } from 'store/index';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { ThemeRoutes } from 'routes';
import { useSelector } from 'react-redux';
import { login_google } from 'store/slices/authSlice';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  useLayoutEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await dispatch(getUserDataFromToken());
        if (!result.payload) {
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

            const loginGoogle = () => {
              google.accounts.id.initialize({
                client_id: '387483545489-muknqkprotf0b41nlgai6msu2dqf8ftt.apps.googleusercontent.com',
                callback: handleCallbackResponse
              });
              google.accounts.id.prompt();
            };

            loginGoogle();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [isAuthenticated]);

  console.info(
    `%c
    ░█▀▀▀░█▀▀▀░█░░█
    ░▀▀▀█░█░▀█░█░░█
    ░▀▀▀▀░▀▀▀▀░▀▀▀▀
  `,
    'color: #0089e2'
  );

  const routes = createBrowserRouter(ThemeRoutes);

  return (
    <ThemeCustomization>
      <RouterProvider router={routes} />
    </ThemeCustomization>
  );
};

export default App;
