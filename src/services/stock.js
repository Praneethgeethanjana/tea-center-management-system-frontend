import ApiService from "@src/services/api-service";
export async function addStock(obj) {
    const apiObject = {};
    apiObject.method = "POST";
    apiObject.authentication = true;
    apiObject.endpoint = "admin/stock";
    apiObject.body = obj;
    return await ApiService.callApi(apiObject);
}
export async function updateStock(id,obj) {
    const apiObject = {};
    apiObject.method = "PUT";
    apiObject.authentication = true;
    apiObject.endpoint = `admin/stock/${id}`;
    apiObject.body = obj;
    return await ApiService.callApi(apiObject);
}
export async function deleteStock(id) {
    const apiObject = {};
    apiObject.method = "DELETE";
    apiObject.authentication = true;
    apiObject.endpoint = `admin/stock/${id}`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}

export async function getAllStockDetails(keyword,page,stockType) {
    const apiObject = {};
    apiObject.method = "GET";
    apiObject.authentication = true;
    apiObject.endpoint = `admin/stock?keyword=${keyword}&page=${page}&stockType=${stockType}`;
    return await ApiService.callApi(apiObject);
}