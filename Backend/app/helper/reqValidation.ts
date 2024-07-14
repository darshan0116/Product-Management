
import { Request } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../interfaces/errorClass";

export const validationHelper = async (req: Request) => {
    const hasError = validationResult(req);
    let Message = '';
    if (!hasError.isEmpty()) {
        hasError.array().forEach((e) => {
            Message += e.msg;
            Message += ' , ';
        })
    }
    if (Message.trim()) {

        throw new CustomError(400, Message);
    }
}
