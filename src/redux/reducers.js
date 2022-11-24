import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import bucket from "./Dashboard/reducer"
import botTranscript from "./BotTranscript/Reducer"
import leadReducer from "./Lead/Reducer"

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  bucket,
  botTranscript,
  leadReducer
});

export default reducers;
