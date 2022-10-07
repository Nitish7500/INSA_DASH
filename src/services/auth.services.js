import axios from "axios"
import { UserRole } from "constants/defaultValues";
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
        const role = (res.data.userType ? 'Admin' : 'Executive');
        res = {...res.data,success};
        // UserRole.Admin = role ? 0 : 1;
        // console.log(UserRole);
        success && setCurrentUser(res);
        return res;
    });
}