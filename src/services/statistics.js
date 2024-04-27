import ApiService from "@src/services/api-service";



export async function getMedicalTests() {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = true;
  apiObject.endpoint = "user/medical-test";
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

