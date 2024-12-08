import * as grpc from '@grpc/grpc-js';
import { PaymentVARequest, PaymentVAResponse } from '../../../generated/xendit';
import { createVirtualAccountService } from "../services/xenditServices";

export const createVirtualAccountControllers = async (call: grpc.ServerUnaryCall<PaymentVARequest, PaymentVAResponse>, callback: grpc.sendUnaryData<PaymentVAResponse>) => {
    try {
        const request = call.request;
        const dataRequest = {
            external_id : request.externalId,
            bank_code : request.bankCode,
            name : request.name,
            // amount : request.amount
        }
        const response = await createVirtualAccountService(dataRequest);
        const dataRespons: PaymentVAResponse = {
            id: response.id, // provide appropriate value
            providerType: '', // provide appropriate value
            externalId: request.externalId,
            accountNumber: '', // provide appropriate value
            bankCode: request.bankCode,
            name: request.name,
            status: '', // provide appropriate value
            amount: request.amount
        }
        // console.log('Virtual account created:', dataRespons);
        callback(null, dataRespons);
    } catch (error) {
        callback({ code: grpc.status.INTERNAL }, null);
    }
}