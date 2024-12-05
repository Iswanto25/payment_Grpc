import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
const urlCreatePayment = process.env.XENDIT_API_URL_CREATE_PAYMENT;
const secretKey = process.env.XENDIT_API_KEY;
const credentials = Buffer.from(`${secretKey}`).toString('base64');

export const createInvoiceService = async (data: any): Promise<any> => {
    try {
        return await axios.post(`${urlCreatePayment}/v2/invoices`, data, {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        throw new Error(`Error creating invoice: ${error}`);
    }
};

export const createVirtualAccountService = async (data: any): Promise<any> => {
    try {
        const result = await axios.post(`${urlCreatePayment}/callback_virtual_accounts`, data, {
            headers: {
                'Authorization': `Basic ${credentials}`,
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
        return await axios.post(`${urlCreatePayment}/qr_codes`, data, {
            headers: {
                'Authorization': `Basic ${credentials}`,
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
        return await axios.post(`${urlCreatePayment}/ewallets/charges`, data, {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        throw new Error(`Error creating e-wallet: ${error}`);
    }
};

export const createRetailOutletService = async (data: any): Promise<any> => {
    try {
        return await axios.post(`${urlCreatePayment}/fixed_payment_code`, data, {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            },
        });
    } catch (error) {
        throw new Error(`Error creating retail outlet: ${error}`);
    }
};