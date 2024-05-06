import ApiService from "@src/services/api-service";



export async function getStatistics() {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = true;
  apiObject.endpoint = "admin/statistics";
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}

export async function getVariables() {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = true;
  apiObject.endpoint = "application/system-variable";
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
export async function changePrices(obj) {
  const apiObject = {};
  apiObject.method = "PUT";
  apiObject.authentication = true;
  apiObject.endpoint = "admin/system-variable";
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}

