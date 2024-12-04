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