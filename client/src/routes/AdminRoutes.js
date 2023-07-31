import { lazy } from 'react';

// project-imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import PrivateRoute from './route/PrivateRoute';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/admin/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/admin/sample')));
const MajorPage = Loadable(lazy(() => import('pages/admin/major')));
const RegisterSpecialtyPageCreate = Loadable(lazy(() => import('pages/admin/register_specialty/register_specialty_create')));
const RegisterSpecialtyPageIndex = Loadable(lazy(() => import('pages/admin/register_specialty/register_specialty_index')));
const SpecialtyPage = Loadable(lazy(() => import('pages/admin/specialty')));
const StudentPage = Loadable(lazy(() => import('pages/admin/student')));
const Page = Loadable(lazy(() => import('pages/admin/page/page_index')));
const PageCreate = Loadable(lazy(() => import('pages/admin/page/page_create')));

const AdminRoutes = {
  path: '/admin',
  element: <MainLayout />,
  children: [
    {
      path: '',
      element: <PrivateRoute component={DashboardDefault} requiredPermissions={['major.view']} />
    },
    {
      path: 'dashboard',
      element: <PrivateRoute component={DashboardDefault} requiredPermissions={['major.view']} />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'major',
      element: <PrivateRoute component={MajorPage} requiredPermissions={['major.view']} />
    },
    {
      path: 'register_specialty',
      element: <PrivateRoute component={RegisterSpecialtyPageIndex} requiredPermissions={['major.view']} />,
      children: []
    },
    {
      path: 'register_specialty/create',
      element: <PrivateRoute component={RegisterSpecialtyPageCreate} requiredPermissions={['major.view']} />,
      children: []
    },
    {
      path: 'specialty',
      element: <PrivateRoute component={SpecialtyPage} requiredPermissions={['specialty.view']} />
    },
    {
      path: 'student',
      element: <PrivateRoute component={StudentPage} requiredPermissions={['student.view']} />
    },
    {
      path: 'page',
      element: <PrivateRoute component={Page} requiredPermissions={['student.view']} />
    },
    {
      path: 'page/create',
      element: <PrivateRoute component={PageCreate} requiredPermissions={['student.view']} />
    }
  ]
};

export default AdminRoutes;
