import axios from "axios";
import { getCurrentUser, KNOWLARITY_CONFIGS } from "helpers/Utils";
import { baseURLs } from "./apisURLs.services";

const authorizedUser = getCurrentUser();

async function request(method, url, data) {
  return await axios
    .request({
      method,
      url,
      data,
      headers: {
        Authorization: `${authorizedUser.data.token || authorizedUser.token}`,
      },
    })
    .then((res) => res.data);
}

// for regular serive request
const regularRequest = async (method, apiEndpoint, data) => {
  return await request(method, baseURLs.regular + apiEndpoint, data);
};

// for requests with bearer token
async function bearerRequest(method, url, data) {
  return await axios
    .request({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${authorizedUser.insa_agentToken}`,
      },
    })
    .then((res) => res.data);
}

async function knowlarityPostApi(method, url, data) {
  return await axios.request({
    method,
    url: `${KNOWLARITY_CONFIGS.baseUrl}/${KNOWLARITY_CONFIGS.channel}/v1/${url}`,
    data,
    headers: {
      Authorization: `${KNOWLARITY_CONFIGS.Authorization}`,
      "x-api-key": KNOWLARITY_CONFIGS["x-api-key"],
    },
  });
}

export { regularRequest, bearerRequest, request, knowlarityPostApi };
