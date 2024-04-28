import ApiService from "@src/services/api-service";
export async function createOrder(obj) {
    const apiObject = {};
    apiObject.method = "POST";
    apiObject.authentication = true;
    apiObject.endpoint = "admin/order";
    apiObject.body = obj;
    return await ApiService.callApi(apiObject);
}

export async function deleteOrder(id) {
    const apiObject = {};
    apiObject.method = "DELETE";
    apiObject.authentication = true;
    apiObject.endpoint = `admin/order/${id}`;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}
export async function getAllOrders(keyword,page,formDate,toDate) {
    const apiObject = {};
    apiObject.method = "GET";
    apiObject.authentication = true;
    apiObject.endpoint = `admin/order?keyword=${keyword}&page=${page}&size=10&fromDate=${formDate}&toDate=${toDate}`;
    return await ApiService.callApi(apiObject);
}