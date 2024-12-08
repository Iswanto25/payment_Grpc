import * as grpc from '@grpc/grpc-js';
import { createInvoicesRoutes } from './routes/createPaymentsRoutes';

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
