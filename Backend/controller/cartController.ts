import { NextFunction, Response } from "express";
import { requestExtends } from "../interfaces/reqInterface";
import { getCartOfUser } from "../services/cartService";
import { defaultResponses } from "../utils/defaultResponse";

const getCart = async (
  req: requestExtends,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartOfUser = await getCartOfUser(req.user.id);

    defaultResponses.allDefaultResponse(res, cartOfUser, "cartOfUser", req.id);
  } catch (error) {
    throw new Error();
  }
};

export const cartController = {
  getCart,
};
