import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
const urlCreateInvoice = process.env.XENDIT_API_URL_CREATE_PAYMENT_INVOICE;
const secretKey = process.env.XENDIT_API_KEY;
const credentials = Buffer.from(`${secretKey}`).toString('base64');

export const createInvoiceService = async (data: any): Promise<any> => {
    try {
        const response = await axios.post(`${urlCreateInvoice}/invoices`, data, {
            headers: {
                'Authorization': `Basic ${credentials}`,  // Menggunakan Basic Auth
                'Content-Type': 'application/json'  // Mengirimkan data dalam format JSON
            }
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error creating invoice: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Error creating invoice: ${error}`);
    }
};
