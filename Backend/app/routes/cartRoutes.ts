import { Router } from "express";

import { isAuthenticate } from "../middleware/isAuthenticate";
import { cartController } from "../controller/cartController";


const CartRouter = Router();

CartRouter.get("/get", isAuthenticate, cartController.getCart);

export default CartRouter;
