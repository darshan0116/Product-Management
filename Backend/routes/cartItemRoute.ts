import { Router } from "express";
import { isAuthenticate } from "../middleware/isAuthenticate";
import { cartItemController } from "../controller/cartItemController";

const cartItemRouter = Router();

cartItemRouter.post(
  "/create",
  isAuthenticate,
  cartItemController.createCartItem
);
cartItemRouter.put(
  "/increase",
  isAuthenticate,
  cartItemController.increaseQuantity
);
cartItemRouter.put(
  "/decrease",
  isAuthenticate,
  cartItemController.decreaseQuantity
);

cartItemRouter.delete(
  "/delete/:cartId/:productId",
  isAuthenticate,
  cartItemController.deleteCartItem
);

export default cartItemRouter;
