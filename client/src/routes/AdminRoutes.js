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
const RegisterInternPageCreate = Loadable(lazy(() => import('pages/admin/register-intern/register-intern-create')));
const RegisterInternPageEdit = Loadable(lazy(() => import('pages/admin/register-intern/register-intern-edit')));
const RegisterInternPageIndex = Loadable(lazy(() => import('pages/admin/register-intern/register-intern-index')));
const RegisterInternPageResult = Loadable(lazy(() => import('pages/admin/register-intern/register-intern-result')));
const AssignmentInternPageCreate = Loadable(lazy(() => import('pages/admin/assignment-intern/assignment-intern-create')));
const AssignmentInternPageEdit = Loadable(lazy(() => import('pages/admin/assignment-intern/assignment-intern-edit')));
const AssignmentInternPageIndex = Loadable(lazy(() => import('pages/admin/assignment-intern/assignment-intern-index')));
const AssignmentInternPageResult = Loadable(lazy(() => import('pages/admin/assignment-intern/assignment-intern-result')));
const SpecialtyPage = Loadable(lazy(() => import('pages/admin/specialty')));
const StudentPage = Loadable(lazy(() => import('pages/admin/student')));
const EmployerPage = Loadable(lazy(() => import('pages/admin/employer')));
const JobholderPage = Loadable(lazy(() => import('pages/admin/jobholder')));
const TitlePage = Loadable(lazy(() => import('pages/admin/title')));
const CompanyPage = Loadable(lazy(() => import('pages/admin/company')));
const DegreePage = Loadable(lazy(() => import('pages/admin/degree')));
const SubjectPage = Loadable(lazy(() => import('pages/admin/subject-page')));
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
      path: 'register_specialty/edit/:id',
      element: <PrivateRoute component={RegisterSpecialtyPageEdit} requiredPermissions={['major.view']} />
    },
    {
      path: 'register_specialty/:Id',
      element: <PrivateRoute component={RegisterSpecialtyPageResult} requiredPermissions={['major.view']} />
    },
    {
      path: 'register_intern',
      element: <PrivateRoute component={RegisterInternPageIndex} requiredPermissions={['register_intern.view']} />
    },
    {
      path: 'register_intern/create',
      element: <PrivateRoute component={RegisterInternPageCreate} requiredPermissions={['register_intern.view']} />
    },
    {
      path: 'register_intern_edit/:id',
      element: <PrivateRoute component={RegisterInternPageEdit} requiredPermissions={['register_intern.view']} />
    },
    {
      path: 'register_intern/:Id',
      element: <PrivateRoute component={AssignmentInternPageResult} requiredPermissions={['register_intern.view']} />
    },
    {
      path: 'assignment_intern',
      element: <PrivateRoute component={AssignmentInternPageIndex} requiredPermissions={[]} />
    },
    {
      path: 'assignment_intern/create',
      element: <PrivateRoute component={AssignmentInternPageCreate} requiredPermissions={[]} />
    },
    {
      path: 'assignment_intern_edit/:id',
      element: <PrivateRoute component={AssignmentInternPageEdit} requiredPermissions={[]} />
    },
    {
      path: 'assignment_intern/:Id',
      element: <PrivateRoute component={RegisterInternPageResult} requiredPermissions={[]} />
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
      path: 'employer',
      element: <PrivateRoute component={EmployerPage} requiredPermissions={['employer.view']} />
    },
    {
      path: 'jobhodler',
      element: <PrivateRoute component={JobholderPage} requiredPermissions={['jobholder.view']} />
    },
    {
      path: 'title',
      element: <PrivateRoute component={TitlePage} requiredPermissions={['title.view']} />
    },
    {
      path: 'company',
      element: <PrivateRoute component={CompanyPage} requiredPermissions={[]} />
    },
    {
      path: 'degree',
      element: <PrivateRoute component={DegreePage} requiredPermissions={['degree.view']} />
    },
    {
      path: 'page',
      element: <PrivateRoute component={Page} requiredPermissions={['student.view']} />
    },
    {
      path: 'subject',
      element: <PrivateRoute component={SubjectPage} requiredPermissions={['subject.view']} />
    },
    {
      path: 'page/create',
      element: <PrivateRoute component={PageCreate} requiredPermissions={['student.view']} />
    }
  ]
};

export default AdminRoutes;
