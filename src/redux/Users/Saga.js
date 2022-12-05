import { KNOWLARITY_CONFIGS } from "helpers/Utils";
import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  fork,
} from "redux-saga/effects";
import {
  bearerRequest,
  knowlarityPostApi,
  request,
} from "services/requests.services";

function* getUserData(action) {
  try {
    const data = yield bearerRequest(
      "GET",
      `https://agentapi.stage.insurancesamadhan.com/users?page=${action.state.page}`
    );
    yield put({ type: "USERS_GET_LIST_SUCCESS", data: data });
  } catch (error) {
    yield put({
      type: "USERS_GET_LIST_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getStatusBucket(action) {
  try {
    const data = yield request(
      "GET",
      `https://api.stage.insurancesamadhan.com/insurance/getStatusBuckets`
    );
    yield put({ type: "USER_GET_STATUS_BUCKET_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "USER_GET_STATUS_BUCKET_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getAssignUser(action) {
  try {
    const data = yield bearerRequest(
      "GET",
      `https://agentapi.stage.insurancesamadhan.com/assignUser`
    );
    yield put({ type: "USER_GET_ASSIGN_USER_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "USER_GET_ASSIGN_USER_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getAssignExecutive(action) {
  try {
    const data = yield bearerRequest(
      "GET",
      `https://agentapi.stage.insurancesamadhan.com/assignLegalExecutive`
    );
    yield put({ type: "GET_ASSIGN_LEGAL_EXECUTIVE_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "GET_ASSIGN_LEGAL_EXECUTIVE_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getAssignSubExecutive(action){
    try {
        const data = yield bearerRequest(
          "GET",
          `https://agentapi.stage.insurancesamadhan.com/getLegalSubExecutive`
        );
        yield put({ type: "USER_GET_LEGAL_SUBEXECUTIVE_SUCCESS", data: data.data });
      } catch (error) {
        yield put({
          type: "USER_GET_LEGAL_SUBEXECUTIVE_FAILED",
          message: "Failed to get data !",
        });
      }
    
}


function* updateUser(action){

    try {
        const data = yield bearerRequest(
          "POST",
          `https://agentapi.stage.insurancesamadhan.com/updatedStatus`,
          {...action.state}
        );
        yield put({ type: "USER_UPDATE_USER_SUCCESS", data: data.message });
      } catch (error) {
        yield put({
          type: "USER_UPDATE_USER_FAILED",
          message: "Failed to get data !",
        });
      }

}

function* addUser(action){
  try {
    const data = yield bearerRequest(
      "POST",
      `https://agentapi.stage.insurancesamadhan.com/addUser`,
      {...action.state}
    );
    yield put({ type: "USER_ADD_USER_SUCCESS", data: data.message });
  } catch (error) {
    yield put({
      type: "USER_ADD_USER_FAILED",
      message: "Failed to get data !",
    });
  }

}

function* updatePassword(action){
  try {
    const data = yield bearerRequest(
      "POST",
      `https://agentapi.stage.insurancesamadhan.com/updatedPassword`,
      {...action.state}
    );
    yield put({ type: "USER_UPDATE_PASSWORD_SUCCESS", data: data.message });
  } catch (error) {
    yield put({
      type: "USER_UPDATE_PASSWORD_FAILED",
      message: "Failed to Update !",
    });
  }
}

export default function* userSaga() {
  yield takeEvery("USERS_GET_LIST", getUserData);
  yield takeEvery("USER_GET_STATUS_BUCKET", getStatusBucket);
  yield takeEvery("USER_GET_ASSIGN_USER", getAssignUser);
  yield takeEvery("GET_ASSIGN_LEGAL_EXECUTIVE", getAssignExecutive);
  yield takeEvery("USER_GET_LEGAL_SUBEXECUTIVE", getAssignSubExecutive)
  yield takeEvery("USER_UPDATE_USER", updateUser)
  yield takeEvery("USER_ADD_USER", addUser)
  yield takeEvery("USER_UPDATE_PASSWORD",updatePassword)
}