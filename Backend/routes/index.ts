import { Router } from "express";
import { loggerHandler } from "../middleware/logger";
import userRoutes from "./userRoutes";
import { notFoundHandler } from "../middleware/notFoundHandler";
import { customError } from "../middleware/errorHandler";
import productRouter from "./productRoutes";
import CartRouter from "./cartRoutes";
import cartItemRouter from "./cartItemRoute";

const router = Router();
router.use(loggerHandler);

router.use("/user", userRoutes);
router.use("/product", productRouter);
router.use("/cart", CartRouter);
router.use("/cartItem", cartItemRouter);
// router.use('/payment', paymentRouter);

router.use(notFoundHandler);
router.use(customError);

export default router;
