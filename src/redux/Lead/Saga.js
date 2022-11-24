import { put, take, takeEvery } from "redux-saga/effects";
import { bearerRequest, request } from "services/requests.services";

function* getAssignUsers(action){
    try {
        const data = yield bearerRequest(
            "GET",
            "https://agentapi.stage.insurancesamadhan.com/assignUser",
        )

        yield put({type:"LEAD_ASSIGN_USER_SUCCESS", data:data.data})

    } catch (error) {
        yield put({
            type: "LEAD_ASSIGN_USER_FAILED",
            message: "Failed to get data !",
          });
      }
}

function* getAssignExperts(action){
    try {
        const data = yield bearerRequest(
            "GET",
            "https://agentapi.stage.insurancesamadhan.com/assignExpert",
        )

        yield put({type:"LEAD_ASSIGN_EXPERT_SUCCESS", data:data.data})

    } catch (error) {
        yield put({
            type: "LEAD_ASSIGN_EXPERT_FAILED",
            message: "Failed to get data !",
          });
      }
}


function* getInsuranceCompany(action){
    try {
        const data = yield bearerRequest(
            "GET",
            "https://api.stage.insurancesamadhan.com/insurance_company",
        )

        yield put({type:"LEAD_INSURANCE_COMPANY_SUCCESS", data:data.data})

    } catch (error) {
        yield put({
            type: "LEAD_INSURANCE_COMPANY_FAILED",
            message: "Failed to get data !",
          });
      }
}

function* getLeadDataByStatus(action){
    try {
        const data = yield request(
            "GET",
            `https://api.stage.insurancesamadhan.com/lead/?status=${action.state?.status}&pageIndex=${action.state?.pageIndex}&pageSize=${action.state?.pageSize}&keyword=${action.state?.keyword}`,
        )

        yield put({type:"LEAD_DATA_WITH_STATUS_SUCCESS", data:data.data})

    } catch (error) {
        yield put({
            type: "LEAD_DATA_WITH_STATUS_FAILED",
            message: "Failed to get data !",
          });
      }
}

function* getLeadUsers(action){
    try {
        const data = yield bearerRequest(
            "GET",
            "https://agentapi.stage.insurancesamadhan.com/users",
        )

        yield put({type:"LEAD_USERS_SUCCESS", data:data})

    } catch (error) {
        yield put({
            type: "LEAD_USERS_FAILED",
            message: "Failed to get data !",
          });
      }
}



export default function* leadSaga(){
    yield takeEvery("LEAD_ASSIGN_USER",getAssignUsers)
    yield takeEvery("LEAD_ASSIGN_EXPERT",getAssignExperts)
    yield takeEvery("LEAD_INSURANCE_COMPANY", getInsuranceCompany)
    yield takeEvery("LEAD_DATA_WITH_STATUS",getLeadDataByStatus)
    yield takeEvery("LEAD_USERS",getLeadUsers)
}