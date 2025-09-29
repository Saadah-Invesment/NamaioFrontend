import api from "./axios";


export const getaffiliatesDashboard = async () => {
    const res = await api.get('/users/affiliates/dashboard');
    return res;
}

export const getreferedUsersList = async () => {
    const res = await api.get('/users/affiliates/referrals');
    return res;
}
