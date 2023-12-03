import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import HomeLayout from 'layout/HomeLayout';
import PrivateRoute from '../guards/PrivateRoute';
import { dispatch } from 'store';
import { viewPage } from 'store/slices/pageSlice';
import { getJobPostById } from 'store/slices/jobPostHomeSlice';
import { getUserInternship } from 'store/slices/registerInternUserSlice';

// render - data display components
const HomePage = Loadable(lazy(() => import('pages/user/homepage')));
const Contact = Loadable(lazy(() => import('pages/user/contact')));
//speciality
const RegisterSpeciality_Index = Loadable(lazy(() => import('pages/user/register-speciality')));
const RegisterSpeciality_Register = Loadable(lazy(() => import('pages/user/register-speciality/register')));
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
const Page = Loadable(lazy(() => import('pages/user/page/page')));
const Jobs = Loadable(lazy(() => import('pages/user/jobs/job-list')));
const JobDetail = Loadable(lazy(() => import('pages/user/jobs/job-detail')));
const Profile = Loadable(lazy(() => import('pages/user/profile/index')));
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
          path: 'jobs',
          element: <Jobs />
        },
        {
          path: 'jobs/:postId',
          loader: async ({ params }) => {
            const res = await dispatch(getJobPostById(params.postId));
            if (res && res.error) {
              throw new Response('Not Found', { status: 404 });
            }
            return res;
          },
          element: <JobDetail />
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
        },
        {
          path: 'profile',
          element: <PrivateRoute component={Profile} requiredPermissions={[]} />
        }
      ]
    },
    {
      path: '/register_speciality',
      element: <HomeLayout />,
      children: [
        {
          path: '/register_speciality',
          element: <RegisterSpeciality_Index />
        },
        {
          path: 'register',
          element: <PrivateRoute component={RegisterSpeciality_Register} requiredPermissions={['register_spec.register']} />
        },
        {
          path: 'result',
          element: <RegisterSpeciality_Result />
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
          element: <PrivateRoute component={RegisterIntern_Register} requiredPermissions={['register_intern.register']} />
        },
        {
          path: 'additional',
          loader: async () => {
            const res = await dispatch(getUserInternship());
            if (!res?.payload?.data) {
              throw new Response('Not Found', { status: 404 });
            }
            return res;
          },
          element: <PrivateRoute component={RegisterIntern_Add} requiredPermissions={['register_intern.register']} />
        },
        {
          path: 'result',
          element: <RegisterIntern_Result />
        }
      ]
    },
    {
      path: '/register-open-class',
      element: <HomeLayout />,
      children: [
        {
          path: '/register-open-class',
          element: <PrivateRoute component={RegisterImprovement} requiredPermissions={['register_open_class']} />
        },
        {
          path: '/register-open-class/history',
          element: <PrivateRoute component={RegisterOpenClassHistory} requiredPermissions={['register_open_class']} />
        },
        {
          path: '/register-open-class/statistic',
          element: <PrivateRoute component={RegisterOpenClassStatistic} requiredPermissions={['register_open_class.statistic']} />
        }
      ]
    }
  ]
};

export default UserRoutes;
