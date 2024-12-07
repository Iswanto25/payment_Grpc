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
            console.log(response.data.owner_id);
            const result: VirtualAccountResponse = {
                id: response.data.id,
                externalId: response.data.external_id,
                name: response.data.name,
                bankCode: response.data.bank_code,
                accountNumber: response.data.account_number,
                status: response.data.status,
            };
            // const data = successResponse('Virtual account created successfully', result, grpc.status.OK);
            callback(null, result);
        } catch (error) {
            callback({ code: grpc.status.INTERNAL,
                message: xenditHandlerError(error)}, null);
        }
};