import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { adminRoot, agentApiPath, apiEndpoints, authRoot, currentUser, servicePath } from 'constants/defaultValues';
import { setCurrentUser } from 'helpers/Utils';
import {
  LOGIN_USER,
  LOGOUT_USER,
} from '../contants';

import {
  loginUserSuccess,
  loginUserError,
} from './actions';
import axios from 'axios';
import { loginWithEmailAndPasswordApi } from 'services/auth.services';

export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) =>{
  // eslint-disable-next-line no-return-await
  console.log(email,password)
  if(email == 'ravi@insurancesamadhan.com') {
    try {
      const res = await axios({
        method:"POST",
        url:servicePath + apiEndpoints.login,
        data:{
          email,
          password
        }
      });
      return res.data;
    } catch (error) {
      console.log(error)
      return error;
    }
  } else {
    try {
      const res = await axios({
        method: "POST",
        url: agentApiPath + '/login',
        data:{
          email,
          password
        }
      });
      return res.data;
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  
};

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailAndPasswordApi,{ email, password});
    if (loginUser.success) {
      const isAdmin = loginUser.data.userType ==="admin";
      yield call(loginUserSuccess, {isAdmin,...loginUser})
      history.push(adminRoot);
    } else {
      yield put(loginUserError(loginUser.msg));
    }
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    yield put(loginUserError(msg));
  }
}

export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  console.log(authRoot);
  history.push(authRoot);
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  yield call(logoutAsync, history);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
  ]);
}
