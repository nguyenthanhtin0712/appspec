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
import register_specialty from './registerSpecialtyAdminSlice';
import register_specialty_user from './registerSpecialtyUserSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  user,
  major,
  auth,
  specialty,
  student,
  teacher,
  register_specialty,
  register_specialty_user
});

export default reducers;
