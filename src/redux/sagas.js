import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import dashboardSaga from "./Dashboard/saga"

export default function* rootSaga() {
  yield all([
    authSagas(),
    dashboardSaga(),
  ]);
}
