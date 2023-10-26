import ScrollTop from 'components/ScrollTop';
import { Outlet } from 'react-router-dom';

// ==============================|| MINIMAL LAYOUT ||============================== //

const CommonLayout = () => {
  return (
    <>
      <ScrollTop />
      <Outlet />;
    </>
  );
};

export default CommonLayout;
