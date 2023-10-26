import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import HomeLayout from 'layout/HomeLayout';
import PrivateRoute from './route/PrivateRoute';
import { dispatch } from 'store';
import { viewPage } from 'store/reducers/pageSlice';

// render - data display components
const HomePage = Loadable(lazy(() => import('pages/user/homepage')));
const Contact = Loadable(lazy(() => import('pages/user/contact')));
//speciality
const RegisterSpeciality_Index = Loadable(lazy(() => import('pages/user/register-speciality')));
const RegisterSpeciality_Register = Loadable(lazy(() => import('pages/user/register-speciality/register')));
const RegisterSpeciality_Rules = Loadable(lazy(() => import('pages/user/register-speciality/rules')));
const RegisterSpeciality_Result = Loadable(lazy(() => import('pages/user/register-speciality/result')));
//intern
const RegisterIntern_Index = Loadable(lazy(() => import('pages/user/internship-graduation')));
const RegisterIntern_Register = Loadable(lazy(() => import('pages/user/internship-graduation/register')));
const RegisterIntern_Result = Loadable(lazy(() => import('pages/user/internship-graduation/result')));
const RegisterIntern_Add = Loadable(lazy(() => import('pages/user/internship-graduation/additional')));
const RegisterImprovement = Loadable(lazy(() => import('pages/user/register-open-class/register')));
const RegisterOpenClassHistory = Loadable(lazy(() => import('pages/user/register-open-class/history')));
const RegisterOpenClassStatistic = Loadable(lazy(() => import('pages/user/register-open-class/statistic')));
const SubjectSchedule = Loadable(lazy(() => import('pages/user/subject-schedule')));
const Page = Loadable(lazy(() => import('pages/user/page')));
const Page404 = Loadable(lazy(() => import('pages/error/page404')));

const UserRoutes = {
  path: '/',
  errorElement: <Page404 />,
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
        },
        {
          path: 'page/:slug',
          loader: async ({ params }) => {
            const res = await dispatch(viewPage(params.slug));
            if (res && res.error) {
              throw new Response('Not Found', { status: 404 });
            }
            return res;
          },
          element: <Page />
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
          element: <PrivateRoute component={RegisterIntern_Register} requiredPermissions={['student.view']} />
        },
        {
          path: 'additional',
          element: <PrivateRoute component={RegisterIntern_Add} requiredPermissions={['student.view']} />
        },
        {
          path: 'result',
          element: <RegisterIntern_Result requiredPermissions={[]} />
        }
      ]
    },
    {
      path: '/register-open-class',
      element: <HomeLayout />,
      children: [
        {
          path: '/register-open-class',
          element: <RegisterImprovement />
        },
        {
          path: '/register-open-class/history',
          element: <RegisterOpenClassHistory />
        },
        {
          path: '/register-open-class/statistic',
          element: <RegisterOpenClassStatistic />
        }
      ]
    }
  ]
};

export default UserRoutes;
