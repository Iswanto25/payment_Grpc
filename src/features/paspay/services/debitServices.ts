import axios from "axios";
import { createCorePayments, createSnapPayments } from "../../../config/fastPayConfig";
import { RequestBodyCreatePayment } from "../../../types/requestBody";

export const createCoreServices = async (data: RequestBodyCreatePayment) => {
    try {
        console.log("Data Request:", data);
        const response = await createCorePayments.post('/cvr/300011/10', data);
        console.log("Response Data:", response.data);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};