import { ResponseBody } from '../types/responsBody';

export const successResponse = (message: string, data: any, code: number): ResponseBody => {
    return {
        status: 'success',
        message,
        code
    };
};

export const errorResponse = (message: string, error: any, code: number): ResponseBody => {
    return {
        status: 'error',
        message,
        error,
        code
    };
};

export const xenditHandlerError = (error: any): string => {
    // Jika error adalah response dari request HTTP
    if (error.response && error.response.data) {
        const xenditError = error.response.data;

        // Periksa kode kesalahan dan beri pesan yang sesuai
        switch (xenditError.error_code) {
            case 'INVALID_CREDENTIALS':
                return 'Invalid credentials provided to Xendit';
            case 'INVALID_REQUEST':
                return 'Invalid request sent to Xendit';
            case 'INVOICE_ALREADY_PAID':
                return 'Invoice already paid';
            case 'INSUFFICIENT_BALANCE':
                return 'Insufficient balance for payout';
            case 'INVALID_DESTINATION':
                return 'Destination account is invalid';
            case 'REJECTED_BY_CHANNEL':
                return 'Payout rejected by destination channel';
            case 'TEMPORARY_TRANSFER_ERROR':
                return 'Temporary transfer error, retry after some time';
            case 'TRANSFER_ERROR':
                return 'Fatal transfer error, check the API request fields';
            case 'UNKNOWN_BANK_NETWORK_ERROR':
                return 'Unknown error from the bank network';
            default:
                return 'Unknown error occurred: ' + xenditError.error_code;
        }
    }

    // Jika error tidak memiliki struktur response
    if (error.message) {
        return error.message; // Pesan error umum
    }

    // Jika tidak ada informasi lainnya
    return 'An unexpected error occurred';
};
