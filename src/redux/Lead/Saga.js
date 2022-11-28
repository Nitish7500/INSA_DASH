import moment from "moment";
import { put, take, takeEvery } from "redux-saga/effects";
import { bearerRequest, request } from "services/requests.services";

function* getAssignUsers(action) {
  try {
    const data = yield bearerRequest(
      "GET",
      "https://agentapi.stage.insurancesamadhan.com/assignUser"
    );

    yield put({ type: "LEAD_ASSIGN_USER_SUCCESS", data: data.data });
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

    yield put({ type: "LEAD_ASSIGN_EXPERT_SUCCESS", data: data.data });
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

    yield put({ type: "LEAD_INSURANCE_COMPANY_SUCCESS", data: data.data });
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

    yield put({ type: "LEAD_DATA_WITH_STATUS_SUCCESS", data: data.data });
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

    yield put({ type: "LEAD_USERS_SUCCESS", data: data });
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

    yield put({ type: "SEARCH_BY_MAIL_AND_PHONE_SUCCESS", data: data });
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

    yield put({ type: "LEAD_DOWNLOAD_REPORT_SUCCESS", data: data });
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

    yield put({ type: "LEAD_GET_MISSELLING_SUCCESS", data: data });
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

    yield put({ type: "LEAD_ASSIGN_USER_SAVE_SUCCESS" });
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

    yield put({ type: "LEAD_ASSIGN_EXPERT_SAVE_SUCCESS" });
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

    yield put({ type: "LEAD_ACCEPT_LEAD_SUCCESS" });
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

    yield put({ type: "LEAD_REJECT_LEAD_SUCCESS" });
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
    
    yield getLeadDataById({state:{id:action.state?.lead_id}})

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
      data:data.data[0]
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: "LEAD_FETCH_BY_ID_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* leadAddComment(action){
    console.log(action)
    try {
        const { id } = action.state;
        const data = yield request(
          "POST",
          `https://api.stage.insurancesamadhan.com/lead/addComm`,
          [{
            com_by:action.state?.com_by,
            com_dis:action.state?.com_dis,
            id:action.state?.id,
            userType: action.state?.userType
          }]
        );
    
        yield put({
          type: "LEAD_COMM_HISTORY_ADD_COMMENT_SUCCESS",
          message:"Comment Added Successfully !"
        });

        yield getLeadDataById({state:{id:action.state?.id}})


      } catch (error) {
        console.log(error);
        yield put({
          type: "LEAD_COMM_HISTORY_ADD_COMMENT_FAILED",
          message: "Failed to get data !",
        });
      }}

function* getLeadFiltrationData(action){
    try {
        const data = yield request(
          "POST",
          `https://api.stage.insurancesamadhan.com/filtration/hi/get`,
          {...action.state}
        );
    
        yield put({ type: "LEAD_FILTRATION_DATA_SUCCESS", data: data.data });
      } catch (error) {
        console.log(error);
        yield put({
          type: "LEAD_FILTRATION_DATA_FAILED",
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
  yield takeEvery("LEAD_COMM_HISTORY_ADD_COMMENT",leadAddComment )
  yield takeEvery("LEAD_FILTRATION_DATA", getLeadFiltrationData)
}
