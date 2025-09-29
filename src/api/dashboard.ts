
import api from "./axios";


export const getTradeSignals = async () => {
    const res = await api.get('/trading-signals?limit=50');
    return res;
}


export const getBalance = async () => {
    const res = await api.get('/balance-pnl/');
    return res;
}


export const getTrades = async (from?: string, to?: string) => {
    const res = await api.get(`/trades/?from=${from}&to=${to}`);
    return res;
}

export const postDryRun = async (status: boolean) => {
    const res = await api.patch('/users/dry-run/',
        {
            "dry_run": status
        }
    );
    return res;
}

export const getDryRun = async () => {
    const res = await api.get('/users/dry-run/');
    return res;
}



export const getHotCoins = async (hrs: string) => {
    const res = await api.get(`/hotcoins/?tf=${hrs}`);
    return res;
}
