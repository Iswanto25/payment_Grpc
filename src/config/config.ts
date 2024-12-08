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
