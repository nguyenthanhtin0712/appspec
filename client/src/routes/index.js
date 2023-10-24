import UserRoutes from 'routes/UserRoutes';
import AdminRoutes from './AdminRoutes';
import AuthRoutes from 'routes/AuthRoutes';
import ErrorRoutes from 'routes/ErrorRoutes';

export const ThemeRoutes = [UserRoutes, AdminRoutes, AuthRoutes, ErrorRoutes];
