import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const urlCreatePayment = process.env.MIDTRANS_BASE_URL;
const secretKey = process.env.MIDTRANS_SERVER_KEY;
const credentials = Buffer.from(`${secretKey}`).toString('base64');
console.log(credentials);

export const midtransClientCreatePayment = axios.create({
    baseURL: urlCreatePayment,
    headers: {
        'Authorization': `Basic ${credentials}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});
