import { ALL_LEAD_BUCKET } from "./action";
import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  fork,
} from "redux-saga/effects";
import axios from "axios";
import { getCurrentUser } from "helpers/Utils";
import { request } from "services/requests.services";

let bucketCount = {
  userBucket: [
    "ALL",
    "PENDING",
    "ACCEPTED",
    "ACCEPTED WITH PENDENCY",
    "INCOMPLETE INFORMATION",
    "CONTRACT SIGNED",
    "COMPLAINT FORM FILLED",
    "DRAFT MAIL GENERATED",
    "EXPERT APPROVED DRAFT MAIL",
    "COMPANY",
    "IGMS",
    "ESCALATION MAIL GENERATED",
    "COMPANY ESCALATED",
    "IGMS ESCALATED",
    "COMPANY/IGMS ESCALATED",
    "ESCALATION PENDING",
    "NO RESPONSE RECEIVED",
    "ESCALATION APPROVED",
    "COMPANY REQUIREMENT RECEIVED",
    "COMPANY REQUIREMENT SENT",
    "OMBUDSMAN PENDING",
    "OMBUDSMAN REQUIREMENT PENDING",
    "OMBUDSMAN REQUIREMENT PUSHED",
    "COMPLAINT FORM SENT",
    "OMBUDSMAN WITHOUT LEGAL",
    "OMBUDSMAN REQUIREMENT SENT",
    "FORM 6A RECEIVED",
    "FORM 6A PUSHED",
    "FORM 6A SENT",
    "HEARING DATE RECEIVED",
    "HEARING DONE",
    "AWARD ACCEPTED",
    "AWARD REJECTED",
    "LEGAL",
    "INVOICE RAISED",
    "REMINDER MAIL SENT",
    "REJECTED",
    "COMPANY PAYMENT PENDING",
    "OMBUDSMAN WITH LEGAL",
    "RESOLVED",
    "UNRESOLVED",
    "SETTLED",
    "REIMBURSEMENT",
    "ASSERVICES",
    "CUSTOMER REJECTED",
    "INSA REJECTED",
    "LEGAL CONTRACT PENDING",
    "LEGAL CONTRACT SIGNED",
    "LEGAL QUERY RAISED",
    "LEGAL QUERY ANSWERED",
    "LEGAL DRAFT FOR APPROVAL",
    "COURT FILING POINTS",
    "COURT FILING PENDING BUCKET",
    "CASE FILING DONE",
    "CUSTOMER WITHDRAW",
    "LEGAL RECOVERY FROM CUSTOMER",
    "LEGAL NOTICE RECEIVED",
    "LEGAL NOTICE SENT",
    "LEGAL RECOVERY FROM COMPANY",
    "COURT ISSUED SUMMON",
    "COMPANY REPLY AWAITED",
    "REJOINDER NEED TO BE FILED",
    "AFFIDAVIT NEED TO BE FILED",
    "COMPLAINANT EVIDENCE",
    "DEFENDANT EVIDENCE",
    "SETTLEMENT PROPOSAL SUBMISSION PENDING",
    "SETTLEMENT PROPOSAL SUBMITTED",
    "AGRUMENTS",
    "FINAL ARGUMENTS",
    "ORDER AWAITED",
    "INVOICE PROCESSING",
  ],
  complaintBucket: [
    "ALL",
    "Pending",
    "Accept",
    "ACCEPTED WITH PENDENCY",
    "Information Incomplete",
    "COMPLAINT FORM FILLED",
    "DRAFT MAIL GENERATED",
    "EXPERT APPROVED DRAFT MAIL",
    "Company",
    "IGMS",
    "EXPERT MAIL DRAFTED",
    "ESCALATION PENDING",
    "NO RESPONSE RECEIVED",
    "ESCALATION APPROVED",
    "COMPANY REQUIREMENT RECEIVED",
    "COMPANY REQUIREMENT SENT",
    "ESCALATION MAIL GENERATED",
    "COMPANY ESCALATED",
    "IGMS ESCALATED",
    "COMPANY/IGMS ESCALATED",
    "Ombudsman Pending",
    "OMBUDSMAN REQUIREMENT PENDING",
    "OMBUDSMAN REQUIREMENT PUSHED",
    "COMPLAINT FORM SENT",
    "Ombudsman without Legal",
    "OMBUDSMAN REQUIREMENT SENT",
    "FORM 6A RECEIVED",
    "FORM 6A PUSHED",
    "FORM 6A SENT",
    "HEARING DATE RECEIVED",
    "HEARING DONE",
    "AWARD ACCEPTED",
    "AWARD REJECTED",
    "Legal",
    "INVOICE RAISED",
    "REMINDER MAIL SENT",
    "Reject",
    "COMPANY PAYMENT PENDING",
    "Ombudsman with Legal",
    "Resolved",
    "UnResolved",
    "Settled",
    "REIMBURSEMENT",
    "ASSERVICES",
    "CUSTOMER REJECTED",
    "INSA REJECTED",
    "LEGAL CONTRACT PENDING",
    "LEGAL CONTRACT SIGNED",
    "LEGAL QUERY RAISED",
    "LEGAL QUERY ANSWERED",
    "LEGAL DRAFT FOR APPROVAL",
    "COURT FILING POINTS",
    "COURT FILING PENDING BUCKET",
    "CASE FILING DONE",
    "CUSTOMER WITHDRAW",
    "INVOICE PROCESSING",
    "LEGAL RECOVERY FROM CUSTOMER",
    "LEGAL NOTICE RECEIVED",
    "LEGAL NOTICE SENT",
    "LEGAL RECOVERY FROM COMPANY",
    "COURT ISSUED SUMMON",
    "COMPANY REPLY AWAITED",
    "REJOINDER NEED TO BE FILED",
    "AFFIDAVIT NEED TO BE FILED",
    "COMPLAINANT EVIDENCE",
    "DEFENDANT EVIDENCE",
    "SETTLEMENT PROPOSAL SUBMISSION PENDING",
    "SETTLEMENT PROPOSAL SUBMITTED",
    "AGRUMENTS",
    "FINAL ARGUMENTS",
    "ORDER AWAITED",
  ],
  KeyRefresh: false,
};

function getAllBucketData(type) {
  return request(
    "POST",
    "https://api.stage.insurancesamadhan.com/lead/countstatuswise",
    {
      user_id: null,
      KeyRefresh: false,
      ...type,
    }
  );
}

function getLeadExpertData() {
  return request(
    "POST",
    "https://api.stage.insurancesamadhan.com/lead/leadExpertCount",
    {
      user_id: null,
      KeyRefresh: false,
    }
  );
}

function getBucketCount() {
  return request(
    "POST",
    "https://api.stage.insurancesamadhan.com/insurance/getBucketCount",
    bucketCount
  );
}

function* getAllBucket(action) {
  try {
    const data = yield call(() => getAllBucketData({ dailyAll: "Today" }));
    yield put({ type: "ALL_LEAD_BUCKET_SUCCESS", data: data?.data });
  } catch (error) {
    yield put({ type: "ALL_LEAD_BUCKET_FAILED", message: "Failed to fetch" });
  }
}

function* getTodayLeadBucket(action) {
  try {
    const data = yield call(() => getAllBucketData({ dailyAll: "Daily" }));
    yield put({ type: "TODAY_LEAD_BUCKET_SUCCESS", data: data?.data });
  } catch (error) {
    yield put({ type: "TODAY_LEAD_BUCKET_FAILED", message: "Failed to fetch" });
  }
}

function* getMonthlyLeadBucket(action) {
  try {
    const data = yield call(() => getAllBucketData({ dailyAll: "Monthly" }));
    yield put({
      type: "MONTHLY_LEAD_BUCKET_SUCCESS",
      data: data?.data?.marketingChannel,
    });
  } catch (error) {
    yield put({
      type: "MONTHLY_LEAD_BUCKET_FAILED",
      message: "Failed to fetch",
    });
  }
}

function* getLeadExpert(action) {
  try {
    const data = yield call(getLeadExpertData);
    console.log(data);
    yield put({
      type: "LEAD_EXPERT_BUCKET_SUCCESS",
      data: data?.data?.allExperts,
    });
  } catch (error) {
    yield put({
      type: "LEAD_EXPERT_BUCKET_FAILED",
      message: "Failed to fetch",
    });
  }
}

function* getBucketCountFunc(action) {
  try {
    const data = yield call(getBucketCount);
    yield put({
      type: "LEAD_BUCKET_COUNT_SUCCESS",
      data: data?.data,
    });
  } catch (error) {
    yield put({
      type: "LEAD_BUCKET_COUNT_FAILED",
      message: "Failed to fetch",
    });
  }
}

function* getComplaintFunc(action) {
  try {
    const data = yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/insurance/getComplaintCount",
      {
        user_id: null,
        KeyRefresh: false,
      }
    );

    yield put({
      type: "COMPLAINT_DASHBOARD_SUCCESS",
      data: data?.data,
    });
  } catch (error) {
    yield put({
      type: "COMPLAINT_DASHBOARD_FAILED",
      message: "Failed to fetch",
    });
  }
}

function* getB2CRegistrationFunc(action) {
  try {
    const data = yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/insurance/getRegistrationCount",
      {
        user_id: null,
        KeyRefresh: false,
        dateWise: "Monthly",
      }
    );

    yield put({
      type: "B2C_REGISTRATION_SUCCESS",
      data: data?.data,
    });
  } catch (error) {
    yield put({
      type: "B2C_REGISTRATION_FAILED",
      message: "Failed to fetch",
    });
  }
}

function* getB2CRegistrationCasesFunc(action) {
  try {
    const data = yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/insurance/getInvoiceSettledCount",
      {
        user_id: null,
        KeyRefresh: false,
        type: "Registration Data",
        dateWise: "Monthly",
      }
    );

    yield put({
      type: "B2C_REGISTRATION_CASES_SUCCESS",
      data: data?.data,
    });
  } catch (error) {
    yield put({
      type: "B2C_REGISTRATION_CASES_FAILED",
      message: "Failed to fetch",
    });
  }
}

function* getPartnerRegistration(action) {
  try {
    const data = yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/insurance/getPartnerRegistrationCount",
      {
        user_id: null,
        KeyRefresh: false,
        dateWise: "Monthly",
      }
    );

    yield put({
      type: "PARTNER_REGISTRATION_SUCCESS",
      data: data?.data,
    });
  } catch (error) {
    yield put({
      type: "PARTNER_REGISTRATION_FAILED",
      message: "Failed to fetch",
    });
  }
}

function* getb2cResolution(action) {
  try {
    const data = yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/insurance/getResolvedCount",
      {
        user_id: null,
        KeyRefresh: false,
        dateWise: "Monthly",
      }
    );

    yield put({
      type: "B2C_RESOLUTION_SUCCESS",
      data: data?.data,
    });
  } catch (error) {
    yield put({
      type: "B2C_RESOLUTION_FAILED",
      message: "Failed to fetch",
    });
  }
}

function* getPartnerResolution(action) {
  try {
    const data = yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/partnerApi/getPartnerResolvedCount",
      {
        user_id: null,
        KeyRefresh: false,
        dateWise: "Monthly",
      }
    );

    yield put({
      type: "PARTNER_RESOLUTION_SUCCESS",
      data: data?.data,
    });
  } catch (error) {
    yield put({
      type: "PARTNER_RESOLUTION_FAILED",
      message: "Failed to fetch",
    });
  }
}

function* getb2cSattled(action) {
  try {
    const data = yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/insurance/getInvoiceSettledCount",
      {
        user_id: null,
        KeyRefresh: false,
        type: "Settled Data",
        dateWise: "Monthly",
      }
    );

    console.log(data);
    yield put({
      type: "B2C_SATTLED_SUCCESS",
      data: data?.data,
    });
  } catch (error) {
    yield put({
      type: "B2C_SATTLED_FAILED",
      message: "Failed to fetch",
    });
  }
}

function* getPartnerSattled(action) {
  try {
    const data = yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/partnerApi/getInvoiceSettledCount",
      {
        user_id: null,
        KeyRefresh: false,
        type: "Settled Data",
        dateWise: "Monthly",
      }
    );

    console.log(data);
    yield put({
      type: "PARTNER_SATTLED_CASES_SUCCESS",
      data: data?.data,
    });
  } catch (error) {
    yield put({
      type: "PARTNER_SATTLED_CASES_FAILED",
      message: "Failed to fetch",
    });
  }
}

function* getb2cInvoiceRaised(action) {
  try {
    const data = yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/insurance/getInvoiceSettledCount",
      {
        user_id: null,
        KeyRefresh: false,
        type: "Invoice Data",
        dateWise: "Monthly",
      }
    );

    console.log(data);
    yield put({
      type: "B2C_INVOICE_RAISED_SUCCESS",
      data: data?.data,
    });
  } catch (error) {
    yield put({
      type: "B2C_INVOICE_RAISED_FAILED",
      message: "Failed to fetch",
    });
  }
}

function* getPartnerInvoiceRaised(action) {
    try {
      const data = yield request(
        "POST",
        "https://api.stage.insurancesamadhan.com/partnerApi/getInvoiceSettledCount",
        {
            "user_id": null,
            "KeyRefresh": false,
            "type": "Invoice Data",
            "dateWise": "Monthly"
          }
      );
  
      console.log(data);
      yield put({
        type: "PARTNER_INVOICE_SUCCESS",
        data: data?.data,
      });
    } catch (error) {
      yield put({
        type: "PARTNER_INVOICE_FAILED",
        message: "Failed to fetch",
      });
    }
  }

export default function* mySaga() {
  yield takeEvery("ALL_LEAD_BUCKET", getAllBucket);
  yield takeEvery("TODAY_LEAD_BUCKET", getTodayLeadBucket);
  yield takeEvery("MONTHLY_LEAD_BUCKET", getMonthlyLeadBucket);
  yield takeEvery("LEAD_EXPERT_BUCKET", getLeadExpert);
  yield takeEvery("LEAD_BUCKET_COUNT", getBucketCountFunc);
  yield takeEvery("COMPLAINT_DASHBOARD", getComplaintFunc);
  yield takeEvery("B2C_REGISTRATION", getB2CRegistrationFunc);
  yield takeEvery("B2C_REGISTRATION_CASES", getB2CRegistrationCasesFunc);
  yield takeEvery("PARTNER_REGISTRATION", getPartnerRegistration);
  yield takeEvery("B2C_RESOLUTION", getb2cResolution);
  yield takeEvery("PARTNER_RESOLUTION", getPartnerResolution);
  yield takeEvery("B2C_SATTLED", getb2cSattled);
  yield takeEvery("PARTNER_SATTLED_CASES", getPartnerSattled);
  yield takeEvery("B2C_INVOICE_RAISED", getb2cInvoiceRaised);
  yield takeEvery("PARTNER_INVOICE",getPartnerInvoiceRaised)
}
