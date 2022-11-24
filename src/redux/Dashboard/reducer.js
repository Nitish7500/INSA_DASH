import data from "data/notifications";
import {
  ALL_LEAD_BUCKET,
  ALL_LEAD_BUCKET_SUCCESS,
  TODAY_LEAD_BUCKET,
  TODAY_LEAD_BUCKET_SUCCESS,
  TODAY_LEAD_BUCKET_FAILED,
  MONTHLY_LEAD_BUCKET,
  MONTHLY_LEAD_BUCKET_SUCCESS,
  MONTHLY_LEAD_BUCKET_FAILED,
  LEAD_EXPERT_BUCKET_SUCCESS,
  LEAD_EXPERT_BUCKET,
  LEAD_EXPERT_BUCKET_FAILED,
  LEAD_BUCKET_COUNT,
  LEAD_BUCKET_COUNT_SUCCESS,
  LEAD_BUCKET_COUNT_FAILED,
  COMPLAINT_DASHBOARD,
  COMPLAINT_DASHBOARD_SUCCESS,
  COMPLAINT_DASHBOARD_FAILED,
  B2C_REGISTRATION_SUCCESS,
  B2C_REGISTRATION_FAILED,
  B2C_REGISTRATION_CASES,
  B2C_REGISTRATION_CASES_SUCCESS,
  B2C_REGISTRATION_CASES_FAILED,
  PARTNER_REGISTRATION,
  PARTNER_REGISTRATION_SUCCESS,
  PARTNER_REGISTRATION_FAILED,
  B2C_REGISTRATION,
  B2C_RESOLUTION,
  B2C_RESOLUTION_SUCCESS,
  B2C_RESOLUTION_FAILED,
  PARTNER_RESOLUTION,
  PARTNER_RESOLUTION_SUCCESS,
  PARTNER_RESOLUTION_FAILED,
  B2C_SATTLED,
  B2C_SATTLED_SUCCESS,
  B2C_SATTLED_FAILED,
  PARTNER_SATTLED_CASES,
  PARTNER_SATTLED_CASES_SUCCESS,
  PARTNER_SATTLED_CASES_FAILED,
  B2C_INVOICE_RAISED,
  B2C_INVOICE_RAISED_SUCCESS,
  B2C_INVOICE_RAISED_FAILED,
  PARTNER_INVOICE,
  PARTNER_INVOICE_SUCCESS,
  PARTNER_INVOICE_FAILED,
  LEGAL_PARTNER_DASHBOARD,
  LEGAL_PARTNER_DASHBOARD_SUCCESS,
  LEGAL_PARTNER_DASHBOARD_FAILED,
  PARTNER_OMBUDSMAN_COUNT,
  PARTNER_OMBUDSMAN_COUNT_SUCCESS,
  PARTNER_OMBUDSMAN_COUNT_FAILED,
  NEW_OMBUDSMAN_COUNT_B2C,
  NEW_OMBUDSMAN_COUNT_B2C_SUCCESS,
  NEW_OMBUDSMAN_COUNT_B2C_FAILED,
  NEW_OMBUDSMAN_COUNT_PARTNER,
  NEW_OMBUDSMAN_COUNT_PARTNER_SUCCESS,
  NEW_OMBUDSMAN_COUNT_PARTNER_FAILED,
  OMBUDSMAN_RESEND_CASES_B2C,
  OMBUDSMAN_RESEND_CASES_B2C_SUCCESS,
  OMBUDSMAN_RESEND_CASES_B2C_FAILED,
  OMBUDSMAN_RESEND_CASES_PARTNER,
  OMBUDSMAN_RESEND_CASES_PARTNER_SUCCESS,
  OMBUDSMAN_RESEND_CASES_PARTNER_FAILED,
  B2C_OMBUDSMAN_COUNT,
  B2C_OMBUDSMAN_COUNT_SUCCESS,
  B2C_OMBUDSMAN_COUNT_FAILED,
  B2C_MAILING_COUNT,
  B2C_MAILING_COUNT_SUCCESS,
  B2C_MAILING_COUNT_FAILED,
  PARTNER_MAILING_COUNT,
  PARTNER_MAILING_COUNT_SUCCESS,
  PARTNER_MAILING_COUNT_FAILED,
  GET_STATES,
  GET_STATES_SUCCESS,
  GET_STATES_FAILED,
  GET_ACTIVE_USER,
  GET_ACTIVE_USER_SUCCESS,
  GET_ACTIVE_USER_FAILED,
} from "./action";

const initialState = {
  activeUsers: [],
  states: [],

  allLeadBucket: {},
  todayLeadBucket: {},
  monthlyLeadBucket: [],
  leadExports: [],
  bucketCount: [],

  complaintDashboard: {},
  b2cRegistration: {},
  b2cRegistrationCases: [],
  partnerRegistration: {},

  b2cResolution: {},
  partnerResolution: {},
  b2cSattled: {},
  partnerSattled: {},
  b2cInvoiceRaised: [],
  partnerInvoiceCases: {},

  legalPartner: {},

  b2cOmbudsmanCount: [],
  partnerOmbudsmanCount: [],
  newB2COmbudsmanCount: [],
  nerPartnerOmbudsmanCount: [],
  resendB2CCases: [],
  resendPartnerCases: [],

  b2cMailingCount: [],
  partnerMailingCount: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_LEAD_BUCKET:
      return { ...state };

    case ALL_LEAD_BUCKET_SUCCESS:
      return { ...state, allLeadBucket: action.data };

    case TODAY_LEAD_BUCKET:
      return { ...state };

    case TODAY_LEAD_BUCKET_SUCCESS:
      return { ...state, todayLeadBucket: action.data };

    case TODAY_LEAD_BUCKET_FAILED:
      return { ...state, message: action.message };

    case MONTHLY_LEAD_BUCKET:
      return { ...state };

    case MONTHLY_LEAD_BUCKET_SUCCESS:
      return { ...state, monthlyLeadBucket: action.data };

    case MONTHLY_LEAD_BUCKET_FAILED:
      return { ...state, message: action.message };

    case LEAD_EXPERT_BUCKET:
      return { ...state };

    case LEAD_EXPERT_BUCKET_SUCCESS:
      return { ...state, leadExports: action.data };

    case LEAD_EXPERT_BUCKET_FAILED:
      return { ...state, message: action.message };

    case LEAD_BUCKET_COUNT:
      return { ...state };

    case LEAD_BUCKET_COUNT_SUCCESS:
      return { ...state, bucketCount: action.data };

    case LEAD_BUCKET_COUNT_FAILED:
      return { ...state, message: action.message };

    case COMPLAINT_DASHBOARD:
      return { ...state };

    case COMPLAINT_DASHBOARD_SUCCESS:
      return { ...state, complaintDashboard: action.data };

    case COMPLAINT_DASHBOARD_FAILED:
      return { ...state, message: action.message };

    case B2C_REGISTRATION:
      return { ...state };

    case B2C_REGISTRATION_SUCCESS:
      return { ...state, b2cRegistration: action.data };

    case B2C_REGISTRATION_FAILED:
      return { ...state, message: action.message };

    case B2C_REGISTRATION_CASES:
      return { ...state };

    case B2C_REGISTRATION_CASES_SUCCESS:
      return { ...state, b2cRegistrationCases: action.data };

    case B2C_REGISTRATION_CASES_FAILED:
      return { ...state, message: action.message };

    case PARTNER_REGISTRATION:
      return { ...state };

    case PARTNER_REGISTRATION_SUCCESS:
      return { ...state, partnerRegistration: action.data };

    case PARTNER_REGISTRATION_FAILED:
      return { ...state, message: action.message };

    case B2C_RESOLUTION:
      return { ...state };

    case B2C_RESOLUTION_SUCCESS:
      return { ...state, b2cResolution: action.data };

    case B2C_RESOLUTION_FAILED:
      return { ...state, message: action.message };

    case PARTNER_RESOLUTION:
      return { ...state };

    case PARTNER_RESOLUTION_SUCCESS:
      return { ...state, partnerResolution: action.data };

    case PARTNER_RESOLUTION_FAILED:
      return { ...state, message: action.message };

    case B2C_SATTLED:
      return { ...state };

    case B2C_SATTLED_SUCCESS:
      return { ...state, b2cSattled: action.data };

    case B2C_SATTLED_FAILED:
      return { ...state, message: action.message };

    case PARTNER_SATTLED_CASES:
      return { ...state };

    case PARTNER_SATTLED_CASES_SUCCESS:
      return { ...state, partnerSattled: action.data };

    case PARTNER_SATTLED_CASES_FAILED:
      return { ...state, message: action.message };

    case B2C_INVOICE_RAISED:
      return { ...state };

    case B2C_INVOICE_RAISED_SUCCESS:
      return { ...state, b2cInvoiceRaised: action.data };

    case B2C_INVOICE_RAISED_FAILED:
      return { ...state, message: action.message };

    case PARTNER_INVOICE:
      return { ...state };

    case PARTNER_INVOICE_SUCCESS:
      return { ...state, partnerInvoiceCases: action.data };

    case PARTNER_INVOICE_FAILED:
      return { ...state, message: action.message };

    case LEGAL_PARTNER_DASHBOARD:
      return { ...state };

    case LEGAL_PARTNER_DASHBOARD_SUCCESS:
      return { ...state, legalPartner: action.data };

    case LEGAL_PARTNER_DASHBOARD_FAILED:
      return { ...state, message: action.message };

    case B2C_OMBUDSMAN_COUNT:
      return { ...state };

    case B2C_OMBUDSMAN_COUNT_SUCCESS:
      return { ...state, b2cOmbudsmanCount: action.data };

    case B2C_OMBUDSMAN_COUNT_FAILED:
      return { ...state, message: action.message };

    case PARTNER_OMBUDSMAN_COUNT:
      return { ...state };

    case PARTNER_OMBUDSMAN_COUNT_SUCCESS:
      return { ...state, partnerOmbudsmanCount: action.data };

    case PARTNER_OMBUDSMAN_COUNT_FAILED:
      return { ...state, message: action.message };

    case NEW_OMBUDSMAN_COUNT_B2C:
      return { ...state };

    case NEW_OMBUDSMAN_COUNT_B2C_SUCCESS:
      return { ...state, newB2COmbudsmanCount: action.data };

    case NEW_OMBUDSMAN_COUNT_B2C_FAILED:
      return { ...state, message: action.message };

    case NEW_OMBUDSMAN_COUNT_PARTNER:
      return { ...state };

    case NEW_OMBUDSMAN_COUNT_PARTNER_SUCCESS:
      return { ...state, nerPartnerOmbudsmanCount: action.data };

    case NEW_OMBUDSMAN_COUNT_PARTNER_FAILED:
      return { ...state, message: action.message };

    case OMBUDSMAN_RESEND_CASES_B2C:
      return { ...state };

    case OMBUDSMAN_RESEND_CASES_B2C_SUCCESS:
      return { ...state, resendB2CCases: action.data };

    case OMBUDSMAN_RESEND_CASES_B2C_FAILED:
      return { ...state, message: action.message };

    case OMBUDSMAN_RESEND_CASES_PARTNER:
      return { ...state };

    case OMBUDSMAN_RESEND_CASES_PARTNER_SUCCESS:
      return { ...state, resendPartnerCases: action.data };

    case OMBUDSMAN_RESEND_CASES_PARTNER_FAILED:
      return { ...state, message: action.message };

    case B2C_MAILING_COUNT:
      return { ...state };

    case B2C_MAILING_COUNT_SUCCESS:
      return { ...state, b2cMailingCount: action.data };

    case B2C_MAILING_COUNT_FAILED:
      return { ...state, message: action.message };

    case PARTNER_MAILING_COUNT:
      return { ...state };

    case PARTNER_MAILING_COUNT_SUCCESS:
      return { ...state, partnerMailingCount: action.data };

    case PARTNER_MAILING_COUNT_FAILED:
      return { ...state, message: action.message };

    case GET_ACTIVE_USER:
      return { ...state };

    case GET_ACTIVE_USER_SUCCESS:
      return { ...state, activeUsers: action.data };

    case GET_ACTIVE_USER_FAILED:
      return { ...state, message: action.message };

    case GET_STATES:
      return { ...state };

    case GET_STATES_SUCCESS:
      return { ...state, states: action.data };

    case GET_STATES_FAILED:
      return { ...state, message: action.message };

    default:
      return { ...state };
  }
};
