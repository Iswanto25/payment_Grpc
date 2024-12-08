import { xenditClientCreatePayment } from "../../../config/xenditConfig";

export const createInvoiceService = async (data: any): Promise<any> => {
    try {
        const response = await xenditClientCreatePayment.post('/v2/invoices', data);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating invoice: ${error}`);
    }
}

export const createVirtualAccountService = async (data: any): Promise<any> => {
    try {
        // console.log(data);
        const response = await xenditClientCreatePayment.post('/callback_virtual_accounts', data);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating virtual account: ${error}`);
    }
}

export const createQrCodeService = async (data: any): Promise<any> => {
    try {
        const response = await xenditClientCreatePayment.post('/qr_codes', data);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating QR code: ${error}`);
    }
}

export const createEwalletService = async (data: any): Promise<any> => {
    try {
        const response = await xenditClientCreatePayment.post('/ewallets/charges', data);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating e-wallet: ${error}`);
    }
}

export const createRetailOutletService = async (data: any): Promise<any> => {
    try {
        const response = await xenditClientCreatePayment.post('/fixed_payment_code', data);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating retail outlet: ${error}`);
    }
}