import { currentUser } from "constants/defaultValues";

const { put, takeEvery } = require("redux-saga/effects");
const { bearerRequest, request } = require("services/requests.services");

function* getActiveStatus(action) {
  try {
    const data = yield bearerRequest(
      "GET",
      "https://agentapi.stage.insurancesamadhan.com/status/activeStatus"
    );

    yield put({ type: "REPORT_GET_ACTIVE_STATUS_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "REPORT_GET_ACTIVE_STATUS_FAILED",
      message: "Failed to fetch active status !!",
    });
  }
}

function* getUserAgentData(action) {
  try {
    const data = yield bearerRequest(
      "GET",
      "https://agentapi.stage.insurancesamadhan.com/assignUserAgent"
    );

    yield put({ type: "REPORT_GET_USER_AGENT_DATA_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "REPORT_GET_USER_AGENT_DATA_FAILED",
      message: "Failed to fetch Agent Users !!",
    });
  }
}

function* getAllUserList(action) {
  try {
    const data = yield bearerRequest(
      "POST",
      "https://agentapi.stage.insurancesamadhan.com/allUsersData",
      { userOperation: null, userId: "admin" }
    );

    yield put({ type: "REPORT_GET_ALL_USER_LIST_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "REPORT_GET_ALL_USER_LIST_FAILED",
      message: "Failed to fetch All Users !!",
    });
  }
}

function* getPolicyTypes(action) {
  try {
    const data = yield request(
      "GET",
      "https://api.stage.insurancesamadhan.com/policy_type"
    );

    yield put({ type: "REPORT_GET_INSURANCE_TYPE_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "REPORT_GET_INSURANCE_TYPE_FAILED",
      message: "Failed to fetch All Users !!",
    });
  }
}

function* getInsuComs(action) {
  try {
    const data = yield request(
      "GET",
      `https://api.stage.insurancesamadhan.com/insurance_company/getByPolicyId?policyTypeId=${action.policyType}`
    );

    yield put({
      type: "REPORT_GET_INSURANCE_COMPANIES_SUCCESS",
      data: data.data,
    });
  } catch (error) {
    yield put({
      type: "REPORT_GET_INSURANCE_COMPANIES_FAILED",
      message: "Failed to fetch All Users !!",
    });
  }
}

function* getComTypes(action) {
  try {
    const data = yield request(
      "GET",
      `https://api.stage.insurancesamadhan.com/complaint_type?policyTypeId=${action.policyType}`
    );

    yield put({ type: "REPORT_GET_COMPLAINT_TYPE_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "REPORT_GET_COMPLAINT_TYPE_FAILED",
      message: "Failed to fetch All Users !!",
    });
  }
}

function* uploadDoc(action) {
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/lead/upload`,
      action.state
    );

    yield put({
      type: "REPORT_UPLOAD_DOC_SUCCESS",
      message: "Uploaded Successful !",
    });
  } catch (error) {
    yield put({
      type: "REPORT_UPLOAD_DOC_FAILED",
      message: "Failed to upload Doc !!",
    });
  }
}

function* uploadDocServer(action) {
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/lead/addLead`,
      action.state
    );

    yield put({
      type: "REPORT_UPLOAD_TO_SERVER_SUCCESS",
      message: "Uploaded Successful !",
    });
  } catch (error) {
    yield put({
      type: "REPORT_UPLOAD_TO_SERVER_FAILED",
      message: "Failed to upload Doc !!",
    });
  }
}

function* resolvedCases(action) {
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/insurance/allResolved`,
      action.state
    );

    yield put({ type: "REPORT_RESOLVED_CASES_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "REPORT_RESOLVED_CASES_FAILED",
      message: "Failed to upload Data !!",
    });
  }
}

function* resolvedPayCases(action) {
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/insurance/allResolved`,
      action.state
    );

    yield put({
      type: "REPORT_RESOLVED_PAYMENT_CASES_SUCCESS",
      data: data.data,
    });
  } catch (error) {
    yield put({
      type: "REPORT_RESOLVED_PAYMENT_CASES_FAILED",
      message: "Failed to upload Data !!",
    });
  }
}

function* caseRepFunc(action) {
  try {
    const data = yield bearerRequest(
      "POST",
      `https://agentapi.stage.insurancesamadhan.com/case/dateWise`,
      action.state
    );

    yield put({ type: "REPORT_CASE_REPORT_DATA_SUCCESS", data: data.data });
  } catch (error) {
    console.log(error);
    yield put({
      type: "REPORT_CASE_REPORT_DATA_FAILED",
      message: "Failed to get Data !!",
    });
  }
}

function* caseRepByStatus(action) {
  try {
    const data = yield bearerRequest(
      "POST",
      `https://agentapi.stage.insurancesamadhan.com/case/statusWise`,
      action.state
    );

    yield put({
      type: "REPORT_CASE_REPORT_STATUS_DATA_SUCCESS",
      data: data.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: "REPORT_CASE_REPORT_STATUS_DATA_FAILED",
      message: "Failed to get Data by Status !!",
    });
  }
}

function* caseRepByAgent(action) {
  try {
    const data = yield bearerRequest(
      "POST",
      `https://agentapi.stage.insurancesamadhan.com/case/agentWise`,
      action.state
    );

    yield put({
      type: "REPORT_CASE_REPORT_AGENT_DATA_SUCCESS",
      data: data.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: "REPORT_CASE_REPORT_AGENT_DATA_FAILED",
      message: "Failed to get Data by Agent name !!",
    });
  }
}

function* caseRepCount(action) {
  try {
    const data = yield bearerRequest(
      "POST",
      `https://agentapi.stage.insurancesamadhan.com/case/caseCount`,
      action.state
    );

    yield put({
      type: "REPORT_CASE_REPORT_COUNT_DATA_SUCCESS",
      data: data.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: "REPORT_CASE_REPORT_COUNT_DATA_FAILED",
      message: "Failed to get Data by Agent name !!",
    });
  }
}

function* leadRepCountFun(action) {
  try {
    const data = yield bearerRequest(
      "POST",
      `https://api.stage.insurancesamadhan.com/lead/leadCount`,
      action.state
    );

    yield put({ type: "LEAD_REPORT_COUNT_DATA_SUCCESS", data: data.data });
  } catch (error) {
    console.log(error);
    yield put({
      type: "LEAD_REPORT_COUNT_DATA_FAILED",
      message: "Failed to get Data by Agent name !!",
    });
  }
}

function* todayLeadCount(action) {
  try {
    const data = yield bearerRequest(
      "GET",
      `https://api.stage.insurancesamadhan.com/lead/followLeadCount/${action.user_id}`
    );

    yield put({ type: "TODAY_LEAD_COUNT_DATA_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "TODAY_LEAD_COUNT_DATA_FAILED",
      message: "Failed to get Data by Agent name !!",
    });
  }
}

function* getLeadRepData(action) {
  try {
    const data = yield bearerRequest(
      "POST",
      `https://api.stage.insurancesamadhan.com/lead/leadStatus`,
      action.state
    );

    yield put({ type: "LEAD_REPORT_DATA_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "LEAD_REPORT_DATA_FAILED",
      message: "Failed to get Lead Data  !!",
    });
  }
}

function* payRepData(action) {
  try {
    const data = yield bearerRequest(
      "POST",
      `https://api.stage.insurancesamadhan.com/insurance/dateWise`,
      action.state
    );

    yield put({ type: "PAYMENT_REPORT_DATA_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "PAYMENT_REPORT_DATA_FAILED",
      message: "Failed to get Lead Data  !!",
    });
  }
}

function* payRepStatusData(action) {
  try {
    const data = yield bearerRequest(
      "POST",
      `https://api.stage.insurancesamadhan.com/insurance/statusWise`,
      action.state
    );

    yield put({ type: "PAYMENT_REPORT_STATUS_DATA_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "PAYMENT_REPORT_STATUS_DATA_FAILED",
      message: "Failed to get Lead Data  !!",
    });
  }
}

function* monthlyRepData(action) {
  try {
    const data = yield bearerRequest(
      "POST",
      `https://api.stage.insurancesamadhan.com/insurance/dateWise`,
      action.state
    );

    yield put({ type: "MONTHLY_REPORT_DATA_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "MONTHLY_REPORT_DATA_FAILED",
      message: "Failed to get Lead Data  !!",
    });
  }
}

function* complaintMonRep(action) {
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/insurance/dateAndStatusWise`,
      action.state
    );

    yield put({ type: "COMPLAINT_MONTHLY_REPORT_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "COMPLAINT_MONTHLY_REPORT_FAILED",
      message: "Failed to get Lead Data  !!",
    });
  }
}

function* getAgentCases(action) {
  try {
    const data = yield request(
      "POST",
      `https://agentapi.stage.insurancesamadhan.com/case/dateAndStatusWiseWise`,
      action.state
    );

    yield put({ type: "AGENT_CASES_MONTHLY_REPORT_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "AGENT_CASES_MONTHLY_REPORT_FAILED",
      message: "Failed to get Lead Data  !!",
    });
  }
}

function* getAgentCasesContract(action) {
  try {
    const data = yield request(
      "POST",
      `https://agentapi.stage.insurancesamadhan.com/case/dateAndContractWise`,
      action.state
    );

    yield put({
      type: "AGENT_CASES_CONTRACT_MONTHLY_REPORT_SUCCESS",
      data: data.data,
    });
  } catch (error) {
    yield put({
      type: "AGENT_CASES_CONTRACT_MONTHLY_REPORT_FAILED",
      message: "Failed to get Lead Data  !!",
    });
  }
}

function* getCompData(action) {
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/insurance/companyAndTypeReport`,
      action.state
    );

    yield put({ type: "COMPLAINT_REPORT_DATA_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "COMPLAINT_REPORT_DATA_FAILED",
      message: "Failed to get Lead Data  !!",
    });
  }
}

function* getOmbData(action) {
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/insurance/ombOpsTypeReport`,
      action.state
    );

    yield put({ type: "OMBUDSMAN_EXECUTIVE_REPORT_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "OMBUDSMAN_EXECUTIVE_REPORT_FAILED",
      message: "Failed to get Lead Data  !!",
    });
  }
}

function* getRegLead(action) {
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/lead/registeredLead`,
      action.state
    );

    yield put({ type: "REGISTERED_LEAD_REPORT_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "REGISTERED_LEAD_REPORT_FAILED",
      message: "Failed to get Lead Data  !!",
    });
  }
}

function* monthlyB2CFunc(action){
    try {
        const data = yield request(
          "POST",
          `https://api.stage.insurancesamadhan.com/insurance/resolvedCaseReport`,
          action.state
        );
    
        yield put({ type: "MONTHLY_RESOLVED_B2C_SUCCESS", data: data.data });
      } catch (error) {
        yield put({
          type: "MONTHLY_RESOLVED_B2C_FAILED",
          message: "Failed to get Lead Data  !!",
        });
      }
}

function* ombRejectCases(action){
    try {
        const data = yield request(
          "POST",
          `https://api.stage.insurancesamadhan.com/insurance/omdRejectedCases`,
          action.state
        );
    
        yield put({ type: "OMB_REJECT_CASES_SUCCESS", data: data.data });
      } catch (error) {
        yield put({
          type: "OMB_REJECT_CASES_FAILED",
          message: "Failed to get Lead Data  !!",
        });
      }
}

function* tatDataFunc(action){
    try {
        const data = yield request(
          "POST",
          `https://api.stage.insurancesamadhan.com/insurance/omdTatStatusCases`,
          action.state
        );
    
        yield put({ type: "TAT_REPORT_DATA_SUCCESS", data: data.data });
      } catch (error) {
        yield put({
          type: "TAT_REPORT_DATA_FAILED",
          message: "Failed to get TAT Data  !!",
        });
      }
}

function* getBotData(action){
    try {
        const data = yield request(
          "POST",
          `https://api.stage.insurancesamadhan.com/botFollowUp/botFollowUpCases`,
          action.state
        );
    
        yield put({ type: "BOT_REPORT_DATA_SUCCESS", data: data.data });
      } catch (error) {
        yield put({
          type: "BOT_REPORT_DATA_FAILED",
          message: "Failed to get TAT Data  !!",
        });
      }
}

export default function* report() {
  yield takeEvery("REPORT_GET_ACTIVE_STATUS", getActiveStatus);
  yield takeEvery("REPORT_GET_USER_AGENT_DATA", getUserAgentData);
  yield takeEvery("REPORT_GET_ALL_USER_LIST", getAllUserList);
  yield takeEvery("REPORT_GET_INSURANCE_TYPE", getPolicyTypes);
  yield takeEvery("REPORT_GET_INSURANCE_COMPANIES", getInsuComs);
  yield takeEvery("REPORT_GET_COMPLAINT_TYPE", getComTypes);
  yield takeEvery("REPORT_UPLOAD_DOC", uploadDoc);
  yield takeEvery("REPORT_UPLOAD_TO_SERVER", uploadDocServer);
  yield takeEvery("REPORT_RESOLVED_CASES", resolvedCases);
  yield takeEvery("REPORT_CASE_REPORT_DATA", caseRepFunc);
  yield takeEvery("REPORT_CASE_REPORT_STATUS_DATA", caseRepByStatus);
  yield takeEvery("REPORT_CASE_REPORT_AGENT_DATA", caseRepByAgent);
  yield takeEvery("REPORT_CASE_REPORT_COUNT_DATA", caseRepCount);
  yield takeEvery("LEAD_REPORT_COUNT_DATA", leadRepCountFun);
  yield takeEvery("TODAY_LEAD_COUNT_DATA", todayLeadCount);
  yield takeEvery("LEAD_REPORT_DATA", getLeadRepData);
  yield takeEvery("PAYMENT_REPORT_DATA", payRepData);
  yield takeEvery("PAYMENT_REPORT_STATUS_DATA", payRepStatusData);
  yield takeEvery("MONTHLY_REPORT_DATA", monthlyRepData);
  yield takeEvery("COMPLAINT_MONTHLY_REPORT", complaintMonRep);
  yield takeEvery("AGENT_CASES_MONTHLY_REPORT", getAgentCases);
  yield takeEvery("AGENT_CASES_CONTRACT_MONTHLY_REPORT", getAgentCasesContract);
  yield takeEvery("COMPLAINT_REPORT_DATA", getCompData);
  yield takeEvery("OMBUDSMAN_EXECUTIVE_REPORT", getOmbData);
  yield takeEvery("REPORT_RESOLVED_PAYMENT_CASES", resolvedPayCases);
  yield takeEvery("REGISTERED_LEAD_REPORT", getRegLead);
  yield takeEvery("MONTHLY_RESOLVED_B2C", monthlyB2CFunc)
  yield takeEvery("OMB_REJECT_CASES", ombRejectCases)
  yield takeEvery("TAT_REPORT_DATA", tatDataFunc)
  yield takeEvery("BOT_REPORT_DATA", getBotData)
}
