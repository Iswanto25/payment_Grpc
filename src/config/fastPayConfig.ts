import axios from "axios";

const snapBaseUrl = process.env.BASE_URL_SNAP;
const coreBaseUrl = process.env.BASE_URL_DEVELOPMENT;
const sendmeBaseUrl = process.env.BASE_URL_SENDME;

export const createSnapPayments = axios.create({
    baseURL: snapBaseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createCorePayments = axios.create({
    baseURL: coreBaseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createSendmePayments = axios.create({
    baseURL: sendmeBaseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});
