import crypto from "crypto";
import { RequestBodySignature } from "../types/requestBody";

export const generateSignature = (requestBody: RequestBodySignature) => {
    try {
        const data = {
            paymentMethod : requestBody.payment_method,
            merchant_id: requestBody.merchant_id,
            password: requestBody.password,
            billNo: requestBody.bill_no,
            bill_total: requestBody.bill_total,
        };
        if (data.paymentMethod === "debit") {
            const stringData = `${data.merchant_id}${data.password}${data.billNo}`;
            console.log("String Data:", stringData);
            const md5Hash = crypto.createHash('md5').update(stringData).digest('hex');
            console.log("MD5 Hash:", md5Hash);
            const signature = crypto.createHash('sha1').update(md5Hash).digest('hex');
            console.log("Signature:", signature);
            return signature;
        }else {
            const stringData = `${data.merchant_id}${data.password}${data.billNo}${data.bill_total}`;
            console.log("String Data:", stringData);
            const md5Hash = crypto.createHash('md5').update(stringData).digest('hex');
            console.log("MD5 Hash:", md5Hash);
            const signature = crypto.createHash('sha1').update(md5Hash).digest('hex');
            console.log("Signature:", signature);
            return signature;         
        }
    } catch (error) {
        console.error("Error generating signature:", error);
        throw error;
    }
};

export const callbackSignature = (requestBody: RequestBodySignature) => {
    try {
        const data = {
            paymentMethod : requestBody.payment_method,
            merchant_id: requestBody.merchant_id,
            password: requestBody.password,
            billNo: requestBody.bill_no,
            statusCode: requestBody.status_code,
        };
            console.log("Data:", data);
            const stringData = `${data.merchant_id}${data.password}${data.billNo}${data.statusCode}`;
            console.log("String Data:", stringData);
            const md5Hash = crypto.createHash('md5').update(stringData).digest('hex');
            console.log("MD5 Hash:", md5Hash);
            const signature = crypto.createHash('sha1').update(md5Hash).digest('hex');
            console.log("Signature:", signature);
            return signature;
    } catch (error) {
        console.error("Error generating signature:", error);
        throw error;
    }
};