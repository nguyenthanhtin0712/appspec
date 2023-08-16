import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { useEffect } from 'react';
import { getUserDataFromToken } from 'store/reducers/authSlice';
import Cookies from 'js-cookie';
import { dispatch } from 'store/index';
import LoadingScreen from 'components/LoadingScreen';
import { useSelector } from 'react-redux';

const App = () => {
  const isLoaded = useSelector((state) => state.auth.isLoaded);
  useEffect(() => {
    const fetchUser = async () => {
      if (Cookies.get('token')) {
        await dispatch(getUserDataFromToken());
      }
    };
    fetchUser();
  }, []);

  if (!isLoaded) return <LoadingScreen></LoadingScreen>;

  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
