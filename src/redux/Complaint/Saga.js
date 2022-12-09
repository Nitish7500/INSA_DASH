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

function* getUserBasedData(action){
    console.log(action)
    try {
        const data = yield request(
          "POST",
          `https://api.stage.insurancesamadhan.com/insurance/getUserBasedData`,
          {...action.state}
        );
        yield put({ type: "COMPLAINANT_GET_USER_BASED_DATA_SUCCESS", data: data.data });
      } catch (error) {
        console.log(error)
        yield put({
          type: "COMPLAINANT_GET_USER_BASED_DATA_FAILED",
          message: "Failed to add Comment !",
        });
      }
}

function* getUserBucket(action){
  try {
    const data = yield request(
      "GET",
      `https://api.stage.insurancesamadhan.com/insurance/getStatusBuckets`,
    );
    yield put({ type: "COMPLAINANT_GET_STATUS_BUCKET_SUCCESS", data: data.data });
  } catch (error) {
    console.log(error)
    yield put({
      type: "COMPLAINANT_GET_STATUS_BUCKET_FAILED",
      message: "Failed to add Comment !",
    });
  }
}

function* updateComplpaintStatus(action){
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/insurance/updateManyToMany`,
      {...action.state}
    );
    yield put({ type: "COMPLAINANT_UPDATE_COMPLAINT_STATUS_SUCCESS", message:data.message });
  } catch (error) {
    console.log(error)
    yield put({
      type: "COMPLAINANT_UPDATE_COMPLAINT_STATUS_FAILED",
      message: "Failed to add Comment !",
    });
  }
}

function* getOptionBasedData(action){
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/insurance/optionBasedData`,
      {...action.state}
    );
    yield put({ type: "COMPLAINANT_USER_DETAIL_HANDLE_COMPLAINT_SUCCESS", data:data.data });
  } catch (error) {
    console.log(error)
    yield put({
      type: "COMPLAINANT_USER_DETAIL_HANDLE_COMPLAINT_FAILED",
      message: "Failed to add Comment !",
    });
  }
}

function* complaintUpdateInfo(action){
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/insurance/updateMultipleUserData`,
      {...action.state}
    );
    yield put({ type: "COMPLAINANT_UPDATE_INFORMATION_SUCCESS", message:data.message });
  } catch (error) {
    console.log(error)
    yield put({
      type: "COMPLAINANT_UPDATE_INFORMATION_FAILED",
      message: "Failed to add Comment !",
    });
  }
}

function* getStates(action){
  try {
    const data = yield request(
      "GET",
      `https://api.stage.insurancesamadhan.com/ombudsman/state`,
    );
    yield put({ type: "COMPLAINT_STATES_SUCCESS", data:data.data });
  } catch (error) {
    console.log(error)
    yield put({
      type: "COMPLAINT_STATES_FAILED",
      message: "Failed to add Comment !",
    });
  }
}

function* getAllInsa(action){
  try {
    const data = yield request(
      "GET",
      `https://api.stage.insurancesamadhan.com/insurance/getAllInsa`,
    );
    yield put({ type: "COMPLAINT_GET_ALL_INSA_SUCCESS", data:data.data });
  } catch (error) {
    console.log(error)
    yield put({
      type: "COMPLAINT_GET_ALL_INSA_FAILED",
      message: "Failed to add Comment !",
    });
  }
}

function* getPoliciesForEsc(action){
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/insurance/getAllForEscalation`,
      {...action.state}
    );
    let temp = data.data?.map(res => {
      return {value:res._id, label:`${res.policyNumber} -- ${res.name}`}
    })
    yield put({ type: "COMPLAINANT_GET_POLICY_FOR_ESCALATION_SUCCESS", data:temp });
  } catch (error) {
    console.log(error)
    yield put({
      type: "COMPLAINANT_GET_POLICY_FOR_ESCALATION_FAILED",
      message: "Failed to add Comment !",
    });
  }
}

function* docUploadGetData(action){
  console.log(action)
  try {
    const data = yield request(
      "GET",
      `https://api.stage.insurancesamadhan.com/insurance/${action.state.id}`,
    );
    yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/insurance/igmsDoc/${data.data[0]?.userId}/${btoa(data.data[0]?.policyNumber)}`,
      action.state.file
    );
    yield request(
      "POST",
      "https://api.stage.insurancesamadhan.com/insurance/docUpload",
      {
        id:action.state.id,
        policy_number:data.data[0]?.policyNumber,
        userId:data.data[0]?.userId
      }

    )
    yield put({ type: "COMPLAINT_DOC_UPLOAD_GET_API_SUCCESS", data:data.data });
  } catch (error) {
    console.log(error)
    yield put({
      type: "COMPLAINT_DOC_UPLOAD_GET_API_FAILED",
      message: "Failed to add Comment !",
    });
  }
}

// function* uploadDoc(action){
//   try {
//     const data = yield request(
//       "POST",
//       `https://api.stage.insurancesamadhan.com/insurance/igmsDoc/${action.state.id}/${action.state.policyNumber}`,
//       action.state.file
//     );
//     dispatch({
//       type: "COMPLAINT_UPLOAD_DOC",
//       state: {
//         policyNumber: state.docUploadGet[0]?.policyNumber,
//         id: state.docUploadGet[0]?.userId,
//         file:formData
//       },
//     });

//     yield put({ type: "COMPLAINT_UPLOAD_DOC_SUCCESS", message:data.message });
//   } catch (error) {
//     console.log(error)
//     yield put({
//       type: "COMPLAINT_UPLOAD_DOC_FAILED",
//       message: "Failed to Upload !",
//     });
//   }
// }

function* uploadMulUserData(action){
  try {
    const data = yield request(
      "POST",
      `https://api.stage.insurancesamadhan.com/insurance/updateMultipleUserData`,
      {...action.state}
    );

    yield put({ type: "COMPLAINT_UPLOAD_MUL_USER_DATA_SUCCESS", message:data.message });
  } catch (error) {
    console.log(error)
    yield put({
      type: "COMPLAINT_UPLOAD_MUL_USER_DATA_FAILED",
      message: "Failed to add Comment !",
    });
  }
}


function* getLead(action){
  try {
    const data = yield request(
      "GET",
      `https://api.stage.insurancesamadhan.com/lead/${action.state.id}`,
    );
    yield put({ type: "COMPLAINT_GET_LEAD_SUCCESS", data:data.data });
  } catch (error) {
    console.log(error)
    yield put({
      type: "COMPLAINT_GET_LEAD_FAILED",
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
    yield takeEvery("COMPLAINANT_GET_USER_BASED_DATA",getUserBasedData)
    yield takeEvery("COMPLAINANT_GET_STATUS_BUCKET",getUserBucket)
    yield takeEvery("COMPLAINANT_UPDATE_COMPLAINT_STATUS", updateComplpaintStatus)
    yield takeEvery("COMPLAINANT_USER_DETAIL_HANDLE_COMPLAINT",getOptionBasedData)
    yield takeEvery("COMPLAINANT_UPDATE_INFORMATION", complaintUpdateInfo)
    yield takeEvery("COMPLAINT_STATES", getStates);
    yield takeEvery("COMPLAINT_GET_ALL_INSA",getAllInsa)
    yield takeEvery("COMPLAINANT_GET_POLICY_FOR_ESCALATION",getPoliciesForEsc)
    yield takeEvery("COMPLAINT_DOC_UPLOAD_GET_API",docUploadGetData)
    yield takeEvery("COMPLAINT_UPLOAD_MUL_USER_DATA",uploadMulUserData)
    yield takeEvery("COMPLAINT_GET_LEAD", getLead)
}