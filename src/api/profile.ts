
import { refreshtoken } from "./auth";
import api from "./axios";


export const getProfile = async () => {
    const res = await api.get('/users/profiles/');
    return res;
}

export const getaffiliateStatus = async () => {
    const res = await api.get('/users/affiliate/status');
    return res;
}


export const updatePlanapi = async (plan: String) => {
    const res = await api.post('/billing/checkout/', {
        plan
    });

    return res;
}


export const updatefreeplan = async (plan: String) => {
    const res = await api.post('/profiles/start-trial/', {
        plan
    });
    if (res.status === 200) {
        await refreshtoken()
    }
    return res;
}


export const cancelPlan = async (plan: String) => {
    const res = await api.post('/profiles/cancel-plan/');

    return res;
}



export const changePassword = async (payload: any) => {
    const res = await api.post('/users/change-password/', payload);

    return res;
}

