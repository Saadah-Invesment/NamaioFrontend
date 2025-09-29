import api from "./axios";

export const getMonthlyReports = async () => {
    const res = await api.get('/reports/history/');
    return res;
}


export const getSummaryReports = async () => {
    const res = await api.get('/reports/summary/');
    return res;
}



export const trigerPay = async (month:string) => {
    const res = await api.post(`/reports/pay/${month}/`);
    return res;
}