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
import jobholder from './jobholderSlice';
import company from './companySlice';
import register_specialty from './registerSpecialtyAdminSlice';
import register_specialty_user from './registerSpecialtyUserSlice';
import config_page from './configPageSlice';
import create_register_intern from './createRegisterInternSlice';
import internship_graduation from './internshipGraduationSlice';
import regsiter_intern_user from './registerInternUserSlice';
import assignment_internship from './assignmentIntenship';
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
  jobholder,
  company,
  register_specialty,
  register_specialty_user,
  create_register_intern,
  regsiter_intern_user,
  config_page,
  internship_graduation,
  assignment_internship
});

export default reducers;
