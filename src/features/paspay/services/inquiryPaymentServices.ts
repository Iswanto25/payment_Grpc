import axios from "axios";
import { createCorePayments, createSnapPayments } from "../../../config/fastPayConfig";
import { RequestBodyCreateInquiryPayment } from "../../../types/requestBody";

export const inquiryPaymentServices = async (data: RequestBodyCreateInquiryPayment) => {
    try {
        console.log("Data Request:", data);
        const response = await createCorePayments.post('/cvr/100004/10', data);
        console.log("Response Data:", response.data);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};