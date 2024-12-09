import { Request, Response } from "express";
import { createSnapServices } from "../services/snapServices";
import { generateSignature } from "../../../utils/signature";

export const createSnapController = async (req: Request, res: Response) => {
    try {
        const dataSignature = {
            payment_method: req.body.payment_method,
            merchant_id: "bot50004",
            password: "wiEuq8c7",
            bill_no: req.body.bill_no,
            bill_total: req.body.bill_total,
        };
        const signature = generateSignature(dataSignature);
        const dataRequest = {
            payment_method: req.body.payment_method,
            request: req.body.request,
            merchant_id: "50004",
            merchant: req.body.merchant,
            bill_no: req.body.bill_no,
            bill_date: req.body.bill_date,
            bill_expired: req.body.bill_expired,
            bill_desc: req.body.bill_desc,
            bill_currency: req.body.bill_currency,
            bill_total: req.body.bill_total,
            payment_channel: req.body.payment_channel,
            pay_type: req.body.pay_type,
            cust_no: req.body.cust_no,
            cust_name: req.body.cust_name,
            msisdn: req.body.msisdn,
            email: req.body.email,
            return_url: req.body.return_url,
            terminal: req.body.terminal,
            item: req.body.item.map((it: any) => ({
                product: it.product,
                qty: it.qty,
                amount: it.amount,
                merchant_id: it.merchant_id,
            })),
            signature,
        };
        const response = await createSnapServices(dataRequest);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(400).json(error);
    }
};