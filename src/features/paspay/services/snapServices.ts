import axios from "axios";
import { createSnapPayments, createCorePayments } from "../../../config/fastPayConfig";
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

