import {
  AGENT_CASES_CONTRACT_MONTHLY_REPORT,
  AGENT_CASES_CONTRACT_MONTHLY_REPORT_FAILED,
  AGENT_CASES_CONTRACT_MONTHLY_REPORT_SUCCESS,
  AGENT_CASES_MONTHLY_REPORT,
  AGENT_CASES_MONTHLY_REPORT_FAILED,
  AGENT_CASES_MONTHLY_REPORT_SUCCESS,
  BOT_REPORT_DATA,
  BOT_REPORT_DATA_FAILED,
  BOT_REPORT_DATA_SUCCESS,
  COMPLAINT_MONTHLY_REPORT,
  COMPLAINT_MONTHLY_REPORT_FAILED,
  COMPLAINT_MONTHLY_REPORT_SUCCESS,
  COMPLAINT_REPORT_DATA,
  COMPLAINT_REPORT_DATA_FAILED,
  COMPLAINT_REPORT_DATA_SUCCESS,
  LEAD_REPORT_COUNT_DATA,
  LEAD_REPORT_COUNT_DATA_FAILED,
  LEAD_REPORT_COUNT_DATA_SUCCESS,
  LEAD_REPORT_DATA,
  LEAD_REPORT_DATA_FAILED,
  LEAD_REPORT_DATA_SUCCESS,
  MONTHLY_REPORT_DATA,
  MONTHLY_REPORT_DATA_FAILED,
  MONTHLY_REPORT_DATA_SUCCESS,
  MONTHLY_RESOLVED_B2C,
  MONTHLY_RESOLVED_B2C_FAILED,
  MONTHLY_RESOLVED_B2C_SUCCESS,
  OMBUDSMAN_EXECUTIVE_REPORT,
  OMBUDSMAN_EXECUTIVE_REPORT_FAILED,
  OMBUDSMAN_EXECUTIVE_REPORT_SUCCESS,
  OMB_REJECT_CASES,
  OMB_REJECT_CASES_FAILED,
  OMB_REJECT_CASES_SUCCESS,
  PAYMENT_REPORT_DATA,
  PAYMENT_REPORT_DATA_FAILED,
  PAYMENT_REPORT_DATA_SUCCESS,
  PAYMENT_REPORT_STATUS_DATA,
  PAYMENT_REPORT_STATUS_DATA_FAILED,
  PAYMENT_REPORT_STATUS_DATA_SUCCESS,
  REGISTERED_LEAD_REPORT,
  REGISTERED_LEAD_REPORT_FAILED,
  REGISTERED_LEAD_REPORT_SUCCESS,
  REPORT_CASE_REPORT_AGENT_DATA,
  REPORT_CASE_REPORT_AGENT_DATA_FAILED,
  REPORT_CASE_REPORT_AGENT_DATA_SUCCESS,
  REPORT_CASE_REPORT_COUNT_DATA,
  REPORT_CASE_REPORT_COUNT_DATA_FAILED,
  REPORT_CASE_REPORT_COUNT_DATA_SUCCESS,
  REPORT_CASE_REPORT_DATA,
  REPORT_CASE_REPORT_DATA_FAILED,
  REPORT_CASE_REPORT_DATA_SUCCESS,
  REPORT_CASE_REPORT_STATUS_DATA,
  REPORT_CASE_REPORT_STATUS_DATA_FAILED,
  REPORT_CASE_REPORT_STATUS_DATA_SUCCESS,
  REPORT_GET_ACTIVE_STATUS,
  REPORT_GET_ACTIVE_STATUS_FAILED,
  REPORT_GET_ACTIVE_STATUS_SUCCESS,
  REPORT_GET_ALL_USER_LIST,
  REPORT_GET_ALL_USER_LIST_FAILED,
  REPORT_GET_ALL_USER_LIST_SUCCESS,
  REPORT_GET_COMPLAINT_TYPE,
  REPORT_GET_COMPLAINT_TYPE_FAILED,
  REPORT_GET_COMPLAINT_TYPE_SUCCESS,
  REPORT_GET_INSURANCE_COMPANIES,
  REPORT_GET_INSURANCE_COMPANIES_FAILED,
  REPORT_GET_INSURANCE_COMPANIES_SUCCESS,
  REPORT_GET_INSURANCE_TYPE,
  REPORT_GET_INSURANCE_TYPE_FAILED,
  REPORT_GET_INSURANCE_TYPE_SUCCESS,
  REPORT_GET_USER_AGENT_DATA,
  REPORT_GET_USER_AGENT_DATA_FAILED,
  REPORT_GET_USER_AGENT_DATA_SUCCESS,
  REPORT_RESOLVED_CASES,
  REPORT_RESOLVED_CASES_FAILED,
  REPORT_RESOLVED_CASES_SUCCESS,
  REPORT_RESOLVED_PAYMENT_CASES,
  REPORT_RESOLVED_PAYMENT_CASES_FAILED,
  REPORT_RESOLVED_PAYMENT_CASES_SUCCESS,
  REPORT_UPLOAD_DOC,
  REPORT_UPLOAD_DOC_FAILED,
  REPORT_UPLOAD_DOC_SUCCESS,
  REPORT_UPLOAD_TO_SERVER,
  REPORT_UPLOAD_TO_SERVER_FAILED,
  REPORT_UPLOAD_TO_SERVER_SUCCESS,
  TAT_REPORT_DATA,
  TAT_REPORT_DATA_FAILED,
  TAT_REPORT_DATA_SUCCESS,
  TODAY_LEAD_COUNT_DATA,
  TODAY_LEAD_COUNT_DATA_FAILED,
  TODAY_LEAD_COUNT_DATA_SUCCESS,
} from "./Action";

const initValue = {
  status: [],
  userAgent: [],
  allUsers: [],
  policyTypes: [],
  insuranceCom: [],
  comTypes: [],
  caseRep: [],
  caseRepCount: "",
  leadRepCount: "",
  todayLeadCount: {},
  leadRepData: [],
  payRepData: [],
  monthlyRepData: [],
  comMontlyRep: [],
  agentCases: [],
  agentCasesCon: [],
  compData: [],
  ombData: [],
  relPaymentData: [],
  regLead: [],
  monthlyB2C: [],
  ombRejectCases: [],
  tatData: [],
  botData: [],
  message: "",
};

export default (state = initValue, action) => {
  switch (action.type) {
    case REPORT_GET_ACTIVE_STATUS:
      return { ...state };

    case REPORT_GET_ACTIVE_STATUS_SUCCESS:
      return { ...state, status: action.data };

    case REPORT_GET_ACTIVE_STATUS_FAILED:
      return { ...state, message: action.message };

    case REPORT_GET_USER_AGENT_DATA:
      return { ...state };

    case REPORT_GET_USER_AGENT_DATA_SUCCESS:
      return { ...state, userAgent: action.data };

    case REPORT_GET_USER_AGENT_DATA_FAILED:
      return { ...state, message: action.message };

    case REPORT_GET_ALL_USER_LIST:
      return { ...state };

    case REPORT_GET_ALL_USER_LIST_SUCCESS:
      return { ...state, allUsers: action.data };

    case REPORT_GET_ALL_USER_LIST_FAILED:
      return { ...state, message: action.message };

    case REPORT_GET_INSURANCE_TYPE:
      return { ...state };

    case REPORT_GET_INSURANCE_TYPE_SUCCESS:
      return { ...state, policyTypes: action.data };

    case REPORT_GET_INSURANCE_TYPE_FAILED:
      return { ...state, message: action.message };

    case REPORT_GET_INSURANCE_COMPANIES:
      return { ...state };

    case REPORT_GET_INSURANCE_COMPANIES_SUCCESS:
      return { ...state, insuranceCom: action.data };

    case REPORT_GET_INSURANCE_COMPANIES_FAILED:
      return { ...state, message: action.message };

    case REPORT_GET_COMPLAINT_TYPE:
      return { ...state };

    case REPORT_GET_COMPLAINT_TYPE_SUCCESS:
      return { ...state, comTypes: action.data };

    case REPORT_GET_COMPLAINT_TYPE_FAILED:
      return { ...state, message: action.message };

    case REPORT_UPLOAD_DOC:
      return { ...state };

    case REPORT_UPLOAD_DOC_SUCCESS:
      return { ...state, message: action.message };

    case REPORT_UPLOAD_DOC_FAILED:
      return { ...state, message: action.message };

    case REPORT_UPLOAD_TO_SERVER:
      return { ...state };

    case REPORT_UPLOAD_TO_SERVER_SUCCESS:
      return { ...state, message: action.message };

    case REPORT_UPLOAD_TO_SERVER_FAILED:
      return { ...state, message: action.message };

    case REPORT_RESOLVED_CASES:
      return { ...state };

    case REPORT_RESOLVED_CASES_SUCCESS:
      return { ...state, resolveData: action.data };

    case REPORT_RESOLVED_CASES_FAILED:
      return { ...state, message: action.message };

    case REPORT_RESOLVED_PAYMENT_CASES:
      return { ...state };

    case REPORT_RESOLVED_PAYMENT_CASES_SUCCESS:
      return { ...state, relPaymentData: action.data };

    case REPORT_RESOLVED_PAYMENT_CASES_FAILED:
      return { ...state, message: action.message };

    case REPORT_CASE_REPORT_DATA:
      return { ...state };

    case REPORT_CASE_REPORT_DATA_SUCCESS:
      return { ...state, caseRep: action.data };

    case REPORT_CASE_REPORT_DATA_FAILED:
      return { ...state, message: action.message };

    case REPORT_CASE_REPORT_STATUS_DATA:
      return { ...state };

    case REPORT_CASE_REPORT_STATUS_DATA_SUCCESS:
      return { ...state, caseRep: action.data };

    case REPORT_CASE_REPORT_STATUS_DATA_FAILED:
      return { ...state, message: action.message };

    case REPORT_CASE_REPORT_AGENT_DATA:
      return { ...state };

    case REPORT_CASE_REPORT_AGENT_DATA_SUCCESS:
      return { ...state, caseRep: action.data };

    case REPORT_CASE_REPORT_AGENT_DATA_FAILED:
      return { ...state, message: action.message };

    case REPORT_CASE_REPORT_COUNT_DATA:
      return { ...state };

    case REPORT_CASE_REPORT_COUNT_DATA_SUCCESS:
      return { ...state, caseRepCount: action.data };

    case REPORT_CASE_REPORT_COUNT_DATA_FAILED:
      return { ...state, message: action.message };

    case LEAD_REPORT_COUNT_DATA:
      return { ...state };

    case LEAD_REPORT_COUNT_DATA_SUCCESS:
      return { ...state, leadRepCount: action.data };

    case LEAD_REPORT_COUNT_DATA_FAILED:
      return { ...state, message: action.message };

    case TODAY_LEAD_COUNT_DATA:
      return { ...state };

    case TODAY_LEAD_COUNT_DATA_SUCCESS:
      return { ...state, todayLeadCount: action.data };

    case TODAY_LEAD_COUNT_DATA_FAILED:
      return { ...state, message: action.message };

    case LEAD_REPORT_DATA:
      return { ...state };

    case LEAD_REPORT_DATA_SUCCESS:
      return { ...state, leadRepData: action.data };

    case LEAD_REPORT_DATA_FAILED:
      return { ...state, message: action.message };

    case PAYMENT_REPORT_DATA:
      return { ...state };

    case PAYMENT_REPORT_DATA_SUCCESS:
      return { ...state, payRepData: action.data };

    case PAYMENT_REPORT_DATA_FAILED:
      return { ...state, message: action.message };

    case PAYMENT_REPORT_STATUS_DATA:
      return { ...state };

    case PAYMENT_REPORT_STATUS_DATA_SUCCESS:
      return { ...state, payRepData: action.data };

    case PAYMENT_REPORT_STATUS_DATA_FAILED:
      return { ...state, message: action.message };

    case MONTHLY_REPORT_DATA:
      return { ...state };

    case MONTHLY_REPORT_DATA_SUCCESS:
      return { ...state, monthlyRepData: action.data };

    case MONTHLY_REPORT_DATA_FAILED:
      return { ...state, message: action.message };

    case COMPLAINT_MONTHLY_REPORT:
      return { ...state };

    case COMPLAINT_MONTHLY_REPORT_SUCCESS:
      return { ...state, comMontlyRep: action.data };

    case COMPLAINT_MONTHLY_REPORT_FAILED:
      return { ...state, message: action.message };

    case AGENT_CASES_MONTHLY_REPORT:
      return { ...state };

    case AGENT_CASES_MONTHLY_REPORT_SUCCESS:
      return { ...state, agentCases: action.data };

    case AGENT_CASES_MONTHLY_REPORT_FAILED:
      return { ...state, message: action.message };

    case AGENT_CASES_CONTRACT_MONTHLY_REPORT:
      return { ...state };

    case AGENT_CASES_CONTRACT_MONTHLY_REPORT_SUCCESS:
      return { ...state, agentCasesCon: action.data };

    case AGENT_CASES_CONTRACT_MONTHLY_REPORT_FAILED:
      return { ...state, message: action.message };

    case COMPLAINT_REPORT_DATA:
      return { ...state };

    case COMPLAINT_REPORT_DATA_SUCCESS:
      return { ...state, compData: action.data };

    case COMPLAINT_REPORT_DATA_FAILED:
      return { ...state, message: action.message };

    case OMBUDSMAN_EXECUTIVE_REPORT:
      return { ...state };

    case OMBUDSMAN_EXECUTIVE_REPORT_SUCCESS:
      return { ...state, ombData: action.data };

    case OMBUDSMAN_EXECUTIVE_REPORT_FAILED:
      return { ...state, message: action.message };

    case REGISTERED_LEAD_REPORT:
      return { ...state };

    case REGISTERED_LEAD_REPORT_SUCCESS:
      return { ...state, regLead: action.data };

    case REGISTERED_LEAD_REPORT_FAILED:
      return { ...state, message: action.message };

    case MONTHLY_RESOLVED_B2C:
      return { ...state };

    case MONTHLY_RESOLVED_B2C_SUCCESS:
      return { ...state, monthlyB2C: action.data };

    case MONTHLY_RESOLVED_B2C_FAILED:
      return { ...state, message: action.message };

    case OMB_REJECT_CASES:
      return { ...state };

    case OMB_REJECT_CASES_SUCCESS:
      return { ...state, ombRejectCases: action.data };

    case OMB_REJECT_CASES_FAILED:
      return { ...state, message: action.message };

    case TAT_REPORT_DATA:
      return { ...state };

    case TAT_REPORT_DATA_SUCCESS:
      return { ...state, tatData: action.data };

    case TAT_REPORT_DATA_FAILED:
      return { ...state, message: action.message };

    case BOT_REPORT_DATA:
      return { ...state };

    case BOT_REPORT_DATA_SUCCESS:
      return { ...state, botData: action.data };

    case BOT_REPORT_DATA_FAILED:
      return { ...state, message: action.message };

    default:
      return { ...state };
  }
};
