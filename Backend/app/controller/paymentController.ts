import { NextFunction , Response } from "express";
import { requestExtends } from "../interfaces/reqInterface";
import { defaultResponses } from "../utils/defaultResponse";
import { paymentService } from "../services/paymentService";

const createPayment  = async (req: requestExtends, res: Response, next: NextFunction) => {
    try {
        const createPaymentInfo = await paymentService.createPayment(req.body , req.user.id);

        defaultResponses.allDefaultResponse(res, createPaymentInfo, "created payment details", req.id);
    }
    catch (error) {
        next(error);
    }
       
}


export const paymentController = {
    createPayment
}