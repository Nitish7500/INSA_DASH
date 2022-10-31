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

const getFirstDraftData = async () => {
    return await request('GET', apisURLs.firstDraftData);
}

const getUserBasedData = async () => {
    return await request('GET', apisURLs.userBasedData);
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
    return await request('GET', apisURLs.getAllForEscalation, userId);
}

const findByUserId = async (userId) => {
    return await request('GET', apisURLs.findByUserId, userId);
}

const findLegalByComplaintId = async (complaintId) => {
    return await request('GET', apisURLs.findLegalByComplaintId, complaintId);
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

const getLegalUserData = async (id) => {
    return await request('GET', apisURLs.getLegalUserData + id);
}

const getCompanyNoticeData = async (id) => {
    return await request('GET', apisURLs.getCompanyNoticeData, id);
}

const omdRemindMail = async (id) => {
    return await request('GET', apisURLs.omdRemindMail + id)
}

const getCurrentInvoiceCount = async (headers) => {
    return await request('GET', apisURLs.getCurrentInvoiceCount, headers)
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
    downloadCustomerReport
}