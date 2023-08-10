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
const ConfigPage = Loadable(lazy(() => import('pages/admin/config-page')));
const RegisterSpecialtyPageCreate = Loadable(lazy(() => import('pages/admin/register-specialty/register-specialty-create')));
const RegisterSpecialtyPageEdit = Loadable(lazy(() => import('pages/admin/register-specialty/register-specialty-edit')));
const RegisterSpecialtyPageIndex = Loadable(lazy(() => import('pages/admin/register-specialty/register-specialty-index')));
const RegisterSpecialtyPageResult = Loadable(lazy(() => import('pages/admin/register-specialty/register-specialty-result')));
const SpecialtyPage = Loadable(lazy(() => import('pages/admin/specialty')));
const StudentPage = Loadable(lazy(() => import('pages/admin/student')));
const TeacherPage = Loadable(lazy(() => import('pages/admin/teacher')));
const EmployerPage = Loadable(lazy(() => import('pages/admin/employer')));
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
      path: 'config',
      element: <ConfigPage />
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
      element: <PrivateRoute component={RegisterSpecialtyPageIndex} requiredPermissions={['major.view']} />
    },
    {
      path: 'register_specialty/create',
      element: <PrivateRoute component={RegisterSpecialtyPageCreate} requiredPermissions={['major.view']} />
    },
    {
      path: 'register_specialty_edit/:id',
      element: <PrivateRoute component={RegisterSpecialtyPageEdit} requiredPermissions={['major.view']} />
    },
    {
      path: 'register_specialty/:Id',
      element: <PrivateRoute component={RegisterSpecialtyPageResult} requiredPermissions={['major.view']} />
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
      path: 'teacher',
      element: <PrivateRoute component={TeacherPage} requiredPermissions={['teacher.view']} />
    },
    {
      path: 'employer',
      element: <PrivateRoute component={EmployerPage} requiredPermissions={['employer.view']} />
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
