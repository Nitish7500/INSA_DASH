import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  fork,
} from "redux-saga/effects";
import { bearerRequest, request } from "services/requests.services";

function* getUserList(action) {
  try {
    const data = yield request(
      "GET",
      `https://api.stage.insurancesamadhan.com/user?pageIndex=${action.state.pageIndex}&pageSize=${action.state.pageSize}`
    );
    yield put({ type: "CUSTOMER_GET_USER_LIST_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "CUSTOMER_GET_USER_LIST_FAILED",
      message: "Failed to fetch !",
    });
  }
}

function* getFilterUserList(action) {
  try {
    console.log(action);
    const data = yield request(
      "GET",
      `https://api.stage.insurancesamadhan.com/user?pageIndex=${
        action.state.pageIndex
      }&pageSize=${action.state.pageSize}${
        action.state.keyword ? `&keyword=${action.state?.keyword}` : ""
      }${
        action.state?.selectedSortOrder
          ? `&selectedSortOrder=${action.state?.selectedSortOrder}`
          : ""
      }`
    );
    yield put({ type: "CUSTOMER_FILTER_DATA_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "CUSTOMER_FILTER_DATA_FAILED",
      message: "Failed to fetch !",
    });
  }
}

function* viewPassword(action) {
  try {
    const data = yield request(
      "GET",
      `https://api.stage.insurancesamadhan.com/user/getPwd/${action.state.id}`
    );
    yield put({ type: "CUSTOMER_VIEW_PASSWORD_SUCCESS", data: data.data });
  } catch (error) {
    yield put({
      type: "CUSTOMER_VIEW_PASSWORD_FAILED",
      message: "Failed to fetch !",
    });
  }
}

function* updateServiceRate(action) {
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/user/updateServiceRate`,
      { ...action.state }
    );
    yield put({
      type: "CUSTOMER_UPDATE_SERVICE_RATE_SUCCESS",
      data: data.message,
    });
  } catch (error) {
    yield put({
      type: "CUSTOMER_UPDATE_SERVICE_RATE_FAILED",
      message: "Failed to fetch !",
    });
  }
}

function* viewGmail(action) {
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/gmail/check-read-email-permission`,
      { ...action.state }
    );
    console.log(data);
    yield put({
      type: "CUSTOMER_GMAIL_READ_SUCCESS",
      message: data.message,
    });
  } catch (error) {
    yield put({
      type: "CUSTOMER_GMAIL_READ_FAILED",
      message: "Failed to fetch !",
    });
  }
}

function* issuedDoc(action) {
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/digilocker/admin-user-documents-list`,
      { ...action.state }
    );
    yield put({
      type: "CUSTOMER_ADMIN_ISSUED_DOC_SUCCESS",
      message: data.data,
    });
  } catch (error) {
    yield put({
      type: "CUSTOMER_ADMIN_ISSUED_DOC_FAILED",
      message: "Failed to fetch !",
    });
  }
}

function* selfDoc(action) {
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/digilocker/admin-user-documents-list`,
      { ...action.state }
    );
    yield put({
      type: "CUSTOMER_ADMIN_SELF_DOC_SUCCESS",
      message: data.data,
    });
  } catch (error) {
    yield put({
      type: "CUSTOMER_ADMIN_SELF_DOC_FAILED",
      message: "Failed to fetch !",
    });
  }
}

function* userDoc(action) {
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/digilocker/admin-user-documents`,
      { ...action.state }
    );
    yield put({
      type: "CUSTOMER_USER_DOC_LIST_SUCCESS",
      message: data.data,
    });
  } catch (error) {
    yield put({
      type: "CUSTOMER_USER_DOC_LIST_FAILED",
      message: "Failed to fetch !",
    });
  }
}

export default function* customer() {
  yield takeEvery("CUSTOMER_GET_USER_LIST", getUserList);
  yield takeEvery("CUSTOMER_FILTER_DATA", getFilterUserList);
  yield takeEvery("CUSTOMER_VIEW_PASSWORD", viewPassword);
  yield takeEvery("CUSTOMER_UPDATE_SERVICE_RATE", updateServiceRate);
  yield takeEvery("CUSTOMER_GMAIL_READ", viewGmail);
  yield takeEvery("CUSTOMER_ADMIN_ISSUED_DOC", issuedDoc);
  yield takeEvery("CUSTOMER_ADMIN_SELF_DOC", selfDoc);
  yield takeEvery("CUSTOMER_USER_DOC_LIST", userDoc);
}
