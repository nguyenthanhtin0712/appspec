import ThemeCustomization from 'themes';
import { useLayoutEffect } from 'react';
import { getUserDataFromToken } from 'store/reducers/authSlice';
import Cookies from 'js-cookie';
import { dispatch } from 'store/index';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { ThemeRoutes } from 'routes';

const App = () => {
  useLayoutEffect(() => {
    const fetchUser = async () => {
      if (Cookies.get('token')) {
        await dispatch(getUserDataFromToken());
      }
    };
    fetchUser();
  }, []);

  const routes = createBrowserRouter(ThemeRoutes);

  return (
    <ThemeCustomization>
      <RouterProvider router={routes} />
    </ThemeCustomization>
  );
};

export default App;
