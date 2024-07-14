import { Response } from "express";




const allDefaultResponse = async <Type>(res: Response, data: Type, message: string, reqId?: string) => {
    if (res.statusCode >= 200 && res.statusCode <= 299) {
        return res.status(res.statusCode).json({
            reqId: reqId,
            message: message,
            errorMessage: null,
            result: data,
            statusCode: res.statusCode
        })
    }
}
const errorResponse = async (res: Response, statusCode: number, message: string, reqId?: string) => {

    if (statusCode !== 500) {
        return res.status(statusCode).json({
            reqId: reqId,
            message: null,
            errorMessage: message,
            result: null,
            statusCode: res.statusCode
        })
    }
}

export const defaultResponses = {
    errorResponse, allDefaultResponse
}