import axios from "axios";
import apiConfig from "./api-config";
import Cookies from "js-cookie";
import * as constant from "../configs/constant";
import * as qs from "qs";
import AuthService from "./auth";
import { errorSweetAlert } from "../utility/commun-func";
import { ROLE_ADMIN } from "../configs/constant";
async function callApi(apiObject) {
  let body = {};
  let headers;
  const method = apiObject.method ? apiObject.method.toLowerCase() : "get";
  if (method === "post" || method === "put" || method === "patch") {
    body = apiObject.body ? apiObject.body : {};
  }

  // eslint-disable-next-line prefer-const
  headers = {
    "Content-Type": apiObject.urlencoded
      ? "application/x-www-form-urlencoded"
      : apiObject.multipart
      ? "multipart/form-data"
      : "application/json",
  };
  if (apiObject.authentication) {
    headers.Authorization = `Bearer ${localStorage.getItem(
      constant.ACCESS_TOKEN
    )}`;
  }
  if (apiObject.type === "AUTH") {
    headers.Authorization = `Basic ${apiObject.isAdmin ? constant.ADMIN_SECRET_KEY : constant.SECRET_KEY}`;
  }
  if (apiObject.type === "RENEW_TOKEN") {
    headers.Authorization = `Basic ${constant.USER_ROLE === ROLE_ADMIN ? constant.ADMIN_SECRET_KEY : constant.SECRET_KEY}`;
  }

  let serverUrl = apiConfig.serverUrl;
  let basePath = apiConfig.basePath;

  if (apiObject.basePath) {
    basePath = apiObject.basePath;
  }

  const url = `${serverUrl}/${basePath}/${apiObject.endpoint}`;
  let result;

  await axios[method](
    url,
    method !== "get" && method !== "delete" ? body : { headers: headers },
    { headers: headers }
  )
    .then(async (response) => {
      result = {
        ...(await response.data),
        status: response && response.errorCode ? response.errorCode : 0,
      };
    })
    .catch(async (error) => {
      if (error !== undefined) {
        if (error.response === undefined) {
          result = await {
            success: false,
            status: 2,
            data: null,
            message: "Your connection was interrupted",
          };
        } else if (error.response.status === 401) {
          if (apiObject.type === "RENEW_TOKEN") {
            result = await {
              success: false,
              status: 2,
              message: "Your session expired! Please login again..",
              data: null,
            };
          } else if (apiObject.type === "AUTH") {
            result = await {
              success: false,
              status: 0,
              data: null,
              message: error.response.data.message,
            };
          } else {
            result = await renewTokenHandler(apiObject);
          }
        } else if (error.response.status === 403) {
          result = await {
            success: false,
            status: 2,
            data: null,
            message: "Access is denied.",
          };
        } else if (error.response.status === 417) {
          result = await {
            success: false,
            status: 2,
            data: null,
            message: "Oops! Something went wrong.",
          };
        } else if (error.response.data !== undefined) {
          result = await {
            success: false,
            status: 0,
            data: null,
            message: error.response.data.errorContent
              ? error.response.data.errorContent
              : "Sorry, something went wrong",
          };
        } else {
          result = await {
            success: false,
            status: 2,
            data: null,
            message: "Sorry, something went wrong.",
          };
        }
      } else {
        result = await {
          success: false,
          status: 2,
          data: null,
          message: "Your connection was interrupted!",
        };
      }
    });

  return result;
}


export const renewTokenHandler = async (apiObject) => {
  let result;
  // renew token - start
  const obj = {
    refresh_token: localStorage.getItem(constant.REFRESH_TOKEN),
    grant_type: "refresh_token",
  };
  await AuthService.renewToken(qs.stringify(obj)).then(async (response) => {
    if (response.access_token) {
      localStorage.setItem(constant.ACCESS_TOKEN, response.access_token);
      localStorage.setItem(constant.REFRESH_TOKEN, response.refresh_token);
      result = await callApi(apiObject);
    } else {
      result = await response;
      errorSweetAlert(response.message, "", "Login", () => {
        Cookies.remove(constant.ACCESS_TOKEN);
        Cookies.remove(constant.REFRESH_TOKEN);
        window.location = `${constant.ROUTE_LOGIN}`;
      });
    }
  });
  // renew token - end
  return result;
};
export default { callApi };
