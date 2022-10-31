import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  LOGIN_USER_ERROR,
} from '../contants';

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history },
});

export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

export const loginUserError = (message) => ({
  type: LOGIN_USER_ERROR,
  payload: { message },
});

export const logoutUser = (history) =>{ 
  return({
  type: LOGOUT_USER,
  payload: { history },
})};
