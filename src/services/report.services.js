import axios from "axios";
import { servicePath } from "constants/defaultValues";
import { getCurrentUser } from "helpers/Utils";
import { apisURLs } from "./apisURLs.services"
import { bearerRequest, request } from "./requests.services"

const authorizedUser = getCurrentUser();
const apiUrl = `${servicePath}/insurance/`;


const userReport = async (data) => {
    return await bearerRequest("POST",apisURLs.userReport, data)
}

const statusWise = async (data) => {
    return await bearerRequest("POST", apisURLs.statusWise, data)
} 

const groupWiseData = async (data) => {
    return await bearerRequest("POST", apisURLs.groupWise, data)
}

export {userReport, statusWise, groupWiseData}