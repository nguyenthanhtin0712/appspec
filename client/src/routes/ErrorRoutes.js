import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';

// render - data display components
const Page404 = Loadable(lazy(() => import('pages/error/page404')));
const Page403 = Loadable(lazy(() => import('pages/error/Page403')));
// ==============================|| COMPONENTS ROUTES ||============================== //

const ErrorRoutes = {
  path: 'error',
  children: [
    {
      path: '404',
      element: <Page404 />
    },
    {
      path: '403',
      element: <Page403 />
    }
  ]
};

export default ErrorRoutes;
