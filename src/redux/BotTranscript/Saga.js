import { KNOWLARITY_CONFIGS } from "helpers/Utils";
import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  fork,
} from "redux-saga/effects";
import { knowlarityPostApi, request } from "services/requests.services";

function* getBotTranscriptData(action) {
  try {
    const data = yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/botFlow/getBotTranscriptData",
      {
        ...action.state,
      }
    );
    yield put({ type: "GET_TRANSCRIPT_DATA_SUCCESS", data: data.data, loading:false, message:data.msg });
  } catch (error) {
    yield put({
      type: "GET_TRANSCRIPT_DATA_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getBotTranscriptComm(action) {
  try {
    const data = yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/botFlow/getBotTranscriptCommunication",
      {
        ...action.state,
      }
    );
    yield put({
      type: "BOT_TRANSCRIPT_COMMUNICATION_SUCCESS",
      data: data.data,
      message:data.msg
    });
  } catch (error) {
    yield put({
      type: "BOT_TRANSCRIPT_COMMUNICATION_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* getComments(action) {
  try {
    const data = yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/botFlow/addCommentToBotTranscript",
      {
        ...action.state,
      }
    );
    yield put({ type: "BOT_TRANSCRIPT_ADD_COMMENT_SUCCESS", data: data.data, message:data.msg });
  } catch (error) {
    yield put({
      type: "BOT_TRANSCRIPT_ADD_COMMENT_FAILED",
      message: "Failed to get data !",
    });
  }
}

function* makeCall(action){
    try {
        const data = yield knowlarityPostApi(
          "POST",
          "account/call/makecall",
          {
            ...action.state, k_number:KNOWLARITY_CONFIGS.superReceptionistNumber,
          }
        );
        yield put({ type: "BOT_TRANSCRIPT_MAKE_CALL_SUCCESS", data: data.data, message:data.msg });
      } catch (error) {
        yield put({
          type: "BOT_TRANSCRIPT_MAKE_CALL_FAILED",
          message: error.message,
        });
      }
}

export default function* botTranscriptSaga() {
  yield takeEvery("GET_TRANSCRIPT_DATA", getBotTranscriptData);
  yield takeEvery("BOT_TRANSCRIPT_COMMUNICATION", getBotTranscriptComm);
  yield takeEvery("BOT_TRANSCRIPT_ADD_COMMENT", getComments);
  yield takeEvery("BOT_TRANSCRIPT_MAKE_CALL", makeCall)
}
