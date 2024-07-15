import { prisma } from "../config/dbConnect";
import { CustomError } from "../interfaces/errorClass";
import { cartItemService } from "./cartItemService";

export const createOrder = async (cartId: number, userId: number) => {
  const cart = await prisma.cart.findFirst({
    where: {
      cartId: cartId,
      userId: userId,
    },
  });
  if (!cart) {
    throw new CustomError(400, "Cart not found");
  }
  const cartProducts = await prisma.cartItems.findMany({
    where: {
      cartId: cartId,
    },
    select: {
      productId: true,
      quantity: true,
    },
  });

  const createOrderProducts = cartProducts.map((product) => {
    return {
      productId: product.productId,
      quantity: product.quantity,
    };
  });

  const order = await prisma.order.create({
    data: {
      userId: userId,
      orderItems: {
        create: createOrderProducts,
      },
    },
  });

  console.log(order);
  await cartItemService.decreaseStock(cartId);

  await prisma.cartItems.deleteMany({
    where: {
      cartId: cartId,
    },
  });

  return order.id;
};
