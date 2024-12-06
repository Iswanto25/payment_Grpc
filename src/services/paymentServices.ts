import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

import { createXenditRequest } from "../types/paymentBody";

const xenditUrlCreatePayment = process.env.XENDIT_API_URL_CREATE_PAYMENT;
const secretXenditKey = process.env.XENDIT_API_KEY;
const xenditCredentials = Buffer.from(`${secretXenditKey}`).toString('base64');

export const createInvoiceService = async (data: any): Promise<any> => {
    try {
        return await axios.post(`${xenditUrlCreatePayment}/v2/invoices`, data, {
            headers: {
                'Authorization': `Basic ${xenditCredentials}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        throw new Error(`Error creating invoice: ${error}`);
    }
};

export const createVirtualAccountService = async (data: any): Promise<any> => {
    try {
        const result = await axios.post(`${xenditUrlCreatePayment}/callback_virtual_accounts`, data, {
            headers: {
                'Authorization': `Basic ${xenditCredentials}`,
                'Content-Type': 'application/json'
            }
        });
        return result;
    } catch (error) {
        throw new Error(`Error creating virtual account: ${error}`);
    }
};

export const createQrCodeService = async (data: any): Promise<any> => {
    try {
        return await axios.post(`${xenditUrlCreatePayment}/qr_codes`, data, {
            headers: {
                'Authorization': `Basic ${xenditCredentials}`,
                'api-version': '2022-07-31',
                'Content-Type': 'application/json'
            },
        });
    } catch (error) {
        throw new Error(`Error creating QR code: ${error}`);
    }
};

export const createEwalletService = async (data: any): Promise<any> => {
    try {
        return await axios.post(`${xenditUrlCreatePayment}/ewallets/charges`, data, {
            headers: {
                'Authorization': `Basic ${xenditCredentials}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        throw new Error(`Error creating e-wallet: ${error}`);
    }
};

export const createRetailOutletService = async (data: any): Promise<any> => {
    try {
        return await axios.post(`${xenditUrlCreatePayment}/fixed_payment_code`, data, {
            headers: {
                'Authorization': `Basic ${xenditCredentials}`,
                'Content-Type': 'application/json'
            },
        });
    } catch (error) {
        throw new Error(`Error creating retail outlet: ${error}`);
    }
};