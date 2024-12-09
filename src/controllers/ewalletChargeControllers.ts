import * as grpc from '@grpc/grpc-js';
import { xenditHandlerError } from "../utils/responses";
import { createEwalletService } from '../features/xendit/services/xenditServices';
import { successResponse } from '../utils/responses';
import { CreateEwalletRequest, CreateEwalletResponse } from '../generated/xendit';

export const createEwalletChargeControllers = async (
    call: grpc.ServerUnaryCall<CreateEwalletRequest, CreateEwalletResponse>,
    callback: grpc.sendUnaryData<CreateEwalletResponse>
) => {
    try {
        const request = call.request;
        // console.log('Request:', request);
        const response = await createEwalletService(request);
        // console.log('Response:', response.data.id);
        const result: CreateEwalletResponse = {
            id: response.data.id,
            referenceId: response.data.reference_id,
            channelCode: response.data.channel_code,
            captureAmount: response.data.capture_amount,
            chargeAmount: response.data.charge_amount,
            checkoutMethod: response.data.checkout_method,
            callbackUrl: response.data.callback_url,
            channelProperties: response.data.channel_properties,
        };
        const data = successResponse('Ewallet charge created successfully', result, grpc.status.OK);
        console.log(data);
        callback(null, result);
    } catch (error) {
        callback({ code: grpc.status.INTERNAL,
            message: xenditHandlerError(error)}, null);;
    }
};