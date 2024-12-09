import * as grpc from '@grpc/grpc-js';
import { PaymentVARequest, PaymentVAResponse } from '../../../generated/xendit';
import { createVAPaymentService } from "../services/midtransServices";

export const createVirtualAccountControllers = async (call: grpc.ServerUnaryCall<PaymentVARequest, PaymentVAResponse>, callback: grpc.sendUnaryData<PaymentVAResponse>) => {
    try {
        const request = call.request;
        const dataRequest = {
            payment_type: "bank_transfer",
            transaction_details: {
                order_id: request.externalId,
                gross_amount: request.amount,
            },
            bank_transfer: {
                bank: request.bankCode,
            },
        };
        const response = await createVAPaymentService(dataRequest);
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
};