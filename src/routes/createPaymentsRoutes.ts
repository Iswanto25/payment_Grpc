import express from "express";
import * as grpc from '@grpc/grpc-js';
import { createInvoiceControllers } from '../features/agregation/xendit-midtrans/controllers/invoicesControllers';
import { createOpenVirtualAccountControllers } from '../features/agregation/xendit-midtrans/controllers/virtualAccountControllers';
import { createQrCodeController } from '../features/agregation/xendit-midtrans/controllers/qrCodeControllers';
import { createOutletControllers } from '../features/agregation/xendit-midtrans/controllers/outletControllers';
import { createEwalletChargeControllers } from '../features/agregation/xendit-midtrans/controllers/ewalletChargeControllers';
import { createVirtualAccount } from '../features/agregation/xendit-midtrans/controllers/paymentVAControllers';
import { grpcObject } from '../config/config';

import { createSnapController } from "../features/paspay/controllers/snapControllers";
import { createCoreController } from "../features/paspay/controllers/coreControllers";
import { createInquiryController } from "../features/paspay/controllers/inquiryPaymentControllers";
import { createNotificationController } from "../features/paspay/controllers/notificationControllers";

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

const router = express.Router();

router.post('/create/notification', createNotificationController);
router.post('/create/inquiry', createInquiryController);
router.post('/create/core', createCoreController);
router.post('/create/snap', createSnapController);

export default router;
