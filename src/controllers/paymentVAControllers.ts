import * as grpc from '@grpc/grpc-js';
import { createVirtualAccountControllers } from '../features/xendit/controllers/xenditVAControllers';
// import {  } from '../features/midtrans/controllers/midtransVAControllers';
import { createVAPaymentService } from '../features/midtrans/services/midtransServices';
import { PaymentVARequest, PaymentVAResponse } from '../generated/xendit';

export const createVirtualAccount = async (
    call: grpc.ServerUnaryCall<PaymentVARequest, PaymentVAResponse>,
    callback: grpc.sendUnaryData<PaymentVAResponse>
) => {
    try {
        const request = call.request;
        if (request.providerType === "XENDIT") {
            // console.log('XENDIT');
            const response = await createVirtualAccountControllers(call, callback);
            // console.log('response', response);
        }
        const response = await createVAPaymentService(request);
    } catch (error) {
        console.error('Error processing virtual account:', error);
        callback({
            code: grpc.status.INTERNAL,
            details: 'Internal server error'
        }, null);
    }
};
