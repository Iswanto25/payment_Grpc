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
            externalId: response.external_id,
            status: response.status,
            amount: response.amount,
            invoiceUrl: response.invoice_url,
            description: response.description,
        };
        console.log(`Invoice created: ${JSON.stringify(result)}`);
        callback(null, result);
    } catch (error) {
        callback({ code: grpc.status.INTERNAL,
            message: "Failed to fetch flight data"}, null);
    }
};
