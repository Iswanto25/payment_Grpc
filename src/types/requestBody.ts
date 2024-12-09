export interface RequestBodySignature {
    payment_method: string;
    merchant_id: string;
    password: string;
    bill_no: string;
    bill_total: string;
    status_code?: string;
}

export interface RequestBodyCreatePayment {
    // patment_method: string; // Alphanumeric (10), Payment Method: 'debit'
    request: string; // Alphanumeric (50), Request Description
    merchant_id: string; // Numeric (5), Merchant Code From Faspay = BOI
    merchant: string; // Alphanumeric (32), Merchant Name
    bill_no: string; // Alphanumeric (32), Order Number
    bill_date: string; // Datetime (YYYY-MM-DD HH:MM:SS), Transaction/Order Date
    bill_expired: string; // Datetime (YYYY-MM-DD HH:MM:SS), Payment Expiring Date (max 30 days)
    bill_desc: string; // Alphanumeric (128), Transaction Description
    bill_currency: string; // Alphanumeric (3), Currency, Must be 'IDR'
    bill_total: number; // Numeric (15), Total Nominal
    payment_channel: string; // Numeric (32), Payment Channel Code
    pay_type: string; // Alphanumeric (1), Payment Type: 1 (Full Settlement), 2 (Installment), 3 (Mixed)
    cust_no: string; // Alphanumeric (32), Customer Number
    cust_name: string; // Alphanumeric (128), Customer Name
    msisdn: string; // Numeric (64), Customer Mobile Phone
    email: string; // Alphanumeric (128), Customer Email
    terminal: number; // Numeric (16), Always use 10 for Terminal
}

export interface RequestBodyCreateInquiryPayment {
    request: string; // Alphanumeric (10), Payment Method: 'debit'
    trx_id: number; // Numeric (5), Merchant Code From Faspay = BOI
    merchant_id: number; // Alphanumeric (32), Merchant Name
    bill_no: string; // Alphanumeric (32), Order Number
}

export interface RequestBodyNotificationPayment {
    request: string,
    trx_id: string,
    merchant_id: number,
    merchant: string,
    bill_no: string,
    payment_reff: string,
    payment_date: string,
    payment_status_code: string,
    payment_status_desc: string,
    bill_total: string,
    payment_total: string,
    payment_channel_uid: string,
    payment_channel: string,
}