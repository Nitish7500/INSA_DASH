import { getCurrentUser } from 'helpers/Utils';
import { isAuthGuardActive, currentUser } from 'constants/defaultValues';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from '../contants';

const INIT_STATE = {
  currentUser: isAuthGuardActive ? currentUser : getCurrentUser(),
  forgotUserMail: '',
  newPassword: '',
  resetPasswordCode: '',
  loading: false,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.message,
      };
    case LOGOUT_USER:
      return { ...state, currentUser: null, error: '', loading: false };
    default:
      return { ...state };
  }
};
