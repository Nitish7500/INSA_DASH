import {
  LEAD_ASSIGN_EXPERT,
  LEAD_ASSIGN_EXPERT_FAILED,
  LEAD_ASSIGN_EXPERT_SUCCESS,
  LEAD_ASSIGN_USER,
  LEAD_ASSIGN_USER_FAILED,
  LEAD_ASSIGN_USER_SUCCESS,
  LEAD_DATA_WITH_STATUS,
  LEAD_DATA_WITH_STATUS_FAILED,
  LEAD_DATA_WITH_STATUS_SUCCESS,
  LEAD_INSURANCE_COMPANY,
  LEAD_INSURANCE_COMPANY_FAILED,
  LEAD_INSURANCE_COMPANY_SUCCESS,
  LEAD_USERS,
  LEAD_USERS_FAILED,
  LEAD_USERS_SUCCESS,
} from "./Action";

const initialState = {
  assigUser: [],
  assignExpert: [],
  insuranceCompany: [],
  leadDataByStatus: {},
  leadUsers: {},
  message: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LEAD_ASSIGN_USER:
      return { ...state };

    case LEAD_ASSIGN_USER_SUCCESS:
      return { ...state, assigUser: action.data };

    case LEAD_ASSIGN_USER_FAILED:
      return { ...state, message: action.message };

    case LEAD_ASSIGN_EXPERT:
      return { ...state };

    case LEAD_ASSIGN_EXPERT_SUCCESS:
      return { ...state, assignExpert: action.data };

    case LEAD_ASSIGN_EXPERT_FAILED:
      return { ...state, message: action.message };

    case LEAD_INSURANCE_COMPANY:
      return { ...state };

    case LEAD_INSURANCE_COMPANY_SUCCESS:
      return { ...state, insuranceCompany: action.data };

    case LEAD_INSURANCE_COMPANY_FAILED:
      return { ...state, message: action.message };

    case LEAD_DATA_WITH_STATUS:
      return { ...state };

    case LEAD_DATA_WITH_STATUS_SUCCESS:
      return { ...state, leadDataByStatus: action.data };

    case LEAD_DATA_WITH_STATUS_FAILED:
      return { ...state, message: action.message };

    case LEAD_USERS:
      return { ...state };

    case LEAD_USERS_SUCCESS:
      return { ...state, leadUsers: action.data };

    case LEAD_USERS_FAILED:
      return { ...state, message: action.message };

    default:
      console.log("--------------------------")
        return {...state}
  }
};
