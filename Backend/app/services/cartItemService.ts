import { prisma } from "../config/dbConnect";

import { CustomError } from "../interfaces/errorClass";

const createCartItem = async (
  productId: number,
  quantity: number,
  userId: number
) => {
  const findProduct = await prisma.product.findFirst({
    where: {
      productId: productId,
    },
  });
  if (!findProduct) {
    throw new CustomError(400, "Product not found");
  }
  const findProductInCartItem = await prisma.cartItems.findFirst({
    where: {
      productId: productId,
    },
  });
  if (findProductInCartItem) {
    throw new CustomError(400, "Product already exists in cart");
  }

  const findCart = await prisma.cart.findUnique({
    where: {
      userId: userId,
    },
  });
  let createdCartItem;
  if (!findCart) {
    //if Cart not found
    const cart = await createCart(userId);

    createdCartItem = await prisma.cartItems.create({
      data: {
        quantity,
        productId,
        cartId: cart.cartId,
      },
    });
  } else {
    createdCartItem = await prisma.cartItems.create({
      data: {
        quantity,
        productId,
        cartId: findCart.cartId,
      },
    });
  }
  return createdCartItem;
};

const createCart = async (userId: number) => {
  const cart = await prisma.cart.create({
    data: {
      userId: userId,
    },
  });
  return cart;
};

const increaseQuantityByOne = async (productId: number, cartId: number) => {
  const findProduct = await prisma.product.findFirst({
    where: {
      productId: productId,
    },
  });
  if (!findProduct) {
    throw new CustomError(400, "Product not found");
  }

  const findCartItem = await prisma.cartItems.findUnique({
    where: {
      uniqueCartItem: {
        productId: productId,
        cartId: cartId,
      },
    },
  });
  if (!findCartItem) {
    throw new CustomError(400, "Product not found");
  }
  const increaseQuantity = await prisma.cartItems.update({
    where: {
      uniqueCartItem: {
        productId: productId,
        cartId: cartId,
      },
    },
    data: {
      quantity: {
        increment: 1,
      },
    },
    select: {
      id: true,
      quantity: true,
      product: {
        select: {
          productId: true,
          name: true,
          price: true,
          productImg: true,
          stock: true,
        },
      },
      cartId: true,
      cart: {
        select: {
          userId: true,
        },
      },
    },
  });

  return increaseQuantity;
};

const decreaseQuantityByOne = async (productId: number, cartId: number) => {
  const findProduct = await prisma.product.findFirst({
    where: {
      productId: productId,
    },
  });
  if (!findProduct) {
    throw new CustomError(400, "Product not found");
  }
  const findCartItem = await prisma.cartItems.findUnique({
    where: {
      uniqueCartItem: {
        productId: productId,
        cartId: cartId,
      },
    },
  });
  if (!findCartItem) {
    throw new CustomError(400, "Product not found in Cart");
  }
  const decreaseQuantity = await prisma.cartItems.update({
    where: {
      uniqueCartItem: {
        productId: productId,
        cartId: cartId,
      },
    },
    data: {
      quantity: {
        decrement: 1,
      },
    },
    select: {
      id: true,
      quantity: true,
      product: {
        select: {
          productId: true,
          name: true,
          price: true,
          productImg: true,
          stock: true,
        },
      },
      cartId: true,
      cart: {
        select: {
          userId: true,
        },
      },
    },
  });

  return decreaseQuantity;
};

const deleteCartItemService = async (productId: number, cartId: number) => {
  const findProduct = await prisma.product.findFirst({
    where: {
      productId: productId,
    },
  });
  if (!findProduct) {
    throw new CustomError(400, "Product not found");
  }
  const findCartItem = await prisma.cartItems.findUnique({
    where: {
      uniqueCartItem: {
        productId: productId,
        cartId: cartId,
      },
    },
  });
  if (!findCartItem) {
    throw new CustomError(400, "Product not found in Cart");
  }
  const deleteCartItem = await prisma.cartItems.delete({
    where: {
      uniqueCartItem: {
        productId: productId,
        cartId: cartId,
      },
    },
  });
  return deleteCartItem;
};

export const cartItemService = {
  createCartItem,
  increaseQuantityByOne,
  decreaseQuantityByOne,
  deleteCartItemService,
};
