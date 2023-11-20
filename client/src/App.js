import ThemeCustomization from 'themes';
import { useLayoutEffect } from 'react';
import { getUserDataFromToken } from 'store/slices/authSlice';
import { dispatch } from 'store/index';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { ThemeRoutes } from 'routes';
import { useSelector } from 'react-redux';
import { checkLoginGoogle } from 'utils/loginGoogle';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  useLayoutEffect(() => {
    const fetchUser = async () => {
      const result = await dispatch(getUserDataFromToken());
      if (!result.payload) {
        if (!isAuthenticated) {
          checkLoginGoogle();
        }
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
