import { NextFunction, Response } from "express";
import { v4 as uuid4 } from 'uuid';
import { logger } from "../utils/loggerUtils";
import { requestExtends } from "../interfaces/reqInterface";

export const loggerHandler = (req: requestExtends, res: Response, next: NextFunction) => {
    const start = Date.now();
    const traceId = uuid4();
    req.id = traceId;

    logger.info(
        `receive time: ${new Date()}\nmethod:${req.method}\ntraceId : ${traceId}\nurl:${req.originalUrl} `
    );

    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(
            ` finish log:traceId:${traceId}\nmethod:${req.method}\nurl:${req.originalUrl}\ncompleted time:  ${duration}ms`

        );
    })

    next();
}