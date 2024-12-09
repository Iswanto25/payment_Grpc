import * as grpc from '@grpc/grpc-js';
import { xenditHandlerError } from "../utils/responses";
import { createRetailOutletService } from '../features/xendit/services/xenditServices';
import { successResponse } from '../utils/responses';
import { CreateRetailOutletRequest, CreateRetailOutletResponse } from '../generated/xendit';

export const createOutletControllers = async (
    call: grpc.ServerUnaryCall<CreateRetailOutletRequest, CreateRetailOutletResponse>,
    callback: grpc.sendUnaryData<CreateRetailOutletResponse>
) => {
    try {
        const request = call.request;
        console.log(request);
        const response = await createRetailOutletService(request);
        const result: CreateRetailOutletResponse = {
            id: response.data.id,
            externalId: response.data.external_id,
            name: response.data.name,
            retailOutletName: response.data.retail_outlet_name,
            expectedAmount: response.data.expected_amount,
            paymentCode: response.data.payment_code,
            status: response.data.status,
        };
        const data = successResponse('Retail Outlet created successfully', result, grpc.status.OK);
        console.log(data);
        callback(null, result);
    } catch (error) {
        callback({ code: grpc.status.INTERNAL,
            message: xenditHandlerError(error)}, null);;
    }
};
