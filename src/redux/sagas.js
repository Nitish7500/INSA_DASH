import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import dashboardSaga from "./Dashboard/saga"
import botTranscriptSaga from './BotTranscript/Saga';
import leadSaga from './Lead/Saga';

export default function* rootSaga() {
  yield all([
    authSagas(),
    dashboardSaga(),
    botTranscriptSaga(),
    leadSaga()
  ]);
}
