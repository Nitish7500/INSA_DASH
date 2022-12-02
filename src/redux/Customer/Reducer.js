import {
  CUSTOMER_ADMIN_ISSUED_DOC,
  CUSTOMER_ADMIN_ISSUED_DOC_FAILED,
  CUSTOMER_ADMIN_ISSUED_DOC_SUCCESS,
  CUSTOMER_ADMIN_ISSUER_DOC,
  CUSTOMER_ADMIN_ISSUER_DOC_FAILED,
  CUSTOMER_ADMIN_ISSUER_DOC_SUCCESS,
  CUSTOMER_ADMIN_SELF_DOC,
  CUSTOMER_ADMIN_SELF_DOC_FAILED,
  CUSTOMER_ADMIN_SELF_DOC_SUCCESS,
  CUSTOMER_FILTER_DATA,
  CUSTOMER_FILTER_DATA_FAILED,
  CUSTOMER_FILTER_DATA_SUCCESS,
  CUSTOMER_GET_USER_LIST,
  CUSTOMER_GET_USER_LIST_FAILED,
  CUSTOMER_GET_USER_LIST_SUCCESS,
  CUSTOMER_GMAIL_READ,
  CUSTOMER_GMAIL_READ_FAILED,
  CUSTOMER_GMAIL_READ_SUCCESS,
  CUSTOMER_UPDATE_SERVICE_RATE,
  CUSTOMER_UPDATE_SERVICE_RATE_FAILED,
  CUSTOMER_UPDATE_SERVICE_RATE_SUCCESS,
  CUSTOMER_USER_DOC_LIST,
  CUSTOMER_USER_DOC_LIST_FAILED,
  CUSTOMER_USER_DOC_LIST_SUCCESS,
  CUSTOMER_VIEW_PASSWORD,
  CUSTOMER_VIEW_PASSWORD_FAILED,
  CUSTOMER_VIEW_PASSWORD_SUCCESS,
} from "./Action";

const initialState = {
  userList: {},
  message: "",
  viewPassword: {},
  viewMailMessage: "",
  issuerDoc: [],
  selfDoc: [],
  userDoc: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_GET_USER_LIST:
      return { ...state };

    case CUSTOMER_GET_USER_LIST_SUCCESS:
      return { ...state, userList: action.data };

    case CUSTOMER_GET_USER_LIST_FAILED:
      return { ...state };

    case CUSTOMER_FILTER_DATA:
      return { ...state };

    case CUSTOMER_FILTER_DATA_SUCCESS:
      return { ...state, userList: action.data };

    case CUSTOMER_FILTER_DATA_FAILED:
      return { ...state, message: action.message };

    case CUSTOMER_VIEW_PASSWORD:
      return { ...state };

    case CUSTOMER_VIEW_PASSWORD_SUCCESS:
      return { ...state, viewPassword: action.data };

    case CUSTOMER_VIEW_PASSWORD_FAILED:
      return { ...state, message: action.message };

    case CUSTOMER_UPDATE_SERVICE_RATE:
      return { ...state };

    case CUSTOMER_UPDATE_SERVICE_RATE_SUCCESS:
      return { ...state, message: action.message };

    case CUSTOMER_UPDATE_SERVICE_RATE_FAILED:
      return { ...state, message: action.message };

    case CUSTOMER_GMAIL_READ:
      return { ...state };

    case CUSTOMER_GMAIL_READ_SUCCESS:
      return { ...state, viewMailMessage: action.message };

    case CUSTOMER_GMAIL_READ_FAILED:
      return { ...state, message: action.message };

    case CUSTOMER_ADMIN_ISSUED_DOC:
      return { ...state };

    case CUSTOMER_ADMIN_ISSUED_DOC_SUCCESS:
      return { ...state, issuerDoc: action.data };

    case CUSTOMER_ADMIN_ISSUED_DOC_FAILED:
      return { ...state, message: action.message };

    case CUSTOMER_ADMIN_SELF_DOC:
      return { ...state };

    case CUSTOMER_ADMIN_SELF_DOC_SUCCESS:
      return { ...state, selfDoc: action.data };

    case CUSTOMER_ADMIN_SELF_DOC_FAILED:
      return { ...state, message: action.message };

    case CUSTOMER_USER_DOC_LIST:
      return { ...state };

    case CUSTOMER_USER_DOC_LIST_SUCCESS:
      return { ...state, userDoc: action.data };

    case CUSTOMER_USER_DOC_LIST_FAILED:
      return { ...state, message: action.message };

    default:
      return { ...state };
  }
};
