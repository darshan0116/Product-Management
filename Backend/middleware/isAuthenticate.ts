import { NextFunction, Response } from "express";
import { jwtUtils } from "../utils/jwtUtils";
import { requestExtends } from "../interfaces/reqInterface";
import { CustomError } from "../interfaces/errorClass";


export const isAuthenticate = (req: requestExtends, res: Response, next: NextFunction) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        if (!token) throw new CustomError(401, "Token Not Found");

        const verify = jwtUtils.verifyToken(token);
        if (!verify) throw new CustomError(401, "Unauthorized");
        req.user = verify;
        next();
    } catch (error) {
        next(error);
    }

}
