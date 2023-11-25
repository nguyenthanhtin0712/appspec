import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import PrivateRoute from '../guards/PrivateRoute';
import { dispatch } from 'store';
import { getWarningInfo } from 'store/slices/warnedStudentDetailSlice';
import { getPageById } from 'store/slices/pageSlice';
import { getJobPostById } from 'store/slices/jobPostSlice';
import { getRegistrationInfoById } from 'store/slices/registerSpecialtyUserSlice';
import { getRole } from 'store/slices/roleSlice';

const DashboardDefault = Loadable(lazy(() => import('pages/admin/dashboard')));
const MajorPage = Loadable(lazy(() => import('pages/admin/major')));
const ConfigPage = Loadable(lazy(() => import('pages/admin/config-page')));
const ContactPage = Loadable(lazy(() => import('pages/admin/contact')));
const RegisterSpecialtyPageCreate = Loadable(lazy(() => import('pages/admin/register-specialty/register-specialty-create')));
const RegisterSpecialtyPageEdit = Loadable(lazy(() => import('pages/admin/register-specialty/register-specialty-edit')));
const RegisterSpecialtyPageIndex = Loadable(lazy(() => import('pages/admin/register-specialty/register-specialty-index')));
const RegisterSpecialtyPageResult = Loadable(lazy(() => import('pages/admin/register-specialty/register-specialty-result')));
const RegisterInternPageCreate = Loadable(lazy(() => import('pages/admin/internship-graduation/register-intern-create')));
const InternshipGraduationPageIndex = Loadable(lazy(() => import('pages/admin/internship-graduation/internship-graduation-index')));
const AssignmentInternPageResult = Loadable(lazy(() => import('pages/admin/assignment-intern/assignment-intern-result')));
const AssignmentInternPageDetail = Loadable(lazy(() => import('pages/admin/assignment-intern/assignment-intern-detail')));
const SpecialtyPage = Loadable(lazy(() => import('pages/admin/specialty')));
const StudentPage = Loadable(lazy(() => import('pages/admin/student')));
const JobholderPage = Loadable(lazy(() => import('pages/admin/jobholder')));
const TitlePage = Loadable(lazy(() => import('pages/admin/title')));
const CompanyPage = Loadable(lazy(() => import('pages/admin/company')));
const SubjectPage = Loadable(lazy(() => import('pages/admin/subject-page')));
const SubjectSchedule = Loadable(lazy(() => import('pages/admin/subject-schedule')));
const WarnedStudent = Loadable(lazy(() => import('pages/admin/warned-student/warned-student')));
const WarnedStudentDetailPage = Loadable(lazy(() => import('pages/admin/warned-student/warned-student-detail')));
const Page = Loadable(lazy(() => import('pages/admin/page/page-index')));
const PageCreate = Loadable(lazy(() => import('pages/admin/page/page-create')));
const PageEdit = Loadable(lazy(() => import('pages/admin/page/page-edit')));
const Role = Loadable(lazy(() => import('pages/admin/role/role_index')));
const RoleCreate = Loadable(lazy(() => import('pages/admin/role/role_create')));
const RoleUpdate = Loadable(lazy(() => import('pages/admin/role/role_update')));
const Grading = Loadable(lazy(() => import('pages/admin/grading/index')));
const GradingUpdate = Loadable(lazy(() => import('pages/admin/grading/grading-update')));
const GradingDetail = Loadable(lazy(() => import('pages/admin/grading/grading-detail')));
const CreateJobPost = Loadable(lazy(() => import('pages/admin/job-post/job-post-create')));
const EditJobPost = Loadable(lazy(() => import('pages/admin/job-post/job-post-edit')));
const ManageJobPost = Loadable(lazy(() => import('pages/admin/job-post/job-post-manage')));
const JobPost = Loadable(lazy(() => import('pages/admin/job-post/job-post-index')));
const Page404 = Loadable(lazy(() => import('pages/error/page404')));

const AdminRoutes = {
  path: '/admin',
  element: <MainLayout />,
  errorElement: <Page404 />,
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
      element: <PrivateRoute component={ConfigPage} requiredPermissions={['system.update']} />
    },
    {
      path: 'contact',
      element: <PrivateRoute component={ContactPage} requiredPermissions={['contact.view']} />
    },
    {
      path: 'major',
      element: <PrivateRoute component={MajorPage} requiredPermissions={['major.view']} />
    },
    {
      path: 'register_specialty',
      element: <PrivateRoute component={RegisterSpecialtyPageIndex} requiredPermissions={['register_spec.view']} />
    },
    {
      path: 'register_specialty/create',
      element: <PrivateRoute component={RegisterSpecialtyPageCreate} requiredPermissions={['register_spec.create']} />
    },
    {
      path: 'register_specialty/edit/:id',
      element: <PrivateRoute component={RegisterSpecialtyPageEdit} requiredPermissions={['register_spec.update']} />
    },
    {
      path: 'register_specialty/:Id',
      loader: async ({ params }) => {
        const res = await dispatch(getRegistrationInfoById(params.Id));
        if (res && res.error) {
          throw new Response('Not Found', { status: 404 });
        }
        return res;
      },
      element: <PrivateRoute component={RegisterSpecialtyPageResult} requiredPermissions={['register_spec.divide']} />
    },
    {
      path: 'internship-graduation',
      element: <PrivateRoute component={InternshipGraduationPageIndex} requiredPermissions={['register_intern.view']} />
    },
    {
      path: 'register-intern/:Id',
      element: <PrivateRoute component={RegisterInternPageCreate} requiredPermissions={['register_intern.view']} />
    },
    {
      path: 'assignment_intern/:Id',
      element: <PrivateRoute component={AssignmentInternPageResult} requiredPermissions={[]} />
    },
    {
      path: 'assignment_detail/:Id',
      element: <PrivateRoute component={AssignmentInternPageDetail} requiredPermissions={[]} />
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
      path: 'jobhodler',
      element: <PrivateRoute component={JobholderPage} requiredPermissions={['jobholder.view']} />
    },
    {
      path: 'title',
      element: <PrivateRoute component={TitlePage} requiredPermissions={['title.view']} />
    },
    {
      path: 'company',
      element: <PrivateRoute component={CompanyPage} requiredPermissions={['company.view']} />
    },
    {
      path: 'subject',
      element: <PrivateRoute component={SubjectPage} requiredPermissions={['subject.view']} />
    },
    {
      path: 'subject-schedule',
      element: <PrivateRoute component={SubjectSchedule} requiredPermissions={['subject_schedule.create']} />
    },
    {
      path: 'warned-student',
      element: <PrivateRoute component={WarnedStudent} requiredPermissions={['warned_dismissed.view']} />
    },
    {
      path: 'warned-student/:id',
      loader: async ({ params }) => {
        const res = await dispatch(getWarningInfo(params.id));
        if (res && res.error) {
          throw new Response('Not Found', { status: 404 });
        }
        return res;
      },
      element: <PrivateRoute component={WarnedStudentDetailPage} requiredPermissions={['warned_dismissed.detail']} />
    },
    {
      path: 'page',
      element: <PrivateRoute component={Page} requiredPermissions={['page.view']} />
    },
    {
      path: 'page/create',
      element: <PrivateRoute component={PageCreate} requiredPermissions={['page.create']} />
    },
    {
      path: 'page/edit/:pageId',
      loader: async ({ params }) => {
        const res = await dispatch(getPageById(params.pageId));
        if (res && res.error) {
          throw new Response('Not Found', { status: 404 });
        }
        return res;
      },
      element: <PrivateRoute component={PageEdit} requiredPermissions={['page.update']} />
    },
    {
      path: 'role',
      element: <PrivateRoute component={Role} requiredPermissions={[]} />
    },
    {
      path: 'role/create',
      element: <PrivateRoute component={RoleCreate} requiredPermissions={[]} />
    },
    {
      path: 'role/:id',
      loader: async ({ params }) => {
        const res = await dispatch(getRole(params.id));
        if (res && res.error) {
          throw new Response('Not Found', { status: 404 });
        }
        return res;
      },
      element: <PrivateRoute component={RoleUpdate} requiredPermissions={[]} />
    },
    {
      path: 'grading',
      element: <PrivateRoute component={Grading} requiredPermissions={['jobholder.grading']} />
    },
    {
      path: 'grading/update/:id',
      element: <PrivateRoute component={GradingUpdate} requiredPermissions={['jobholder.grading']} />
    },
    {
      path: 'grading/detail/:id',
      element: <PrivateRoute component={GradingDetail} requiredPermissions={['jobholder.grading']} />
    },
    {
      path: 'manage-job-post',
      element: <PrivateRoute component={ManageJobPost} requiredPermissions={['job_post.confirm']} />
    },
    {
      path: 'job-post',
      element: <PrivateRoute component={JobPost} requiredPermissions={['job_post.create']} />
    },
    {
      path: 'job-post/create',
      element: <PrivateRoute component={CreateJobPost} requiredPermissions={['job_post.create']} />
    },
    {
      path: 'job-post/edit/:postId',
      loader: async ({ params }) => {
        const res = await dispatch(getJobPostById(params.postId));
        if (res && res.error) {
          throw new Response('Not Found', { status: 404 });
        }
        return res;
      },
      element: <PrivateRoute component={EditJobPost} requiredPermissions={['job_post.update']} />
    }
  ]
};

export default AdminRoutes;
