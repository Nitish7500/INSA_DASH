export const baseURLs = {
    regular:"https://api.stage.insurancesamadhan.com/",
    agent:"https://agentapi.stage.insurancesamadhan.com/"
}

export const apisURLs = {
    adminLogin : baseURLs.regular + "admin/login",
    agentLogin : baseURLs.agent + 'login',
    createToken : baseURLs.agent + 'createToken',
    getComplaintById : baseURLs.regular + 'insurance/details/',
    state : baseURLs.regular + 'ombudsman/state',
    getAllInsa : baseURLs.regular + 'insurance/getAllInsa',
    policyType : baseURLs.regular + 'policy_type',
    assignLegalExpert : baseURLs.agent + 'assignLegalExpert',
    assignOMD : baseURLs.agent + 'assignOMD',
    getCurrentInvoiceCount : baseURLs.regular + 'insurance/getCurrentInvoiceCount',
    findByUserId : baseURLs.regular + 'insurance/findByUserId',
    omdRemindMail : baseURLs.regular + 'omdRemindMail/',
    userAdmin : baseURLs.regular + 'insurance/userAdmin',
    findLegalByComplaintId : baseURLs.regular + 'insurance/findLegalByComplaintId',
    getLegalUserData : baseURLs.regular + 'getLegalUserData/',
    getCompanyNoticeData : baseURLs.regular + 'companyNotice/getCompanyNoticeData',
    getAllForEscalation : baseURLs.regular + 'insurance/getAllForEscalation',
    docs : baseURLs.regular + 'docs/',
    lead : baseURLs.regular + 'lead/',
    checkRefreshToken : baseURLs.regular + 'gmail/checkRefreshToken/',
    getComplaintTypeList : baseURLs.regular + 'complaint_type?policyTypeId=',
    getInsuranceCompanyList : baseURLs.regular + 'insurance_company/getByPolicyId?policyTypeId=',
    userBasedData : baseURLs.regular + 'insurance/getUserBasedData',
    firstDraftData : baseURLs.regular + 'insurance/firstDraftData',
    searchEmailPolicy : baseURLs.agent + 'searchEmailPolicy',
    complaintReport : baseURLs.regular + 'analytics/csv/insurance',
    customerReport : baseURLs.regular + 'analytics/csv/customerReport',
    setStatusPOST : baseURLs.regular + 'insurance/setStatus',
    getUserBasedDataPOST : baseURLs.regular + 'insurance/getUserBasedData',
    assignIGMSPOST : baseURLs.regular + 'insurance/assignIGMS',
    assignOMDPOST : baseURLs.regular + 'insurance/assignOMD'
}


