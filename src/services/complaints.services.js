import axios from "axios";
import { servicePath } from "constants/defaultValues";
import { getCurrentUser } from "helpers/Utils";
import { apisURLs } from "./apisURLs.services"
import { bearerRequest, request } from "./requests.services"

const authorizedUser = getCurrentUser();
const apiUrl = `${servicePath}/insurance/`;

const getAllStates = async () => {
    return await request('GET', apisURLs.state);
}

const getAllInsa = async () => {
    return await request('GET', apisURLs.getAllInsa);
}

const assignOmbudsman = async () => {
    return await bearerRequest('GET', apisURLs.assignOMD);
}

const assignLegalExpert = async () => {
    return await bearerRequest('GET', apisURLs.assignLegalExpert);
}

const assignIGMS = async () => {
    return await bearerRequest('GET', apisURLs.assignIGMS);
}

const getPolicyTypes = async () => {
    return await request('GET', apisURLs.policyType);
}

const getFirstDraftData = async (data) => {
    return await request('POST', apisURLs.firstDraftData, data);
}

const getUserBasedData = async (data) => {
    return await request('POST', apisURLs.userBasedData, data);
}

const downloadComplaintsReport = async() => {
    return await request('GET', apisURLs.complaintReport);
}

const downloadCustomerReport = async() => {
    return await request('GET', apisURLs.customerReport)
}

// --------------- APIs with Payload -------------- //

const getComplaintDetailsById = async (complaintId) => {
    return await request("GET", apisURLs.getComplaintById + complaintId);
}

const getAllForEscalationByUserId = async (userId) => {
    return await request('POST', apisURLs.getAllForEscalation, userId);
}

const findByUserId = async (userId) => {
    return await request('GET', apisURLs.findByUserId, {userId});
}

const findLegalByComplaintId = async (complaintId) => {
    return await request('POST', apisURLs.findLegalByComplaintId, complaintId);
}

const getComplaintTypesByPolicyTypeId = async (policyTypeId) => {
    return await request('GET', apisURLs.getComplaintTypeList, policyTypeId);
}

const getInsuranceCompanyNamesByPolicyTypeId = async (policyTypeId) => {
    return await request('GET', apisURLs.getInsuranceCompanyList, policyTypeId);
}

const userAdmin = async (id) => {
    return await request('GET', apisURLs.userAdmin, id);
}

const checkRefreshToken = async (email) => {
    return await request("GET", apisURLs.checkRefreshToken + email);
}

const fetchLead = async (leadId) => {
    return await request('GET', apisURLs.lead + leadId);
}

const fetchDocs = async (id1, id2) => {
    return await request('GET', apisURLs.docs + id1 + '/' + id2);
}

const fetchDraftMail = async (userId, policies) => {
    return await request("GET", apisURLs.getDraftMail + userId + `?policyNos=` + policies )
}

const getLegalUserData = async (id) => {
    return await request('GET', apisURLs.getLegalUserData + id);
}

const getCompanyNoticeData = async (num) => {
    return await request('POST', apisURLs.getCompanyNoticeData, {policyNumber : num});
}

const fetchCompIds = async (id) => {
    return await request("POST", apisURLs.getCompIds, {userId: id})
}

const fetchHtmlPage = async (id) => {
    return await request("POST", apisURLs.getHtmlPage, {id:id})
}

const fetchAllUserPolicy = async (complaintType, userId) => {
    return await request("POST", apisURLs.getAllUserPolicy, {
        complaintType:complaintType,
        userId:userId
    })
}

const omdRemindMail = async (id) => {
    return await request('GET', apisURLs.omdRemindMail + id)
}

const getCurrentInvoiceCount = async (headers) => {
    return await request('POST', apisURLs.getCurrentInvoiceCount, headers)
}

const getLeadDoc = async (id) => {
    return await request("GET",apisURLs.getLeadDoc + id)
}

const generateZip = async (data) => {
    return await request("POST", apisURLs.generateZip,data)
}

const downloadZip = async (id) => {
    return await request("GET", apisURLs.downloadZip + id)
}

const getNonResFlow = async (id) => {
    return await request("GET", apisURLs.nonResponsiveFlow + `?id=${id}`)
}

const updateNonResflow = async (data) => {
    return await request("POST", apisURLs.updateNonResFlow, data)
}

const inactiveFlowFunc = async (data) => {
    return await request("POST", apisURLs.inactiveFlow,data)
}

const uploadComCSV = async (data) => {
    return await request("POST",apisURLs.uploadComCSV,data)
}

const addComUser = async (data) => {
    return await request("POST", apisURLs.addComUser,data)
}

const reqDataFunc = async (data) => {
    return await request("POST", apisURLs.reqData, data)
}

const getReqUserData = async (id) => {
    return await request("GET", apisURLs.getCancelData + id)
}

const cancelReqData = async (ids) => {
    return await request("POST", apisURLs.cancelReqData,ids)
}

const assignToOmbPostFunc = async (data) => {
    return  await request("POST", apisURLs.assignOmbudsmanPOST, data)
}

const getTemplateFunc = async (id, data) => {
    return await request("POST",apisURLs.getTemplate + id, data)
}

const updateTemplate = async (data) => {
    return await request("POST", apisURLs.updateTemplate, data)
}

const sendTemplateFunc = async (data) => {
    return await  request("POST", apisURLs.sendTemplate, data)
}

const getMultiMailTemplate = async (id, data) => {
    return await request("POST", apisURLs.getTemplateMul + id, data)
}

const updateTemplateMulFunc = async (data) => {
    return await request("POST", apisURLs.updateMulTemplate, data)
}

const sendTemplateMulFunc = async (data) => {
    return await request("POST", apisURLs.sendTemplateMul, data)
}

const getTempMail = async (data) => {
    return await request("POST", apisURLs.getTempMail, data)
}

const generateMulMail = async (data) => {
    return await request("POST", apisURLs.generateMulMailRem, data)
}

const getTrackDataFunc = async (data) => {
    return await  request("POST", apisURLs.trackData, data)
}

const selectedDoc = async (data) => {
    return await  request("POST", apisURLs.selectedDoc, data)
}

const updateComplaint = async (id, data) => {
    return await request("POST", apisURLs.updateComplaint + id , data)
}

const getComplaints = async function fetchData(selectedPageSize, currentPage, search, statusLabel) {
    axios
    .get(`${apiUrl}?pageIndex=${currentPage}&pageSize=${selectedPageSize}&keyword=${search}${statusFilter}`,
    {
        headers:{
            Authorization: `${authorizedUser.data.token || authorizedUser.token}`
        }
    })
    .then((res) => {
        return res.data;
    })
    .then((data) => {
        const dataList = data.data.list;
        setTotalPage(Math.floor(data.data.totalRecords/selectedPageSize));
        setItems(dataList);
        setTotalItemCount(data.data.totalRecords);
        setIsLoaded(true);
    });
}



export {
    getComplaintDetailsById,
    getAllStates,
    getPolicyTypes,
    getComplaintTypesByPolicyTypeId,
    getInsuranceCompanyNamesByPolicyTypeId,
    getFirstDraftData,
    getUserBasedData,
    getAllForEscalationByUserId,
    findByUserId,
    findLegalByComplaintId,
    userAdmin,
    assignOmbudsman,
    assignLegalExpert,
    assignIGMS,
    checkRefreshToken,
    fetchLead,
    fetchDocs,
    getLegalUserData,
    getCompanyNoticeData,
    omdRemindMail,
    getCurrentInvoiceCount,
    getAllInsa,
    getComplaints,
    downloadComplaintsReport,
    downloadCustomerReport,
    fetchDraftMail,
    fetchCompIds,
    fetchHtmlPage,
    fetchAllUserPolicy,
    getLeadDoc,
    generateZip,
    downloadZip,
    getNonResFlow,
    updateNonResflow,
    inactiveFlowFunc,
    uploadComCSV,
    addComUser,
    reqDataFunc,
    getReqUserData,
    cancelReqData,
    assignToOmbPostFunc,
    getTemplateFunc,
    updateTemplate,
    sendTemplateFunc,
    sendTemplateMulFunc,
    getMultiMailTemplate,
    updateTemplateMulFunc,
    getTempMail,
    generateMulMail,
    getTrackDataFunc,
    selectedDoc,
    updateComplaint,
}