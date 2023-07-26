// third-party
import { combineReducers } from 'redux';

// project-imports
import menu from './menu';
import user from './user';
import major from './major';
import auth from './auth';
import specialty from './specialty';
import student from './student';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  user,
  major,
  auth,
  specialty,
  student
});

export default reducers;
