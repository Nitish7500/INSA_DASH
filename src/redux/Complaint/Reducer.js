import { COMPLAINT_ADD_COMMENT, COMPLAINT_ADD_COMMENT_FAILED, COMPLAINT_ADD_COMMENT_SUCCESS, COMPLAINT_CALL_LOG, COMPLAINT_CALL_LOG_FAILED, COMPLAINT_CALL_LOG_SUCCESS, COMPLAINT_CLAIM_OPERATION, COMPLAINT_CLAIM_OPERATION_FAILED, COMPLAINT_CLAIM_OPERATION_SUCCESS, COMPLAINT_FEE_OPERATION, COMPLAINT_FEE_OPERATION_FAILED, COMPLAINT_FEE_OPERATION_SUCCESS, COMPLAINT_FINAL_PAYMENT, COMPLAINT_FINAL_PAYMENT_FAILED, COMPLAINT_FINAL_PAYMENT_SUCCESS, COMPLAINT_GET_COMMENTS, COMPLAINT_GET_COMMENTS_FAILED, COMPLAINT_GET_COMMENTS_SUCCESS, COMPLAINT_GET_WAIVEOFF, COMPLAINT_GET_WAIVEOFF_FAILED, COMPLAINT_GET_WAIVEOFF_SUCCESS, COMPLAINT_SECOND_ADD_FINAL_AMOUNT, COMPLAINT_SECOND_ADD_FINAL_AMOUNT_FAILED, COMPLAINT_SECOND_ADD_FINAL_AMOUNT_SUCCESS, COMPLAINT_UPDATE_COMMENT, COMPLAINT_UPDATE_COMMENT_FAILED, COMPLAINT_UPDATE_COMMENT_SUCCESS } from "./Action";


const initialStatte = {
    waiveOfUsers:[],
    message : "",
    callLog:[],
    comments:[],
}

export default function(state = initialStatte, action){

    switch (action.type) {
        case COMPLAINT_GET_WAIVEOFF :
            return {...state}
            
        case COMPLAINT_GET_WAIVEOFF_SUCCESS:
            let data = action.data?.map(res =>{ return {value:res._id, label: `${res.policyNumber}-${res.name}`}})
            return {...state, waiveOfUsers:data}

        case COMPLAINT_GET_WAIVEOFF_FAILED:
            return {...state, message:action.message}

        case COMPLAINT_FEE_OPERATION:
            return {...state}

        case COMPLAINT_FEE_OPERATION_SUCCESS:
            return {...state, message:action.message}

        case COMPLAINT_FEE_OPERATION_FAILED:
            return {...state, message:action.message}

        case COMPLAINT_SECOND_ADD_FINAL_AMOUNT:
            return {...state}

        case COMPLAINT_SECOND_ADD_FINAL_AMOUNT_SUCCESS:
            return {...state, message:action.message}

        case COMPLAINT_SECOND_ADD_FINAL_AMOUNT_FAILED:
            return {...state, message:action.message}
    
        case COMPLAINT_FINAL_PAYMENT:
            return {...state}

        case COMPLAINT_FINAL_PAYMENT_SUCCESS:
            return {...state, message:action.message}

        case COMPLAINT_FINAL_PAYMENT_FAILED:
            return {...state, message:action.message}

        case COMPLAINT_CLAIM_OPERATION:
            return {...state}

        case COMPLAINT_CLAIM_OPERATION_SUCCESS:
            return {...state, message:action.message}

        case COMPLAINT_CLAIM_OPERATION_FAILED:
            return {...state, message:action.message}

        case COMPLAINT_CALL_LOG:
            return {...state}

        case COMPLAINT_CALL_LOG_SUCCESS:
            return {...state,callLog:action.data}

        case COMPLAINT_CALL_LOG_FAILED:
            return {...state, message:action.message}

        case COMPLAINT_ADD_COMMENT:
            return {...state}

        case COMPLAINT_ADD_COMMENT_SUCCESS:
            return {...state,message:action.message}

        case COMPLAINT_ADD_COMMENT_FAILED:
            return{...state, message:action.message}

        case COMPLAINT_UPDATE_COMMENT:
            return {...state}

        case COMPLAINT_UPDATE_COMMENT_SUCCESS:
            return {...state, message:action.message}

        case COMPLAINT_UPDATE_COMMENT_FAILED:
            return {...state, message:action.message}

        case COMPLAINT_GET_COMMENTS:
            return {...state}

        case COMPLAINT_GET_COMMENTS_SUCCESS:
            return {...state, comments:action.data}

        case COMPLAINT_GET_COMMENTS_FAILED:
            return {...state, message:action.message}

        default:
            return {...state}
        
    }

}