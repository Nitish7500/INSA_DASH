import { GET_ASSIGN_LEGAL_EXECUTIVE, GET_ASSIGN_LEGAL_EXECUTIVE_FAILED, GET_ASSIGN_LEGAL_EXECUTIVE_SUCCESS, USERS_GET_LIST, USERS_GET_LIST_FAILED, USERS_GET_LIST_SUCCESS, USER_ADD_USER, USER_ADD_USER_FAILED, USER_ADD_USER_SUCCESS, USER_GET_ASSIGN_USER, USER_GET_ASSIGN_USER_FAILED, USER_GET_ASSIGN_USER_SUCCESS, USER_GET_LEGAL_SUBEXECUTIVE, USER_GET_LEGAL_SUBEXECUTIVE_FAILED, USER_GET_LEGAL_SUBEXECUTIVE_SUCCESS, USER_GET_STATUS_BUCKET, USER_GET_STATUS_BUCKET_FAILED, USER_GET_STATUS_BUCKET_SUCCESS, USER_UPDATE_PASSWORD, USER_UPDATE_PASSWORD_FAILED, USER_UPDATE_PASSWORD_SUCCESS, USER_UPDATE_USER, USER_UPDATE_USER_FAILED, USER_UPDATE_USER_SUCCESS } from "./Action";

let initialState = {
    userData:{},
    statusBucket:{},
    assignUser:[],
    legalExecutive:[],
    legalSubExecutive:[],
    message:"",
    userUpdateMessage:"",
    loding:false
}

export default function(state=initialState, action){
    switch (action.type) {
        case USERS_GET_LIST:
            return {...state, loading:true}

        case USERS_GET_LIST_SUCCESS:
            return {...state, userData:action.data, loading:false}

        case USERS_GET_LIST_FAILED:
            return {...state, message:action.message, loading:false}

        case USER_GET_STATUS_BUCKET:
            return {...state}

        case USER_GET_STATUS_BUCKET_SUCCESS:
            return {...state, statusBucket:action.data}

        case USER_GET_STATUS_BUCKET_FAILED:
            return {...state, message:action.message}

        case USER_GET_ASSIGN_USER:
            return {...state}

        case USER_GET_ASSIGN_USER_SUCCESS:
            return {...state, assignUser:action.data}

        case USER_GET_ASSIGN_USER_FAILED:
            return {...state, message:action.message}

        case GET_ASSIGN_LEGAL_EXECUTIVE:
            return {...state}

        case GET_ASSIGN_LEGAL_EXECUTIVE:
            return {...state}

        case GET_ASSIGN_LEGAL_EXECUTIVE_SUCCESS:
            return {...state, legalExecutive:action.data}

        case GET_ASSIGN_LEGAL_EXECUTIVE_FAILED:
            return {...state, message:action.message}

        case USER_GET_LEGAL_SUBEXECUTIVE:
            return {...state}

        case USER_GET_LEGAL_SUBEXECUTIVE_SUCCESS:
            return {...state, legalSubExecutive:action.data}

        case USER_GET_LEGAL_SUBEXECUTIVE_FAILED:
            return {...state, message:action.message}

        case USER_UPDATE_USER:
            return {...state}

        case USER_UPDATE_USER_SUCCESS:
            return {...state, userUpdateMessage:"User Updated Successfully !"}

        case USER_UPDATE_USER_FAILED:
            return {...state, userUpdateMessage:"Failed to Update User !"}

        case USER_ADD_USER:
            return {...state}

        case USER_ADD_USER_SUCCESS:
            return {...state, message:"User Added Successfully !"}

        case USER_ADD_USER_FAILED:
            return {...state, message:"Failed to add User !"}

        case USER_UPDATE_PASSWORD:
            return {...state}

        case USER_UPDATE_PASSWORD_SUCCESS:
            return {...state, message:"Password has been updated !"}
        
        case USER_UPDATE_PASSWORD_FAILED:
            return {...state, message:"Failed to update password !"}
    
        default:
            return {...state}
    }
}