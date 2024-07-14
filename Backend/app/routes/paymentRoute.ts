import { Router } from "express";
import { isAuthenticate } from "../middleware/isAuthenticate";
import { paymentController } from "../controller/paymentController";

const paymentRouter = Router();

paymentRouter.post("/create", isAuthenticate, paymentController.createPayment);

export default paymentRouter;
