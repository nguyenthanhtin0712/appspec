// third-party
import { combineReducers } from 'redux';

// project-imports
import menu from './menu';
import user from './userSlice';
import major from './majorSlice';
import auth from './authSlice';
import specialty from './specialtySlice';
import student from './studentSlice';
import teacher from './teacherSlice';
import title from './titleSlice';
import subject from './subjectSlice';
import subject_schedule from './subjectScheduleSlice';
import warned_student from './warnedStudentSlice';
import warned_student_detail from './warnedStudentDetailSlice';
import subject_schedule_user from './subjectScheduleUserSlice';
import jobholder from './jobholderSlice';
import company from './companySlice';
import register_specialty from './registerSpecialtyAdminSlice';
import register_specialty_user from './registerSpecialtyUserSlice';
import config_page from './configPageSlice';
import create_register_intern from './createRegisterInternSlice';
import internship_graduation from './internshipGraduationSlice';
import register_intern_user from './registerInternUserSlice';
import register_open_class from './registerOpenClassSlice';
import assignment_internship from './assignmentIntenship';
import contact from './contactSlice';
import assignment_internship_detail from 'store/slices/assignmentInternshipDetail';
import role from 'store/slices/roleSlice';
import grading from 'store/slices/gradingSlice';
import page from 'store/slices/pageSlice';
import job_post from 'store/slices/jobPostSlice';
import job_post_home from 'store/slices/jobPostHomeSlice';
import manage_job_post from 'store/slices/manageJobPostSlice';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  user,
  major,
  auth,
  specialty,
  student,
  title,
  teacher,
  subject,
  subject_schedule,
  subject_schedule_user,
  jobholder,
  company,
  register_specialty,
  register_specialty_user,
  register_open_class,
  create_register_intern,
  register_intern_user,
  config_page,
  internship_graduation,
  assignment_internship,
  assignment_internship_detail,
  contact,
  warned_student,
  warned_student_detail,
  role,
  grading,
  page,
  job_post,
  job_post_home,
  manage_job_post
});

export default reducers;
