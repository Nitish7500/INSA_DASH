import { put, take, takeEvery } from "redux-saga/effects";
import { knowlarityPostApi, request } from "services/requests.services";

function* getWaiveOffUsers(action){

    try {
        const data = yield request(
          "GET",
          `https://api.stage.insurancesamadhan.com/insurance/getWaiveOffUsers/${action.state.id}`,
        );
        yield put({ type: "COMPLAINT_GET_WAIVEOFF_SUCCESS", data: data.data });
      } catch (error) {
        console.log(error)
        yield put({
          type: "COMPLAINT_GET_WAIVEOFF_FAILED",
          message: "Failed to get Data !",
        });
      }
}

function* feeOperation(action){
    try {
        const data = yield request(
          "POST",
          `https://api.stage.insurancesamadhan.com/insurance/feeOperation`,
          {...action.state}
        );
        yield put({ type: "COMPLAINT_FEE_OPERATION_SUCCESS", message: data.message });
      } catch (error) {
        console.log(error)
        yield put({
          type: "COMPLAINT_FEE_OPERATION_FAILED",
          message: "Failed to get Data !",
        });
      }
}

function* addSecondPayAmt(action){
    try {
        const data = yield request(
          "POST",
          `https://api.stage.insurancesamadhan.com/insurance/addFinalAmount`,
          {...action.state}
        );
        yield put({ type: "COMPLAINT_SECOND_ADD_FINAL_AMOUNT_SUCCESS", message: data.message });
      } catch (error) {
        console.log(error)
        yield put({
          type: "COMPLAINT_SECOND_ADD_FINAL_AMOUNT_FAILED",
          message: "Failed to get Data !",
        });
      }
}

function* finalPaymentFunc(action){
    try {
        const data = yield request(
          "POST",
          `https://api.stage.insurancesamadhan.com/insurance/finalFeeOperation`,
          {...action.state}
        );
        yield put({ type: "COMPLAINT_FINAL_PAYMENT_SUCCESS", message: data.message });
      } catch (error) {
        console.log(error)
        yield put({
          type: "COMPLAINT_FINAL_PAYMENT_FAILED",
          message: "Failed to get Data !",
        });
      }
}

function* claimOperation(action){
    try {
        const data = yield request(
          "POST",
          `https://api.stage.insurancesamadhan.com/insurance/claimOperation`,
          {...action.state}
        );
        yield put({ type: "COMPLAINT_CLAIM_OPERATION_SUCCESS", message: data.message });
      } catch (error) {
        console.log(error)
        yield put({
          type: "COMPLAINT_CLAIM_OPERATION_FAILED",
          message: "Failed to get Data !",
        });
      }
}

function* getCallLog(action){
    try {
        const data = yield knowlarityPostApi(
          "GET",
          `account/calllog?start_time=${action.state?.start_date}&end_time=${action.state.end_date}&customer_number=${action.state.customer_number}`,
        );
        yield put({ type: "COMPLAINT_CALL_LOG_SUCCESS", data: data.data?.objects });
      } catch (error) {
        console.log(error)
        yield put({
          type: "COMPLAINT_CALL_LOG_FAILED",
          message: "Failed to get Data !",
        });
      }
}

function* addComment(action){
    try {
        const data = yield request(
          "POST",
          `https://api.stage.insurancesamadhan.com/insurance/addComm`,
          action.state
        );
        yield put({ type: "COMPLAINT_ADD_COMMENT_SUCCESS", message: data.message });
      } catch (error) {
        console.log(error)
        yield put({
          type: "COMPLAINT_ADD_COMMENT_FAILED",
          message: "Failed to add Comment !",
        });
      }
}

function* updateComment(action){
    try {
        const data = yield request(
          "POST",
          `https://api.stage.insurancesamadhan.com/insurance/updateCommunication`,
          {...action.state}
        );
        yield put({ type: "COMPLAINT_ADD_COMMENT_SUCCESS", message: data.message });
      } catch (error) {
        console.log(error)
        yield put({
          type: "COMPLAINT_ADD_COMMENT_FAILED",
          message: "Failed to add Comment !",
        });
      }
}

function* getComments(action){
    try {
        const data = yield request(
          "GET",
          `https://api.stage.insurancesamadhan.com/insurance/${action.state.id}`,
        );
        yield put({ type: "COMPLAINT_GET_COMMENTS_SUCCESS", data: data.data });
      } catch (error) {
        console.log(error)
        yield put({
          type: "COMPLAINT_GET_COMMENTS_FAILED",
          message: "Failed to add Comment !",
        });
      }
}

export default function* complaint(){
    yield takeEvery("COMPLAINT_GET_WAIVEOFF", getWaiveOffUsers)
    yield takeEvery("COMPLAINT_FEE_OPERATION",feeOperation)
    yield takeEvery("COMPLAINT_SECOND_ADD_FINAL_AMOUNT", addSecondPayAmt)
    yield takeEvery("COMPLAINT_FINAL_PAYMENT", finalPaymentFunc)
    yield takeEvery("COMPLAINT_CLAIM_OPERATION", claimOperation)
    yield takeEvery("COMPLAINT_CALL_LOG",getCallLog)
    yield takeEvery("COMPLAINT_ADD_COMMENT",addComment)
    yield takeEvery("COMPLAINT_UPDATE_COMMENT",updateComment)
    yield takeEvery("COMPLAINT_GET_COMMENTS", getComments)
}