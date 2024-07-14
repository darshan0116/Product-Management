import { NextFunction, Response } from "express";
import { requestExtends } from "../interfaces/reqInterface";
import { cartItemService } from "../services/cartItemService";
import { defaultResponses } from "../utils/defaultResponse";
import { validationHelper } from "../helper/reqValidation";

const createCartItem = async (
  req: requestExtends,
  res: Response,
  next: NextFunction
) => {
  try {
    await validationHelper(req);
    const { productId, quantity } = req.body;
    const createCartItemInfo = await cartItemService.createCartItem(
      productId,
      quantity,
      req.user.id
    );

    defaultResponses.allDefaultResponse(
      res,
      createCartItemInfo,
      "created cartItem details",
      req.id
    );
  } catch (error) {
    next(error);
  }
};

const increaseQuantity = async (
  req: requestExtends,
  res: Response,
  next: NextFunction
) => {
  try {
    await validationHelper(req);
    const { productId, cartId } = req.body;
    const increaseQuantityInfo = await cartItemService.increaseQuantityByOne(
      productId,
      cartId
    );

    defaultResponses.allDefaultResponse(
      res,
      increaseQuantityInfo,
      "increased cartItem quantity",
      req.id
    );
  } catch (error) {
    next(error);
  }
};

const decreaseQuantity = async (
  req: requestExtends,
  res: Response,
  next: NextFunction
) => {
  try {
    await validationHelper(req);
    const { productId, cartId } = req.body;
    const decreaseQuantityInfo = await cartItemService.decreaseQuantityByOne(
      productId,
      cartId
    );

    defaultResponses.allDefaultResponse(
      res,
      decreaseQuantityInfo,
      "decreased cartItem quantity",
      req.id
    );
  } catch (error) {
    next(error);
  }
};

const deleteCartItem = async (
  req: requestExtends,
  res: Response,
  next: NextFunction
) => {
  try {
    await validationHelper(req);
    const cartId = req.params.cartId;

    const productId = req.params.productId;

    const deleteCartItemInfo = await cartItemService.deleteCartItemService(
      Number(productId),
      Number(cartId)
    );

    defaultResponses.allDefaultResponse(
      res,
      deleteCartItemInfo,
      "deleted cartItem details",
      req.id
    );
  } catch (error) {
    next(error);
  }
};

export const cartItemController = {
  createCartItem,
  increaseQuantity,
  decreaseQuantity,
  deleteCartItem,
};
