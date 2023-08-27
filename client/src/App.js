import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { useLayoutEffect } from 'react';
import { getUserDataFromToken } from 'store/reducers/authSlice';
import Cookies from 'js-cookie';
import { dispatch } from 'store/index';

const App = () => {
  useLayoutEffect(() => {
    const fetchUser = async () => {
      if (Cookies.get('token')) {
        await dispatch(getUserDataFromToken());
      }
    };
    fetchUser();
  }, []);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
