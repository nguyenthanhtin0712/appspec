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
import employer from './employerSlice';
import title from './titleSlice';
import degree from './degreeSlice';
import subject from './subjectSlice';
import jobholder from './jobholderSlice';
import company from './companySlice';
import register_specialty from './registerSpecialtyAdminSlice';
import register_specialty_user from './registerSpecialtyUserSlice';
import assignment_intern from './assignmentInternAdminSlice';
import assignment_intern_user from './assignmentInternUserSlice';
import config_page from './configPageSlice';
import create_register_intern from './createRegisterInternSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  user,
  major,
  auth,
  specialty,
  student,
  title,
  degree,
  teacher,
  subject,
  employer,
  jobholder,
  company,
  register_specialty,
  register_specialty_user,
  assignment_intern,
  assignment_intern_user,
  create_register_intern,
  config_page
});

export default reducers;
