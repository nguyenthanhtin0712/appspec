import { useRoutes } from 'react-router-dom';

import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';
import AuthRoutes from './AuthRoutes';
import ErrorRoutes from './ErrorRoutes';

export default function ThemeRoutes() {
  return useRoutes([AdminRoutes, UserRoutes, AuthRoutes, ErrorRoutes]);
}
