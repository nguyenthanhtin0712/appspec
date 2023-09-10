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
import jobholder from './jobholderSlice';
import company from './companySlice';
import register_specialty from './registerSpecialtyAdminSlice';
import register_specialty_user from './registerSpecialtyUserSlice';
import config_page from './configPageSlice';
import create_register_intern from './createRegisterInternSlice';
import internship_graduation from './internshipGraduationSlice';
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
  jobholder,
  company,
  register_specialty,
  register_specialty_user,
  create_register_intern,
  config_page,
  internship_graduation
});

export default reducers;
