import axios from "axios"



export const baseURLs = {
    regular:"https://api.stage.insurancesamadhan.com/",
    agent:"https://agentapi.stage.insurancesamadhan.com/"
}

export const apisURLs = {
    adminLogin : baseURLs.regular + "admin/login",
    agentLogin : baseURLs.agent + 'login',
    getComplaintById : baseURLs.regular + '/insurance/details/',
    state : baseURLs.regular + '/ombudsman/state',
    getAllInsa : baseURLs.regular + '/insurance/getAllInsa',
    policyType : baseURLs.regular + '/policy_type',
    
}


