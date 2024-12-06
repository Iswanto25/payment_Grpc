import * as grpc from '@grpc/grpc-js';
import { createInvoiceControllers } from '../controllers/invoicesControllers';
import { createOpenVirtualAccountControllers } from '../controllers/virtualAccountControllers';
import { createQrCodeController } from '../controllers/qrCodeControllers';
import { createOutletControllers } from '../controllers/outletControllers';
import { createEwalletChargeControllers } from '../controllers/ewalletChargeControllers';
import { createVirtualAccount } from '../controllers/paymentVAControllers';
import { grpcObject } from '../config/xenditConfig';

export const createInvoicesRoutes = (server: grpc.Server) => {
    console.log('Menambahkan route CreateInvoice');
    server.addService(grpcObject.payment.paymentService.service, {
        CreateInvoice: createInvoiceControllers,
        createVirtualAccount: createOpenVirtualAccountControllers,
        CreateQrCodes: createQrCodeController,
        CreateRetailOutlet: createOutletControllers,
        CreateEwallet: createEwalletChargeControllers,
        CreateVAPayment: createVirtualAccount,
    });
};
