import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import bucket from "./Dashboard/reducer"

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  bucket
});

export default reducers;
