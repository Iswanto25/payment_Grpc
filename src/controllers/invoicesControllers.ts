import * as grpc from '@grpc/grpc-js';
import { createInvoiceService } from '../services/invoicesServices';
import { successResponse, errorResponse } from '../utils/responses';
import { CreateInvoiceRequest, InvoiceResponse } from '../generated/xendit';

export const createInvoiceControllers = async (
    call: grpc.ServerUnaryCall<CreateInvoiceRequest, InvoiceResponse>,
    callback: grpc.sendUnaryData<InvoiceResponse>
) => {
    try {
        const request = call.request;
        const response = await createInvoiceService(request);
        const result: InvoiceResponse = {
            id: response.id,
            extenalId: response.external_id,
            status: response.status,
            amount: response.amount,
            currency: response.currency,
            description: response.description,
            invoicesUrl: response.invoice_url,
            availableBanks: response.available_banks,
            availableEwallets: response.available_ewallets,
            availableOTR: response.available_retail_outlets,
            availableQrCode: response.available_qr_codes,
        };
        callback(null, result);
    } catch (error) {
        callback({ code: grpc.status.INTERNAL,
            message: "Failed to fetch flight data"}, null);
    }
};
