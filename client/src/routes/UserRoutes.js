import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import HomeLayout from 'layout/HomeLayout';
import PrivateRoute from './route/PrivateRoute';

// render - data display components
const HomePage = Loadable(lazy(() => import('pages/user/homepage')));
const Contact = Loadable(lazy(() => import('pages/user/contact')));
//speciality
const RegisterSpeciality_Index = Loadable(lazy(() => import('pages/user/register_speciality')));
const RegisterSpeciality_Register = Loadable(lazy(() => import('pages/user/register_speciality/register')));
const RegisterSpeciality_Rules = Loadable(lazy(() => import('pages/user/register_speciality/rules')));
const RegisterSpeciality_Result = Loadable(lazy(() => import('pages/user/register_speciality/result')));
//intern
const RegisterIntern_Index = Loadable(lazy(() => import('pages/user/internship-graduation')));
const RegisterIntern_Register = Loadable(lazy(() => import('pages/user/internship-graduation/register')));
const RegisterIntern_Result = Loadable(lazy(() => import('pages/user/internship-graduation/result')));
const RegisterImprovement = Loadable(lazy(() => import('pages/user/register_improvement/register')));
const SubjectSchedule = Loadable(lazy(() => import('pages/user/subject-schedule')));

// ==============================|| COMPONENTS ROUTES ||============================== //

const UserRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: 'contact',
          element: <Contact />
        },
        {
          path: 'subject-schedule',
          element: <SubjectSchedule />
        }
      ]
    },
    {
      path: '/register_speciality',
      element: <HomeLayout />,
      children: [
        {
          path: '/register_speciality',
          element: <RegisterSpeciality_Index requiredPermissions={[]} />
        },
        {
          path: 'register',
          element: <PrivateRoute component={RegisterSpeciality_Register} requiredPermissions={[]} />
        },
        {
          path: 'rules',
          element: <RegisterSpeciality_Rules requiredPermissions={[]} />
        },
        {
          path: 'result',
          element: <RegisterSpeciality_Result requiredPermissions={[]} />
        }
      ]
    },
    {
      path: '/register_intern',
      element: <HomeLayout />,
      children: [
        {
          path: '/register_intern',
          element: <RegisterIntern_Index />
        },
        {
          path: 'register',
          element: <PrivateRoute component={RegisterIntern_Register} requiredPermissions={[]} />
        },
        {
          path: 'result',
          element: <RegisterIntern_Result requiredPermissions={[]} />
        }
      ]
    },
    {
      path: '/register_improvement',
      element: <HomeLayout />,
      children: [
        {
          path: 'register',
          element: <RegisterImprovement requiredPermissions={[]} />
        }
      ]
    }
  ]
};

export default UserRoutes;
