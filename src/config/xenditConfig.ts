import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const urlCreatePayment = process.env.XENDIT_API_URL_CREATE_PAYMENT;
const secretKey = process.env.XENDIT_API_KEY;
const credentials = Buffer.from(`${secretKey}`).toString('base64');
console.log(credentials);

export const xenditClientCreatePayment = axios.create({
    baseURL: urlCreatePayment,
    headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application'
    }
});
