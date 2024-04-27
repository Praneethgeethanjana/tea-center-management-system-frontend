
import ApiService from "@src/services/api-service";

export async function createFarmer(obj) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = true;
  apiObject.endpoint = "admin/farmer/account";
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}

export async function updateFarmer(id,obj) {
  const apiObject = {};
  apiObject.method = "PUT";
  apiObject.authentication = true;
  apiObject.endpoint = `admin/farmer/${id}/account`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}
export async function getFarmers(keyword,page) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = true;
  apiObject.endpoint = `admin/farmer/user-list?keyword=${keyword}&page=${page}&size=10`;
  return await ApiService.callApi(apiObject);
}

export async function getAllFarmers() {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = true;
  apiObject.endpoint = `admin/farmer/user-list?keyword=&page=0&size=500`;
  return await ApiService.callApi(apiObject);
}