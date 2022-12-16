import moment from "moment";
import { put, take, takeEvery } from "redux-saga/effects";
import {
  bearerRequest,
  knowlarityPostApi,
  request,
} from "services/requests.services";

function* getAssignUsers(action) {
  try {
    const data = yield bearerRequest(
      "GET",
      "https://agentapi.stage.insurancesamadhan.com/assignUser"
    );

    yield put({ type: "LEAD_ASSIGN_USER_SUCCESS", data: data.data, message:data.message });
  } catch (error) {
    yield put({
      type: "LEAD_ASSIGN_USER_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getAssignExperts(action) {
  try {
    const data = yield bearerRequest(
      "GET",
      "https://agentapi.stage.insurancesamadhan.com/assignExpert"
    );

    yield put({ type: "LEAD_ASSIGN_EXPERT_SUCCESS", data: data.data, message:data.message });
  } catch (error) {
    yield put({
      type: "LEAD_ASSIGN_EXPERT_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getInsuranceCompany(action) {
  try {
    const data = yield bearerRequest(
      "GET",
      "https://api.stage.insurancesamadhan.com/insurance_company"
    );

    yield put({ type: "LEAD_INSURANCE_COMPANY_SUCCESS", data: data.data, message:data.message });
  } catch (error) {
    yield put({
      type: "LEAD_INSURANCE_COMPANY_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getLeadDataByStatus(action) {
  try {
    const {
      status = "PENDING",
      pageIndex = 0,
      pageSize = 50,
      keyword = "",
      selectedSortOrder,
    } = action.state;

    const data = yield request(
      "GET",
      `https://api.stage.insurancesamadhan.com/lead/?status=${status}&pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}${
        selectedSortOrder ? `&selectedSortOrder=${selectedSortOrder}` : ""
      }`
    );

    yield put({ type: "LEAD_DATA_WITH_STATUS_SUCCESS", data: data.data, message:"All Data List !!" });
  } catch (error) {
    yield put({
      type: "LEAD_DATA_WITH_STATUS_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getLeadUsers(action) {
  try {
    const data = yield bearerRequest(
      "GET",
      "https://agentapi.stage.insurancesamadhan.com/users"
    );

    yield put({ type: "LEAD_USERS_SUCCESS", data: data, message:data.message });
  } catch (error) {
    yield put({
      type: "LEAD_USERS_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getLeadDataByEmailPhone(action) {
  try {
    const data = yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/lead/searchByID",
      { ...action.state }
    );

    yield put({ type: "SEARCH_BY_MAIL_AND_PHONE_SUCCESS", data: data, message:data.message });
  } catch (error) {
    yield put({
      type: "SEARCH_BY_MAIL_AND_PHONE_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* downloadLeadReport(action) {
  try {
    let from = moment(action.fromDate).valueOf();
    let to = moment(action.tillDate).valueOf();
    const data = yield request(
      "GET",
      `https://api.stage.insurancesamadhan.com/analytics/csv/lead?fromDate=${from}&tillDate=${to}`
    );

    yield put({ type: "LEAD_DOWNLOAD_REPORT_SUCCESS", data: data, message:data.message });
  } catch (error) {
    console.log(error);
    yield put({
      type: "LEAD_DOWNLOAD_REPORT_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getMisselingUser(action) {
  try {
    const data = yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/filtration/misselling/get",
      { ...action.state }
    );

    yield put({ type: "LEAD_GET_MISSELLING_SUCCESS", data: data, message:data.message });
  } catch (error) {
    yield put({
      type: "LEAD_GET_MISSELLING_FAILED",
      message: "Failed to get data !",
    });
  }
}
function* saveAssignToUser(action) {
  try {
    console.log(action);
    const data = yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/lead/assign",
      { ...action.state }
    );

    yield put({ type: "LEAD_ASSIGN_USER_SAVE_SUCCESS" , message:data.message});
  } catch (error) {
    yield put({
      type: "LEAD_ASSIGN_USER_SAVE_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* saveAssignToExpert(action) {
  try {
    const data = yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/lead/assignExpert",
      { ...action.state }
    );

    yield put({ type: "LEAD_ASSIGN_EXPERT_SAVE_SUCCESS", message:data.message });
  } catch (error) {
    console.log(error);
    yield put({
      type: "LEAD_ASSIGN_EXPERT_SAVE_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* acceptLead(action) {
  try {
    const { _id } = action.state;
    const data = yield request(
      "PUT",
      `https://api.stage.insurancesamadhan.com/lead/${_id}`,
      { ...action.state }
    );

    yield put({ type: "LEAD_ACCEPT_LEAD_SUCCESS" , message:data.message});
  } catch (error) {
    console.log(error);
    yield put({
      type: "LEAD_ACCEPT_LEAD_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* rejectLead(action) {
  try {
    console.log(action);
    const { _id } = action.state;
    const data = yield request(
      "PUT",
      `https://api.stage.insurancesamadhan.com/lead/${_id}`,
      { ...action.state }
    );

    yield put({ type: "LEAD_REJECT_LEAD_SUCCESS", message:data.message });
  } catch (error) {
    console.log(error);
    yield put({
      type: "LEAD_REJECT_LEAD_FAILED",
      message: "Failed to get data !",
    });
  }
}
function* updateLeadComment(action) {
  try {
    console.log(action);
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/lead/updateCommunication`,
      { ...action.state }
    );

    yield put({
      type: "LEAD_COMM_HISTORY_UPDATE_COMMENT_SUCCESS",
      message: "Comment Updated !",
    });

    yield getLeadDataById({ state: { id: action.state?.lead_id } });
  } catch (error) {
    console.log(error);
    yield put({
      type: "LEAD_COMM_HISTORY_UPDATE_COMMENT_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getLeadDataById(action) {
  try {
    const { id } = action.state;
    const data = yield request(
      "GET",
      `https://api.stage.insurancesamadhan.com/lead/${id}`
    );

    yield put({
      type: "LEAD_FETCH_BY_ID_SUCCESS",
      data: data.data[0],
      message:data.message
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: "LEAD_FETCH_BY_ID_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* leadAddComment(action) {
  console.log(action);
  try {
    const { id } = action.state;
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/lead/addComm`,
      [
        {
          com_by: action.state?.com_by,
          com_dis: action.state?.com_dis,
          id: action.state?.id,
          userType: action.state?.userType,
        },
      ]
    );

    yield put({
      type: "LEAD_COMM_HISTORY_ADD_COMMENT_SUCCESS",
      message: "Comment Added Successfully !",
    });

    yield getLeadDataById({ state: { id: action.state?.id } });
  } catch (error) {
    console.log(error);
    yield put({
      type: "LEAD_COMM_HISTORY_ADD_COMMENT_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getLeadFiltrationData(action) {
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/filtration/hi/get`,
      { ...action.state }
    );

    yield put({ type: "LEAD_FILTRATION_DATA_SUCCESS", data: data.data, message:data.message });
  } catch (error) {
    console.log(error);
    yield put({
      type: "LEAD_FILTRATION_DATA_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getCallLogsCustomer(action) {
  try {
    const { startTime, endTime, customer_number } = action.state;

    const data = yield knowlarityPostApi(
      "GET",
      `account/calllog?start_time=${startTime}&end_time=${endTime}&customer_number=${customer_number}`
    );

    yield put({ type: "CALL_LOGS_FOR_CUSTOMER_SUCCESS", data: data.data, message:data.message });
  } catch (error) {
    console.log(error);
    yield put({
      type: "CALL_LOGS_FOR_CUSTOMER_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* sendMessageToUser(action) {
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/lead/sendSmsData`,
      { ...action.state }
    );

    yield put({ type: "LEAD_SEND_MESSAGE_TO_USER_SUCCESS", data: data.data, message:data.message });
  } catch (error) {
    console.log(error);
    yield put({
      type: "LEAD_SEND_MESSAGE_TO_USER_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* cancelLead(action) {
  try {
    const data = yield request(
      "PUT",
      `https://api.stage.insurancesamadhan.com/lead/${action.state?.data?._id}`,
      { ...action.state.data }
    );

    yield put({ type: "LEAD_CANCEL_LEAD_SUCCESS", data: data.data, message:data.message });
  } catch (error) {
    console.log(error);
    yield put({
      type: "LEAD_CANCEL_LEAD_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getPolicyType(action) {
  try {
    const data = yield request(
      "GET",
      `https://api.stage.insurancesamadhan.com/policy_type`
    );

    yield put({ type: "LEAD_GET_POLICY_TYPE_SUCCESS", data: data.data, message:data.message });
  } catch (error) {
    console.log(error);
    yield put({
      type: "LEAD_GET_POLICY_TYPE_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getComplaintType(action) {
  try {
    const data = yield request(
      "GET",
      `https://api.stage.insurancesamadhan.com/complaint_type/?policyTypeId=${action.state.policyType}`
    );

    yield put({
      type: "LEAD_GET_POLICY_TYPE_COMPLAINT_TYPE_SUCCESS",
      data: data.data,
      message:data.message
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: "LEAD_GET_POLICY_TYPE_COMPLAINT_TYPE_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* updateLead(action) {
  console.log(action);
  try {
    const data = yield request(
      "PUT",
      `https://api.stage.insurancesamadhan.com/lead/${action.state?._id}`,
      { ...action.state }
    );
    yield put({ type: "Lead_UPDATE_LEAD_SUCCESS", data: data.data, message:data.message });
  } catch (error) {
    console.log(error);
    yield put({
      type: "Lead_UPDATE_LEAD_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* addFollowUp(action) {

  try {
    let followUpObj = action.state;
    console.log(
      followUpObj.follow_date && followUpObj.com_date && followUpObj.id
    );

    if (followUpObj.follow_date && followUpObj.com_date && followUpObj.id) {
      const data = yield request(
        "PUT",
        `https://api.stage.insurancesamadhan.com/lead/update/${action.state?.id}`,
        {
          communication: [
            {
              id: followUpObj.id,
              com_date: followUpObj.com_date,
              com_dis:
                followUpObj.followUpDesc && followUpObj.com_dis == "Other"
                  ? followUpObj.followUpDesc
                  : followUpObj.com_dis,
              com_by: followUpObj.com_by,
            },
          ],
          follow_date: followUpObj.follow_date,
          id: followUpObj.id,
          status: followUpObj.status,
        }
      );
      yield put({ type: "Lead_UPDATE_LEAD_SUCCESS", data: data.data, message:data.message });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: "Lead_UPDATE_LEAD_FAILED",
      message: "Failed to get data !",
    });
  }
}

export default function* leadSaga() {
  yield takeEvery("LEAD_ASSIGN_USER", getAssignUsers);
  yield takeEvery("LEAD_ASSIGN_EXPERT", getAssignExperts);
  yield takeEvery("LEAD_INSURANCE_COMPANY", getInsuranceCompany);
  yield takeEvery("LEAD_DATA_WITH_STATUS", getLeadDataByStatus);
  yield takeEvery("LEAD_USERS", getLeadUsers);
  yield takeEvery("SEARCH_BY_MAIL_AND_PHONE", getLeadDataByEmailPhone);
  yield takeEvery("LEAD_DOWNLOAD_REPORT", downloadLeadReport);
  yield takeEvery("LEAD_GET_MISSELLING", getMisselingUser);
  yield takeEvery("LEAD_ASSIGN_USER_SAVE", saveAssignToUser);
  yield takeEvery("LEAD_ASSIGN_EXPERT_SAVE", saveAssignToExpert);
  yield takeEvery("LEAD_ACCEPT_LEAD", acceptLead);
  yield takeEvery("LEAD_REJECT_LEAD", rejectLead);
  yield takeEvery("LEAD_COMM_HISTORY_UPDATE_COMMENT", updateLeadComment);
  yield takeEvery("LEAD_FETCH_BY_ID", getLeadDataById);
  yield takeEvery("LEAD_COMM_HISTORY_ADD_COMMENT", leadAddComment);
  yield takeEvery("LEAD_FILTRATION_DATA", getLeadFiltrationData);
  yield takeEvery("CALL_LOGS_FOR_CUSTOMER", getCallLogsCustomer);
  yield takeEvery("LEAD_SEND_MESSAGE_TO_USER", sendMessageToUser);
  yield takeEvery("LEAD_CANCEL_LEAD", cancelLead);
  yield takeEvery("LEAD_GET_POLICY_TYPE", getPolicyType);
  yield takeEvery("LEAD_GET_POLICY_TYPE_COMPLAINT_TYPE", getComplaintType);
  yield takeEvery("Lead_UPDATE_LEAD", updateLead);
  yield takeEvery("LEAD_ADD_FOLLOW_UP", addFollowUp);
}
