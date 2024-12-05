import * as grpc from '@grpc/grpc-js';
import { xenditHandlerError } from "../utils/responses";
import { createQrCodeService } from '../services/paymentServices';
import { successResponse } from '../utils/responses';
import { CreateQrCodesRequest, CreateQrCodesResponse } from '../generated/xendit';

export const createQrCodeController = async (call: grpc.ServerUnaryCall<CreateQrCodesRequest, CreateQrCodesResponse>, callback: grpc.sendUnaryData<CreateQrCodesResponse>): Promise<void> => {
    try {
        const request = call.request;
        const response = await createQrCodeService(request);
        const result: CreateQrCodesResponse = {
            referenceId: response.reference_id,
            type: response.type,
            channelCode: response.channel_code,
            amount: response.amount,
            currency: response.currency,
            expiresAt: response.expires_at,
            qrString: response.qr_string,
            status: response.status,
        };
        const data = successResponse('QR code created successfully', result, grpc.status.OK);
        console.log(data);
        callback(null, result);
    } catch (error) {
        callback({ code: grpc.status.INTERNAL,
            message: xenditHandlerError(error)}, null);
    }
}