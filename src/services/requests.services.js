import axios from 'axios'
import { getCurrentUser } from 'helpers/Utils';
import { baseURLs } from './apisURLs.services';


const authorizedUser = getCurrentUser();

async function request(method, url, data) {
    return await axios.request({
        method, 
        url, 
        data, 
        headers: {
            Authorization: `Bearer ${authorizedUser.data.token || authorizedUser.token}`
        }
    }).then(res => res.data);
}

// for regular serive request
const regularRequest = async (method, apiEndpoint, data) => {
    return await request(method, baseURLs.regular+apiEndpoint, data);
}

export {
    regularRequest,
    request
}
