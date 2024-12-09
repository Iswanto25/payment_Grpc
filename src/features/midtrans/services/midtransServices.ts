import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const midtranstUrlCreatePayment = process.env.MIDTRANS_BASE_URL;
const midtransSecretKey = process.env.MIDTRANS_CLIENT_KEY;
const midtransServerKey = process.env.MIDTRANS_SERVER_KEY;
const midtransCredentials = Buffer.from(`${midtransServerKey}`).toString('base64');

export const createSnapService = async (data: any): Promise<any> => {
    try {
        return await axios.post(`${midtranstUrlCreatePayment}/snap/v1/transactions`, data, {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': `Basic ${midtransCredentials}`
            }
        });
    } catch (error) {
        throw new Error(`Error creating snap: ${error}`);
    }
};

export const createVAPaymentService = async (data: any): Promise<any> => {
    try {
        console.log('Data: ', data);
        const response = await axios.post(`${midtranstUrlCreatePayment}/v2/charge`, data, {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': `Basic ${midtransCredentials}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error creating Midtrans virtual account: ${error}`);
    }
};
