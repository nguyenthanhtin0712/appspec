import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';

// render - data display components
const Page404 = Loadable(lazy(() => import('pages/error/page404')));
// ==============================|| COMPONENTS ROUTES ||============================== //

const ErrorRoutes = {
  path: '*',
  element: <Page404 />
};

export default ErrorRoutes;
