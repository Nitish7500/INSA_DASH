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
    assignCompanyPOST : baseURLs.regular + 'insurance/assignIGMS',
    assignOmbudsmanPOST : baseURLs.regular + 'insurance/assignOMD',
    getDraftMail : baseURLs.regular + "draftMailAuto/getDraftMail/",
    getCompIds : baseURLs.regular + "insurance/compIds",
    getHtmlPage : baseURLs.regular + "insurance/getHtmlPage",
    getAllUserPolicy : baseURLs.regular + "insurance/getAllUserPolicy",
    sentMailToUser:baseURLs.regular + "draftMailAuto/sendEmailToCustomerComplaint",
    getLeadDoc:baseURLs.regular + "lead/",
    generateZip:baseURLs.regular + "insurance/allDocDownloadCombined",
    downloadZip:baseURLs.regular + `insurance/details/`,
    nonResponsiveFlow:baseURLs.regular + "nonResponsiveFlow/getNRData",
    updateNonResFlow:baseURLs.regular + "nonResponsiveFlow/addUpdateData",
    inactiveFlow:baseURLs.regular + "nonResponsiveFlow/activeInactiveFollow",
    uploadComCSV: baseURLs.regular + "lead/uploadComplaintCsv",
    addComUser: baseURLs.regular + "lead/addComplaintUser",
    reqData : baseURLs.regular + "reqDataFromCustomer/addReqData",
    getCancelData : baseURLs.regular + "reqDataFromCustomer/getCancelUserData/",
    cancelReqData : baseURLs.regular + "reqDataFromCustomer/cancelReqData",
    getTemplate : baseURLs.regular + "omdRemindMail/getTemplate/",
    getTemplateMul : baseURLs.regular + "omdRemindMailMultiple/getTemplate/",
    updateTemplate : baseURLs.regular + "omdRemindMail/updateTemplate",
    updateMulTemplate : baseURLs.regular + "omdRemindMailMultiple/updateTemplate",
    sendTemplate : baseURLs.regular + "omdRemindMail/sendTemplate",
    sendTemplateMul : baseURLs.regular + "omdRemindMailMultiple/sendTemplate",
    getTempMail : baseURLs.regular + "omdRemindMailMultiple/getTempMail",
    generateMulMailRem : baseURLs.regular + "omdRemindMailMultiple/getMailTemplate",
    trackData : baseURLs.regular + "omdRemindMailMultiple/getTrackData",
    selectedDoc : baseURLs.regular + "insurance/selectedDocuments",
    updateComplaint : baseURLs.regular + "insurance/addMore/",
    userReport : baseURLs.agent + "dateWise",
    statusWise : baseURLs.agent + "statusWise",
    groupWise : baseURLs.agent + "groupWise"
}


