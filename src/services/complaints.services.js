import { apisURLs } from "./apisURLs.services"
import { request } from "./requests.services"

const getComplaintDetailsById = async (complaintId) => {
   return await request("GET",apisURLs.getComplaintById + complaintId);
}

const getAllStates = async () => {
    return await request('GET', apisURLs.state);
}

const getPolicyTypes = async () => {
    return await request('GET', apisURLs.getPolicyTypes);
}

export {
    getComplaintDetailsById,
    getAllStates,
    getPolicyTypes,
}