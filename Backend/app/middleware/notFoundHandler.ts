
import { NextFunction, Response } from "express";

import { logger } from "../utils/loggerUtils";
import { CustomError } from "../interfaces/errorClass";
import { defaultResponses } from "../utils/defaultResponse";
import { requestExtends } from "../interfaces/reqInterface";


export const notFoundHandler = async (req: requestExtends, res: Response, next: NextFunction) => {
    const reqId = req.id;

    logger.error(`request is not valid with traceId:${reqId} req:method ${req.method} 
    with status : 404 and url is ${req.originalUrl}`)
    const error = new CustomError(404, "page not found");
    defaultResponses.errorResponse(res, error.status, error.message, reqId);
}
