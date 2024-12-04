import * as grpc from '@grpc/grpc-js';
import { createInvoiceControllers } from '../controllers/invoicesControllers';
import { grpcObject } from '../config/xenditConfig'; // Memastikan gRPC Object dimuat

export const createInvoicesRoutes = (server: grpc.Server) => {
    console.log('Menambahkan route CreateInvoice');
    server.addService(grpcObject.xendit.paymentService.service, {
        CreateInvoice: createInvoiceControllers,
    });
};
