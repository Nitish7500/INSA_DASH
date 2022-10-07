import axios from "axios"
import { setCurrentUser } from "helpers/Utils";
import { apisURLs } from "./apisURLs.services"



export const loginWithEmailAndPasswordApi = async ({email,password}) => {
    const apiEndpoint = email.trim() === "ravi@insurancesamadhan.com"?"adminLogin":"agentLogin";
    return await axios({
        method:"POST",
        url:apisURLs[apiEndpoint],
        data:{
            email,
            password
        } 
    }).then(res => {
        const success = res.data.success || (res.data.Status ==="200"?true:false);
        res = {...res.data,success};
        success && setCurrentUser(res);
        return res;
    });
}