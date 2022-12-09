import {
  COMPLAINANT_GET_POLICY_FOR_ESCALATION,
  COMPLAINANT_GET_POLICY_FOR_ESCALATION_FAILD,
  COMPLAINANT_GET_POLICY_FOR_ESCALATION_SUCCESS,
  COMPLAINANT_GET_STATUS_BUCKET,
  COMPLAINANT_GET_STATUS_BUCKET_FAILED,
  COMPLAINANT_GET_STATUS_BUCKET_SUCCESS,
  COMPLAINANT_GET_USER_BASED_DATA,
  COMPLAINANT_GET_USER_BASED_DATA_FAILED,
  COMPLAINANT_GET_USER_BASED_DATA_SUCCESS,
  COMPLAINANT_UPDATE_COMPLAINT_STATUS,
  COMPLAINANT_UPDATE_COMPLAINT_STATUS_FAILED,
  COMPLAINANT_UPDATE_COMPLAINT_STATUS_SUCCESS,
  COMPLAINANT_UPDATE_INFORMATION,
  COMPLAINANT_UPDATE_INFORMATION_FAILED,
  COMPLAINANT_UPDATE_INFORMATION_SUCCESS,
  COMPLAINANT_USER_DETAIL_HANDLE_COMPLAINT,
  COMPLAINANT_USER_DETAIL_HANDLE_COMPLAINT_FAILED,
  COMPLAINANT_USER_DETAIL_HANDLE_COMPLAINT_SUCCESS,
  COMPLAINT_ADD_COMMENT,
  COMPLAINT_ADD_COMMENT_FAILED,
  COMPLAINT_ADD_COMMENT_SUCCESS,
  COMPLAINT_CALL_LOG,
  COMPLAINT_CALL_LOG_FAILED,
  COMPLAINT_CALL_LOG_SUCCESS,
  COMPLAINT_CLAIM_OPERATION,
  COMPLAINT_CLAIM_OPERATION_FAILED,
  COMPLAINT_CLAIM_OPERATION_SUCCESS,
  COMPLAINT_DOC_UPLOAD_GET_API,
  COMPLAINT_DOC_UPLOAD_GET_API_FAILED,
  COMPLAINT_DOC_UPLOAD_GET_API_SUCCESS,
  COMPLAINT_FEE_OPERATION,
  COMPLAINT_FEE_OPERATION_FAILED,
  COMPLAINT_FEE_OPERATION_SUCCESS,
  COMPLAINT_FINAL_PAYMENT,
  COMPLAINT_FINAL_PAYMENT_FAILED,
  COMPLAINT_FINAL_PAYMENT_SUCCESS,
  COMPLAINT_GET_ALL_INSA,
  COMPLAINT_GET_ALL_INSA_FAILED,
  COMPLAINT_GET_ALL_INSA_SUCCESS,
  COMPLAINT_GET_COMMENTS,
  COMPLAINT_GET_COMMENTS_FAILED,
  COMPLAINT_GET_COMMENTS_SUCCESS,
  COMPLAINT_GET_LEAD,
  COMPLAINT_GET_LEAD_FAILED,
  COMPLAINT_GET_LEAD_SUCCESS,
  COMPLAINT_GET_WAIVEOFF,
  COMPLAINT_GET_WAIVEOFF_FAILED,
  COMPLAINT_GET_WAIVEOFF_SUCCESS,
  COMPLAINT_SECOND_ADD_FINAL_AMOUNT,
  COMPLAINT_SECOND_ADD_FINAL_AMOUNT_FAILED,
  COMPLAINT_SECOND_ADD_FINAL_AMOUNT_SUCCESS,
  COMPLAINT_STATES,
  COMPLAINT_STATES_FAILED,
  COMPLAINT_STATES_SUCCESS,
  COMPLAINT_UPDATE_COMMENT,
  COMPLAINT_UPDATE_COMMENT_FAILED,
  COMPLAINT_UPDATE_COMMENT_SUCCESS,
  COMPLAINT_UPLOAD_DOC,
  COMPLAINT_UPLOAD_DOC_FAILED,
  COMPLAINT_UPLOAD_DOC_SUCCESS,
  COMPLAINT_UPLOAD_MUL_USER_DATA,
  COMPLAINT_UPLOAD_MUL_USER_DATA_FAILED,
  COMPLAINT_UPLOAD_MUL_USER_DATA_SUCCESS,
} from "./Action";

const initialStatte = {
  waiveOfUsers: [],
  message: "",
  callLog: [],
  comments: [],
  userBasedData: [],
  statusBucket:[],
  optionBasedData:[],
  states:[],
  allInsa:[],
  forEscalation:[],
  docUploadGet:[],
  leadData:[],
};

export default function (state = initialStatte, action) {
  switch (action.type) {
    case COMPLAINT_GET_WAIVEOFF:
      return { ...state };

    case COMPLAINT_GET_WAIVEOFF_SUCCESS:
      let data = action.data?.map((res) => {
        return { value: res._id, label: `${res.policyNumber}-${res.name}` };
      });
      return { ...state, waiveOfUsers: data };

    case COMPLAINT_GET_WAIVEOFF_FAILED:
      return { ...state, message: action.message };

    case COMPLAINT_FEE_OPERATION:
      return { ...state };

    case COMPLAINT_FEE_OPERATION_SUCCESS:
      return { ...state, message: action.message };

    case COMPLAINT_FEE_OPERATION_FAILED:
      return { ...state, message: action.message };

    case COMPLAINT_SECOND_ADD_FINAL_AMOUNT:
      return { ...state };

    case COMPLAINT_SECOND_ADD_FINAL_AMOUNT_SUCCESS:
      return { ...state, message: action.message };

    case COMPLAINT_SECOND_ADD_FINAL_AMOUNT_FAILED:
      return { ...state, message: action.message };

    case COMPLAINT_FINAL_PAYMENT:
      return { ...state };

    case COMPLAINT_FINAL_PAYMENT_SUCCESS:
      return { ...state, message: action.message };

    case COMPLAINT_FINAL_PAYMENT_FAILED:
      return { ...state, message: action.message };

    case COMPLAINT_CLAIM_OPERATION:
      return { ...state };

    case COMPLAINT_CLAIM_OPERATION_SUCCESS:
      return { ...state, message: action.message };

    case COMPLAINT_CLAIM_OPERATION_FAILED:
      return { ...state, message: action.message };

    case COMPLAINT_CALL_LOG:
      return { ...state };

    case COMPLAINT_CALL_LOG_SUCCESS:
      return { ...state, callLog: action.data };

    case COMPLAINT_CALL_LOG_FAILED:
      return { ...state, message: action.message };

    case COMPLAINT_ADD_COMMENT:
      return { ...state };

    case COMPLAINT_ADD_COMMENT_SUCCESS:
      return { ...state, message: action.message };

    case COMPLAINT_ADD_COMMENT_FAILED:
      return { ...state, message: action.message };

    case COMPLAINT_UPDATE_COMMENT:
      return { ...state };

    case COMPLAINT_UPDATE_COMMENT_SUCCESS:
      return { ...state, message: action.message };

    case COMPLAINT_UPDATE_COMMENT_FAILED:
      return { ...state, message: action.message };

    case COMPLAINT_GET_COMMENTS:
      return { ...state };

    case COMPLAINT_GET_COMMENTS_SUCCESS:
      console.log("-------------------", action.data);
      return { ...state, comments: action.data };

    case COMPLAINT_GET_COMMENTS_FAILED:
      return { ...state, message: action.message };

    case COMPLAINANT_GET_USER_BASED_DATA:
      return { ...state };

    case COMPLAINANT_GET_USER_BASED_DATA_SUCCESS:
      return { ...state, userBasedData: action.data };

    case COMPLAINANT_GET_USER_BASED_DATA_FAILED:
      return { ...state, message: action.message };

    case COMPLAINANT_GET_STATUS_BUCKET:
      return {...state}

    case COMPLAINANT_GET_STATUS_BUCKET_SUCCESS:
      let temp = Object.values(Object.fromEntries(action.data?.statusBuckets))
      let temp2 = []
      temp.map(res => {temp2 = [...temp2, ...res]})
      // console.log(temp2)
      return {...state,statusBucket:temp2}

    case COMPLAINANT_GET_STATUS_BUCKET_FAILED:
      return {...state,message:action.message}

    case COMPLAINANT_UPDATE_COMPLAINT_STATUS:
      return {...state}

    case COMPLAINANT_UPDATE_COMPLAINT_STATUS_SUCCESS:
      return {...state, message:action.message}

    case COMPLAINANT_UPDATE_COMPLAINT_STATUS_FAILED:
      return {...state,message:action.message}

    case COMPLAINANT_USER_DETAIL_HANDLE_COMPLAINT:
      return {...state}

    case COMPLAINANT_USER_DETAIL_HANDLE_COMPLAINT_SUCCESS:
      return {...state, optionBasedData:action.data}

    case COMPLAINANT_USER_DETAIL_HANDLE_COMPLAINT_FAILED:
      return {...state, message:action.message}

    case COMPLAINANT_UPDATE_INFORMATION:
      return {...state}

    case COMPLAINANT_UPDATE_INFORMATION_SUCCESS:
      return {...state, message:action.message}

    case COMPLAINANT_UPDATE_INFORMATION_FAILED:
      return {...state, message:action.message}

      case COMPLAINT_STATES:
          return {...state}

      case COMPLAINT_STATES_SUCCESS:
          return {...state, states : action.data}

      case COMPLAINT_STATES_FAILED:
          return {...state, message:action.state}

      case COMPLAINT_GET_ALL_INSA:
        return {...state}

      case COMPLAINT_GET_ALL_INSA_SUCCESS:
        return {...state, allInsa:action.data}

      case COMPLAINT_GET_ALL_INSA_FAILED:
        return {...state, message:action.message}

      case COMPLAINANT_GET_POLICY_FOR_ESCALATION:
        return {...state}

      case COMPLAINANT_GET_POLICY_FOR_ESCALATION_SUCCESS:
        return {...state, forEscalation:action.data}

      case COMPLAINANT_GET_POLICY_FOR_ESCALATION_FAILD:
        return {...state, message:action.message}

      case COMPLAINT_DOC_UPLOAD_GET_API:
        return {...state}

      case COMPLAINT_DOC_UPLOAD_GET_API_SUCCESS:
        return {...state, docUploadGet:action.data}

      case COMPLAINT_DOC_UPLOAD_GET_API_FAILED:
        return {...state, message:action.message}

      case COMPLAINT_UPLOAD_DOC:
        return {...state}

      case COMPLAINT_UPLOAD_DOC_SUCCESS:
        return {...state, message:action.message}


      case COMPLAINT_UPLOAD_DOC_FAILED:
        return {...state, message:action.message}

      case COMPLAINT_UPLOAD_MUL_USER_DATA:
        return {...state}

      case COMPLAINT_UPLOAD_MUL_USER_DATA_SUCCESS:
        return {...state,message:action.message}

      case COMPLAINT_UPLOAD_MUL_USER_DATA_FAILED:
        return {...state, message:action.message}

      case COMPLAINT_GET_LEAD:
        return {...state}

      case COMPLAINT_GET_LEAD_SUCCESS:
        return {...state, leadData:action.data}

      case COMPLAINT_GET_LEAD_FAILED:
        return {...state, message:action.message}

        default:
      return { ...state };
  }
}
