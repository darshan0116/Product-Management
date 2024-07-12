import { Router } from "express";
import { loggerHandler } from "../middleware/logger";
import userRoutes from "./userRoutes";
import { notFoundHandler } from "../middleware/notFoundHandler";
import { customError } from "../middleware/errorHandler";

const router = Router();
router.use(loggerHandler);

router.use('/user', userRoutes);


router.use(notFoundHandler);
router.use(customError);

export default router;
