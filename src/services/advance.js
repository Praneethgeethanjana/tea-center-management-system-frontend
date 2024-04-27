import ApiService from "@src/services/api-service";
export async function createAdvance(obj) {
    const apiObject = {};
    apiObject.method = "POST";
    apiObject.authentication = true;
    apiObject.endpoint = "admin/advance";
    apiObject.body = obj;
    return await ApiService.callApi(apiObject);
}
export async function updateAdvance(id,obj) {
    const apiObject = {};
    apiObject.method = "PUT";
    apiObject.authentication = true;
    apiObject.endpoint = `admin/advance/${id}`;
    apiObject.body = obj;
    return await ApiService.callApi(apiObject);
}
export async function deleteAdvance(id) {
    const apiObject = {};
    apiObject.method = "DELETE";
    apiObject.authentication = true;
    apiObject.endpoint = `admin/advance/${id}`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}

export async function getAllAdvanceDetails(keyword,page,startDate,endDate) {
    const apiObject = {};
    apiObject.method = "GET";
    apiObject.authentication = true;
    apiObject.endpoint = `admin/advance?keyword=${keyword}&page=${page}&size=10&fromDate=${startDate}&toDate=${endDate}`;
    return await ApiService.callApi(apiObject);
}