import axios from "axios";
import { createSnapPayments, createCorePayments, createSendmePayments } from "../../../config/fastPayConfig";
import { RequestBodyCreatePayment } from "../../../types/requestBody";

// export const createVirtualAccount = async (data: RequestBodyCreatePayment) => {
//     const response = await axios.post('https://debit-sandbox.faspay.co.id/cvr/300011/10', data, {
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     });
//     return response.data;
// };

export const createSnapServices = async (data: RequestBodyCreatePayment) => {
    try {
        console.log("Data Request:", data);
        const response = await createSnapPayments.post('/v4/post', data);
        console.log("Response Data:", response.data);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const getTokensDisbursmentServices = async (data: RequestBodyCreatePayment) => {
    try {
        console.log("Data Request:", data);
        const response = await createCorePayments.get('/account/api/tokens');
        console.log("Response Data:", response.data);
    } catch (error: any) {
        return error.response.data;
    }
};

export const createDisbursmentServices = async (data: RequestBodyCreatePayment) => {
    try {
        console.log("Data Request:", data);
        const response = await createSendmePayments.post('/account/api/register', data);
        console.log("Response Data:", response.data);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};


export const confirmDisbursmentServices = async (data: RequestBodyCreatePayment) => {
    try {
        console.log("Data Request:", data);
        const response = await createSendmePayments.post('/account/api/register/confirm', data);
        console.log("Response Data:", response.data);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};