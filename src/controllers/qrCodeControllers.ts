import * as grpc from '@grpc/grpc-js';
import { xenditHandlerError } from "../utils/responses";
import { createQrCodeService } from '../features/xendit/services/xenditServices';
import { successResponse } from '../utils/responses';
import { CreateQrCodesRequest, CreateQrCodesResponse } from '../generated/xendit';

export const createQrCodeController = async (call: grpc.ServerUnaryCall<CreateQrCodesRequest, CreateQrCodesResponse>, callback: grpc.sendUnaryData<CreateQrCodesResponse>): Promise<void> => {
    try {
        const request = call.request;
        const response = await createQrCodeService(request);
        const result: CreateQrCodesResponse = {
            referenceId: response.data.reference_id,
            type: response.data.type,
            channelCode: response.data.channel_code,
            amount: response.data.amount,
            currency: response.data.currency,
            expiresAt: response.data.expires_at,
            qrString: response.data.qr_string,
            status: response.data.status,
        };
        const data = successResponse('QR code created successfully', result, grpc.status.OK);
        console.log(data);
        callback(null, result);
    } catch (error) {
        callback({ code: grpc.status.INTERNAL,
            message: xenditHandlerError(error)}, null);
    }
}