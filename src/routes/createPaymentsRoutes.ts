import * as grpc from '@grpc/grpc-js';
import { createInvoiceControllers } from '../controllers/invoicesControllers';
import { createOpenVirtualAccountControllers } from '../controllers/virtualAccountControllers';
import { createQrCodeController } from '../controllers/qrCodeControllers';
import { grpcObject } from '../config/xenditConfig'; // Memastikan gRPC Object dimuat

export const createInvoicesRoutes = (server: grpc.Server) => {
    console.log('Menambahkan route CreateInvoice');
    server.addService(grpcObject.payment.paymentService.service, {
        CreateInvoice: createInvoiceControllers,
        createVirtualAccount: createOpenVirtualAccountControllers,
        CreateQrCodes: createQrCodeController,
    });
};
