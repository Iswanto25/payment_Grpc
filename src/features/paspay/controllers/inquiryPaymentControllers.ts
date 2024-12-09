import { Request, Response } from "express";
import { inquiryPaymentServices } from "../services/inquiryPaymentServices";
import { generateSignature } from "../../../utils/signature";

export const createInquiryController = async (req: Request, res: Response) => {
    try {
        const dataSignature = {
            payment_method: "debit",
            merchant_id: "bot50004",
            password: "wiEuq8c7",
            bill_no: req.body.bill_no,
            bill_total: req.body.bill_total,
        };
        const signature = generateSignature(dataSignature);
        const dataRequest = {
            request: req.body.request,
            trx_id: req.body.trx_id,
            merchant_id : req.body.merchant_id,
            bill_no: req.body.bill_no,
            signature,
        };
        console.log("Data Request:", dataRequest);
        const response = await inquiryPaymentServices(dataRequest);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(400).json(error);
    }
};