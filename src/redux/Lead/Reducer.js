import {
  CALL_LOGS_FOR_CUSTOMER,
  CALL_LOGS_FOR_CUSTOMER_FAILED,
  CALL_LOGS_FOR_CUSTOMER_SUCCESS,
  LEAD_ACCEPT_LEAD,
  LEAD_ACCEPT_LEAD_FAILED,
  LEAD_ACCEPT_LEAD_SUCCESSS,
  LEAD_ADD_FOLLOW_UP,
  LEAD_ADD_FOLLOW_UP_FAILED,
  LEAD_ADD_FOLLOW_UP_SUCCESS,
  LEAD_ASSIGN_EXPERT,
  LEAD_ASSIGN_EXPERT_FAILED,
  LEAD_ASSIGN_EXPERT_SUCCESS,
  LEAD_ASSIGN_USER,
  LEAD_ASSIGN_USER_FAILED,
  LEAD_ASSIGN_USER_SAVE,
  LEAD_ASSIGN_USER_SAVE_FAILED,
  LEAD_ASSIGN_USER_SAVE_SUCCESS,
  LEAD_ASSIGN_USER_SUCCESS,
  LEAD_CANCEL_LEAD,
  LEAD_CANCEL_LEAD_FAILED,
  LEAD_CANCEL_LEAD_SUCCESS,
  LEAD_COMM_HISTORY_ADD_COMMENT,
  LEAD_COMM_HISTORY_ADD_COMMENT_FAILED,
  LEAD_COMM_HISTORY_ADD_COMMENT_SUCCESS,
  LEAD_COMM_HISTORY_UPDATE_COMMENT,
  LEAD_COMM_HISTORY_UPDATE_COMMENT_FAILED,
  LEAD_COMM_HISTORY_UPDATE_COMMENT_SUCCESS,
  LEAD_DATA_WITH_STATUS,
  LEAD_DATA_WITH_STATUS_FAILED,
  LEAD_DATA_WITH_STATUS_SUCCESS,
  LEAD_DOWNLOAD_REPORT,
  LEAD_DOWNLOAD_REPORT_FAILED,
  LEAD_DOWNLOAD_REPORT_SUCCESS,
  LEAD_FETCH_BY_ID,
  LEAD_FETCH_BY_ID_FAILED,
  LEAD_FETCH_BY_ID_SUCCESS,
  LEAD_FILTRATION_DATA,
  LEAD_FILTRATION_DATA_FAILED,
  LEAD_FILTRATION_DATA_SUCCESS,
  LEAD_GET_MISSELLING,
  LEAD_GET_MISSELLING_FAILED,
  LEAD_GET_MISSELLING_SUCCESS,
  LEAD_GET_POLICY_TYPE,
  LEAD_GET_POLICY_TYPE_COMPLAINT_TYPE,
  LEAD_GET_POLICY_TYPE_COMPLAINT_TYPE_FAILED,
  LEAD_GET_POLICY_TYPE_COMPLAINT_TYPE_SUCCESS,
  LEAD_GET_POLICY_TYPE_FAILED,
  LEAD_GET_POLICY_TYPE_SUCCESS,
  LEAD_INSURANCE_COMPANY,
  LEAD_INSURANCE_COMPANY_FAILED,
  LEAD_INSURANCE_COMPANY_SUCCESS,
  LEAD_REJECT_LEAD,
  LEAD_REJECT_LEAD_FAILED,
  LEAD_REJECT_LEAD_SUCCESSS,
  Lead_UPDATE_LEAD,
  Lead_UPDATE_LEAD_FAILED,
  Lead_UPDATE_LEAD_SUCCESS,
  LEAD_USERS,
  LEAD_USERS_FAILED,
  LEAD_USERS_SUCCESS,
  SEARCH_BY_MAIL_AND_PHONE,
  SEARCH_BY_MAIL_AND_PHONE_FAILED,
  SEARCH_BY_MAIL_AND_PHONE_SUCCESS,
} from "./Action";

const initialState = {
  assigUser: [],
  assignExpert: [],
  insuranceCompany: [],
  leadDataByStatus: {},
  leadUsers: {},
  message: "",
  leadReportData: "",
  fetchedLead: {},
  filtrationData: {},
  callLogsCustomer: {},
  policyType: [],
  complaintType: [],
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

    case SEARCH_BY_MAIL_AND_PHONE:
      return { ...state };

    case SEARCH_BY_MAIL_AND_PHONE_SUCCESS:
      return {
        ...state,
        leadDataByStatus: {
          list: action.data?.data?.pageOfItems,
          totalRecords: action.data?.data?.pager,
        },
      };

    case SEARCH_BY_MAIL_AND_PHONE_FAILED:
      return { ...state, message: action.message };

    case LEAD_DOWNLOAD_REPORT:
      return { ...state };

    case LEAD_DOWNLOAD_REPORT_SUCCESS:
      return { ...state, leadReportData: action.data };

    case LEAD_DOWNLOAD_REPORT_FAILED:
      return { ...state, message: action.message };

    case LEAD_GET_MISSELLING:
      return { ...state };

    case LEAD_GET_MISSELLING_SUCCESS:
      return { ...state, missellingSelected: action.data };

    case LEAD_GET_MISSELLING_FAILED:
      return { ...state, message: action.message };

    case LEAD_ASSIGN_USER_SAVE:
      return { ...state };

    case LEAD_ASSIGN_USER_SAVE_SUCCESS:
      return { ...state, message: "Assignment Successful !" };

    case LEAD_ASSIGN_USER_SAVE_FAILED:
      return { ...state, message: "Failed to Assign" };

    case LEAD_ACCEPT_LEAD:
      return { ...state };

    case LEAD_ACCEPT_LEAD_SUCCESSS:
      return { ...state, message: "Lead Accepted Successful !" };

    case LEAD_ACCEPT_LEAD_FAILED:
      return { ...state, message: "Failed to Accept" };

    case LEAD_REJECT_LEAD:
      return { ...state };

    case LEAD_REJECT_LEAD_SUCCESSS:
      return { ...state, message: "Lead Accepted Successful !" };

    case LEAD_REJECT_LEAD_FAILED:
      return { ...state, message: "Failed to Accept" };

    case LEAD_COMM_HISTORY_UPDATE_COMMENT:
      return { ...state };

    case LEAD_COMM_HISTORY_UPDATE_COMMENT_SUCCESS:
      return { ...state, message: action.message };

    case LEAD_COMM_HISTORY_UPDATE_COMMENT_FAILED:
      return { ...state, message: action.message };

    case LEAD_COMM_HISTORY_ADD_COMMENT:
      return { ...state };

    case LEAD_COMM_HISTORY_ADD_COMMENT_SUCCESS:
      return { ...state, message: action.message };

    case LEAD_COMM_HISTORY_ADD_COMMENT_FAILED:
      return { ...state, message: action.message };

    case LEAD_FETCH_BY_ID:
      return { ...state };

    case LEAD_FETCH_BY_ID_SUCCESS:
      return { ...state, fetchedLead: action.data };

    case LEAD_FETCH_BY_ID_FAILED:
      return { ...state, message: action.message };

    case LEAD_FILTRATION_DATA:
      return { ...state };

    case LEAD_FILTRATION_DATA_SUCCESS:
      return { ...state, filtrationData: action.data };

    case LEAD_FILTRATION_DATA_FAILED:
      return { ...state, message: action.message };

    case CALL_LOGS_FOR_CUSTOMER:
      return { ...state };

    case CALL_LOGS_FOR_CUSTOMER_SUCCESS:
      return { ...state, callLogsCustomer: action.data };

    case CALL_LOGS_FOR_CUSTOMER_FAILED:
      return { ...state, message: action.message };

    case LEAD_CANCEL_LEAD:
      return { ...state };

    case LEAD_CANCEL_LEAD_SUCCESS:
      return { ...state };

    case LEAD_CANCEL_LEAD_FAILED:
      return { ...state, message: action.message };

    case LEAD_GET_POLICY_TYPE:
      return { ...state };

    case LEAD_GET_POLICY_TYPE_SUCCESS:
      return { ...state, policyType: action.data };

    case LEAD_GET_POLICY_TYPE_FAILED:
      return { ...state, message: action.message };

    case LEAD_GET_POLICY_TYPE_COMPLAINT_TYPE:
      return { ...state };

    case LEAD_GET_POLICY_TYPE_COMPLAINT_TYPE_SUCCESS:
      return { ...state, complaintType: action.data };

    case LEAD_GET_POLICY_TYPE_COMPLAINT_TYPE_FAILED:
      return { ...state, message: action.message };

    case Lead_UPDATE_LEAD:
      return { ...state };

    case Lead_UPDATE_LEAD_SUCCESS:
      return { ...state, message: "Lead Updated Successfully !" };

    case Lead_UPDATE_LEAD_FAILED:
      return { ...state, message: action.message };

    case LEAD_ADD_FOLLOW_UP:
      return { ...state };

    case LEAD_ADD_FOLLOW_UP_SUCCESS:
      return { ...state, message: "Follow Up added Successfully !" };

    case LEAD_ADD_FOLLOW_UP_FAILED:
      return { ...state, message: action.message };

    default:
      return { ...state };
  }
};
