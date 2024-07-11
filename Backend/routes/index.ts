import { Router } from "express";
import { loggerHandler } from "../middleware/logger";

const router = Router();
router.use(loggerHandler);



export default router;
