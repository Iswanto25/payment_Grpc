import * as grpc from '@grpc/grpc-js';
import { PaymentVARequest, PaymentVAResponse } from '../../../generated/xendit';
import { createVirtualAccountService } from "../services/xenditServices";

export const createXenditVirtualAccountControllers = async (call: grpc.ServerUnaryCall<PaymentVARequest, PaymentVAResponse>, callback: grpc.sendUnaryData<PaymentVAResponse>) => {
    try {
        const request = call.request;
        const dataRequest = {
            external_id: request.externalId,
            bank_code: request.bankCode,
            name: request.name,
        };
        const response = await createVirtualAccountService(dataRequest);
        const dataResponse: PaymentVAResponse = {
            id: response.id,
            externalId: response.external_id,
            name: response.name,
            accountNumber: response.account_number,
            bankCode: response.bank_code,
            amount: request.amount,
            status: response.status,
            providerType: request.providerType,
        };
        callback(null, dataResponse);
    } catch (error) {
        callback({ code: grpc.status.INTERNAL, message: String(error) }, null);
    }
}