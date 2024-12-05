import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';
const PROTO_PATH = path.join(__dirname, '..', 'proto', 'xendit.proto');
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

import { errorResponse } from "../utils/responses";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const grpcObject = grpc.loadPackageDefinition(packageDefinition) as any;
const payment = grpcObject.payment;
const client = new payment.paymentService('localhost:50051', grpc.credentials.createInsecure());
export { client, grpcObject };


const urlCreateInvoice = process.env.XENDIT_API_URL_CREATE_PAYMENT_INVOICE;
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

export const xenditClientCreateInvoice = axios.create({
    baseURL: urlCreateInvoice,
    headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application'
    }
});

export const createInvoice = async (data: any) => {
    try {
        const response = await axios.post(`${urlCreateInvoice}/invoices`, data, {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application'
            }
        });
        if (response.status === 200) {
            console.log(response.data);
            return response.data;
        }
        return errorResponse('Error creating invoice', response.data, 403);
    } catch (error) {
        return errorResponse('Error creating invoice', error, 500);
    }   
};