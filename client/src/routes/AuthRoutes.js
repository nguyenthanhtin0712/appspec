import { lazy } from 'react';
import { checkToken } from 'store/slices/forgotpasswordSlice';
import { dispatch } from 'store/index';

// project-imports
import Loadable from 'components/Loadable';
import CommonLayout from 'layout/CommonLayout';
import AuthRoute from '../guards/AuthRoute';

// render - data display components
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/register')));
const ForgotPassword = Loadable(lazy(() => import('pages/auth/forgot-password')));
const ChangePassword = Loadable(lazy(() => import('pages/auth/change-password')));
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
    },
    {
      path: 'forgot-password',
      element: <ForgotPassword />
    },
    {
      path: 'change-password/:token',
      loader: async ({ params }) => {
        let token = params.token.split('=')[1];
        const value = { token: token };
        const result = await dispatch(checkToken(value));
        if (result.payload.status == 400) {
          throw new Response('Not Found', { status: 404 });
        }
        return null;
      },
      element: <ChangePassword />
    }
  ]
};

export default AuthRoutes;
