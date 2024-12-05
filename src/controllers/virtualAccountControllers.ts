import * as grpc from '@grpc/grpc-js';
import { xenditHandlerError } from "../utils/responses";
import { createVirtualAccountService } from '../services/paymentServices';
import { successResponse } from '../utils/responses';
import { CreateVirtualAccountRequest, VirtualAccountResponse } from '../generated/xendit';

export const createOpenVirtualAccountControllers = async (
    call: grpc.ServerUnaryCall<CreateVirtualAccountRequest, VirtualAccountResponse>,
    callback: grpc.sendUnaryData<VirtualAccountResponse>) => {
        try {
            const request = call.request;
            const response = await createVirtualAccountService(request);
            console.log(response);
            const result: VirtualAccountResponse = {
                id: response.id,
                externalId: response.external_id,
                name: response.name,
                bankCode: response.bank_code,
                accountNumber: response.account_number,
                status: response.status,
            };
            const data = successResponse('Virtual account created successfully', result, grpc.status.OK);
            console.log(data);
            callback(null, result);
        } catch (error) {
            callback({ code: grpc.status.INTERNAL,
                message: xenditHandlerError(error)}, null);
        }
};