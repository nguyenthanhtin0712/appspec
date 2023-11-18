import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import CommonLayout from 'layout/CommonLayout';
import AuthRoute from '../guards/AuthRoute';

// render - data display components
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/register')));
// ==============================|| COMPONENTS ROUTES ||============================== //

const AuthRoutes = {
  path: '/auth',
  element: <AuthRoute component={CommonLayout} />,
  children: [
    {
      path: 'login',
      element: <AuthLogin />
    },
    {
      path: 'register',
      element: <AuthRegister />
    }
  ]
};

export default AuthRoutes;
