import { NextFunction, Response } from "express";
import { CustomError } from "../interfaces/errorClass";

import { logger } from "../utils/loggerUtils";
import { requestExtends } from "../interfaces/reqInterface";
import { defaultResponses } from "../utils/defaultResponse";


export const customError = (
    err: CustomError,
    req: requestExtends,
    res: Response,
    next: NextFunction
) => {
    const reqId = req.id;
    const error = new CustomError(err.status, err.message);
    logger.error(`request traceId : ${reqId}\n req:method ${req.method}\n 
    with status : ${error.status} and url is ${req.originalUrl}`);

    defaultResponses.errorResponse(res, error.status, error.message, reqId);

    return res.status(error.status).json({
        reqId: reqId,
        message: null,
        errorMessage: err,
        result: null,
        statusCode: res.statusCode
    });
};