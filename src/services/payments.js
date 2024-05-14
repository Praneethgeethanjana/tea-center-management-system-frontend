import ApiService from "@src/services/api-service";


export async function saveMonthlyPayment(obj) {
    const apiObject = {};
    apiObject.method = "POST";
    apiObject.authentication = true;
    apiObject.endpoint = "admin/locations";
    apiObject.body = obj;
    return await ApiService.callApi(apiObject);
}
export async function getPendingPayments(keyword,page,date) {
    const apiObject = {};
    apiObject.method = "GET";
    apiObject.authentication = true;
    apiObject.endpoint = `admin/report?keyword=${keyword}&page=${page}&size=10&date=${date}`;
    return await ApiService.callApi(apiObject);
}
export async function getPaymentHistory(keyword,page,year,month) {
    const apiObject = {};
    apiObject.method = "GET";
    apiObject.authentication = true;
    apiObject.endpoint = `admin/report/payment-history?keyword=${keyword}&page=${page}&size=10&year=${year}&month=${month}`;
    return await ApiService.callApi(apiObject);
}

export async function getPaymentHistoryForReport(keyword,year,month) {
    const apiObject = {};
    apiObject.method = "GET";
    apiObject.authentication = true;
    apiObject.endpoint = `admin/report/payment-history?keyword=${keyword}&page=0&size=1000&year=${year}&month=${month}`;
    return await ApiService.callApi(apiObject);
}
