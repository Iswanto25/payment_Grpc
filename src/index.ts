import * as grpc from '@grpc/grpc-js';
import express, {Request, Response} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from 'dotenv';
dotenv.config();
import { client, grpcObject } from "./config/config";
import { createInvoicesRoutes } from './routes/createPaymentsRoutes';
import paymentRoutes from "./routes/createPaymentsRoutes";

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use('/api/faspay', paymentRoutes);
const server = new grpc.Server({
    'grpc.max_send_message_length': 10 * 1024 * 1024, // 10 MB
    'grpc.max_receive_message_length': 10 * 1024 * 1024, // 10 MB
});

createInvoicesRoutes(server);

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('Gagal menjalankan server:', err);
        return;
    }
    console.log(`Server gRPC berjalan di port ${port}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
