import * as grpc from '@grpc/grpc-js';
import { createXenditVirtualAccountControllers } from '../../../xendit/controllers/xenditVAControllers';
import { createVirtualAccountControllers } from '../../../midtrans/controllers/midtransVAControllers';
import { PaymentVARequest, PaymentVAResponse } from '../../../../generated/xendit';

export const createVirtualAccount = async (
    call: grpc.ServerUnaryCall<PaymentVARequest, PaymentVAResponse>,
    callback: grpc.sendUnaryData<PaymentVAResponse>
) => {
    try {
        const request = call.request;
        if (request.providerType === "XENDIT") {
            console.log('XENDIT');
            await createXenditVirtualAccountControllers(call, callback);
        }else{
            console.log('MIDTRANS');
            await createVirtualAccountControllers(call, callback);
        }
    } catch (error) {
        console.error('Error processing virtual account:', error);
        callback({
            code: grpc.status.INTERNAL,
            details: 'Internal server error'
        }, null);
    }
};
