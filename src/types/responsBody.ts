export interface ResponseBody {
    status: string; // 'success' atau 'error'
    message: string; // Pesan yang relevan
    data?: any; // Data yang akan dikembalikan (opsional, hanya untuk sukses)
    error?: any; // Informasi error (opsional, hanya untuk error)
    code: number; // HTTP status code
}

export interface createInvoiceRequest {
    external_id: string;
    amount: number;
    payer_email: string;
    description: string;
}

export interface createVirtualAccountRequest {
    external_id: string;
    bank_code: string;
    name: string;
}

export interface createQrCodeRequest {
    reference_id: string;
    type: string;
    currency: string;
    amount: number;
    expires_at: string;
}