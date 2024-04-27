import ApiService from "./api-service";

export async function adminLogin(obj) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = false;
  apiObject.endpoint = "token";
  apiObject.basePath = "oauth";
  apiObject.urlencoded = true;
  apiObject.type = "AUTH";
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}

export async function userLogin(obj,isAdmin) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = false;
  apiObject.endpoint = "token";
  apiObject.basePath = "v1/oauth";
  apiObject.urlencoded = true;
  apiObject.type = "AUTH";
  apiObject.isAdmin = isAdmin;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}

export async function userRegister(obj) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = false;
  apiObject.endpoint = "public-user/signup";
  apiObject.type = "AUTH";
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}

export async function verifyAccount(token) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = false;
  apiObject.endpoint = `public-user/account/verify?token=${token}`;
  return await ApiService.callApi(apiObject);
}

export async function forgotPassword(email) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = false;
  apiObject.endpoint = `public-user/account/forgot-password?email=${email}`;
  return await ApiService.callApi(apiObject);
}

export async function checkUserTokenForResetPassword(obj) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = false;
  apiObject.endpoint = `public-user/password-reset/token/verify`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}

export async function resetUserPassword(obj) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = false;
  apiObject.endpoint = `public-user/account/reset-password`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}


async function renewToken(token) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = false;
  apiObject.endpoint = "token";
  apiObject.body = token;
  apiObject.urlencoded = true;
  apiObject.basePath = "oauth";
  apiObject.type = "RENEW_TOKEN";
  return await ApiService.callApi(apiObject);
}
export async function changeAdminPassword(obj) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = true;
  apiObject.endpoint = "user/change-password";
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}

export default { renewToken };
