import ApiService from "@src/services/api-service";
export async function addTeaLeaves(obj) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = true;
  apiObject.endpoint = "admin/farmer-stocks";
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}
export async function updateTeaLeaves(id,obj) {
  const apiObject = {};
  apiObject.method = "PUT";
  apiObject.authentication = true;
  apiObject.endpoint = `admin/farmer-stocks/${id}`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}
export async function deleteTeaLeaves(id) {
  const apiObject = {};
  apiObject.method = "DELETE";
  apiObject.authentication = true;
  apiObject.endpoint = `admin/farmer-stocks/${id}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}

export async function getAllTeaLeavesRecords(keyword,page,startDate,endDate) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = true;
  apiObject.endpoint = `admin/farmer-stocks?keyword=${keyword}&page=${page}&size=10&fromDate=${startDate}&toDate=${endDate}`;
  return await ApiService.callApi(apiObject);
}