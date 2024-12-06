import * as grpc from '@grpc/grpc-js';
import { createVirtualAccountService } from '../services/paymentServices';
import { createVAPaymentService } from '../services/midtransPaymentServices';
import { successResponse } from '../utils/responses';
import { createXenditRequest } from "../types/paymentBody";
import { PaymentVARequest, PaymentVAResponse } from '../generated/xendit';

export const createVirtualAccount = async (call: grpc.ServerUnaryCall<PaymentVARequest, PaymentVAResponse>, callback: grpc.sendUnaryData<PaymentVAResponse>) => {
    try {
        const request = call.request;
        if (request.providerType === 'XENDIT') {
            console.log("XENDIT");
            const dataRequest = {
                external_id: request.externalId,
                bank_code: request.bankCode,
                name: request.name,
            }
            console.log(dataRequest);
            const response = await createVirtualAccountService(dataRequest);
            const result: PaymentVAResponse = {
                id: response.data.id,
                providerType: request.providerType,
                externalId: response.data.external_id,
                name: "",
                bankCode: response.data.bank_code,
                accountNumber: response.data.account_number,
                amount: response.data.amount,
                status: response.data.status,
            };
            callback(null, result);
        } if (request.providerType === 'MIDTRANS') {
            console.log("MIDTRANS");
            const response = await createVAPaymentService(request);
            console.log(response.data);
            const result: PaymentVAResponse = {
                id: response.data.id,
                providerType: response.provider_type,
                externalId: response.data.transaction_id,
                name: response.name,
                bankCode: response.bank_code,
                accountNumber: response.account_number,
                amount: response.amount,
                status: response.status,
            };
            callback(null, result);
        }
    } catch (error) {
        callback({ code: grpc.status.INTERNAL }, null);
    }
}
