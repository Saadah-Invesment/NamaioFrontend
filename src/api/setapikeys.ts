import api from "./axios";


export const getbinanceKeys = async () => {
    const res = await api.get('/users/binance-keys/');
    return res;
}


export const postbinanceKeys = async (payload: any) => {
    const res = await api.post('/users/binance-keys/', payload);
    return res;
}

export const puttbinanceKeys = async (payload: any) => {
    const res = await api.put('/users/binance-keys/', payload);
    return res;
}

export const testConnections = async (payload: any) => {
    const res = await api.post('/users/test-binance-api/', payload);
    return res;
}

export const testConnectionsokx = async (payload: any) => {
    const res = await api.post('/users/test-okx-api/', payload);
    return res;
}

/////excahnge
export const getExchangeKeys = async () => {
    const res = await api.get('/users/exchange-keys/active/');
    return res;
}

export const postExchangeKeys = async (payload: any) => {
    const res = await api.post('/users/exchange-keys/', payload);
    return res;
}


export const patchActivateBot = async (id: any, payload: any) => {
    const res = await api.patch(`/users/exchange-keys/${id}/`, payload);
    return res;
}

export const patchusePlatform = async (payload: any) => {
    const res = await api.patch(`/users/profiles/me/`, payload);
    return res;
}

