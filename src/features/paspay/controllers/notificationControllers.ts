import { Request, Response } from "express";
import { inquiryPaymentServices } from "../services/notificationServices";
import { callbackSignature } from "../../../utils/signature";

export const createNotificationController = async (req: Request, res: Response) => {
    try {
        const paymentData = req.body;
        const dataSignature = {
            payment_method: "debit",
            merchant_id: "bot50004",
            password: "wiEuq8c7",
            bill_no: paymentData.bill_no,
            bill_total: paymentData.payment_total,
            status_code: paymentData.payment_status_code,
        };
        const signature = callbackSignature(dataSignature);
        const dataRequest = {
            request: "callback notification",
            trx_id: paymentData.trx_id,
            merchant_id: "31835",
            // merchant: paymentData.merchant,
            bill_no: paymentData.bill_no,
            payment_reff: paymentData.payment_reff,
            payment_date: paymentData.payment_date,
            payment_status_code: paymentData.payment_status_code,
            payment_status_desc: paymentData.payment_status_desc,
            // bill_total: paymentData.bill_total,
            payment_total: paymentData.payment_total,
            // payment_channel_uid: paymentData.payment_channel_uid,
            // payment_channel: paymentData.payment_channel,
            signature,
        };
        const response = await inquiryPaymentServices(dataRequest);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(400).json(error);
    }
};