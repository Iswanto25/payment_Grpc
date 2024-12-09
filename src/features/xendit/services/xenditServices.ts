import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
import { xenditClientCreatePayment } from "../../../config/xenditConfig";

const urlCreatePayment = process.env.XENDIT_API_URL_CREATE_PAYMENT;
const secretKey = process.env.XENDIT_API_KEY;
const credentials = Buffer.from(`${secretKey}`).toString('base64');
console.log(credentials);

export const createInvoiceService = async (data: any): Promise<any> => {
    try {
        const response = await xenditClientCreatePayment.post('/v2/invoices', data);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating invoice: ${error}`);
    }
}

export const createVirtualAccountService = async (data: any): Promise<any> => {
    try {
        console.log('Data: ', data);
        const response = await axios.post(`${urlCreatePayment}/callback_virtual_accounts`, data, {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error creating xendit virtual account: ${error}`);
    }
};

// export const createVirtualAccountService = async (data: any): Promise<any> => {
//     try {
//         const request = {
//             external_id: "va-external-id-123",
//             bank_code: "MANDIRI",
//             name: "Rika Sutanto",
//         };
//         const response = await xenditClientCreatePayment.post('/callback_virtual_accounts', request);
//         console.log('Response: ', response.data);
//         return response.data;
//     } catch (error) {
//         throw new Error(`Error creating virtual account: ${error}`);
//     }
// }

export const createQrCodeService = async (data: any): Promise<any> => {
    try {
        const response = await xenditClientCreatePayment.post('/qr_codes', data);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating QR code: ${error}`);
    }
}

export const createEwalletService = async (data: any): Promise<any> => {
    try {
        const response = await xenditClientCreatePayment.post('/ewallets/charges', data);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating e-wallet: ${error}`);
    }
}

export const createRetailOutletService = async (data: any): Promise<any> => {
    try {
        const response = await xenditClientCreatePayment.post('/fixed_payment_code', data);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating retail outlet: ${error}`);
    }
}