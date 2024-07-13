import { prisma } from "../config/dbConnect";
import mappedCartItems from "../utils/mappedCartItems";

export const getCartOfUser = async (userId: number) => {
    const cart = await prisma.cart.findFirst({
        where: {
            userId: userId
        },
        select: {
            userId: true,
            cartId: true,
            cartItems: {
                select: {
                    quantity: true,
                    id: true,
                        product: {
                        select: {
                            productId: true,
                            name: true,
                            price: true,
                            productImg: true,
                            stock: true,
                
                        }
                    }
                }
            }
        }
    });
    if (!cart) {
       return []
    }

  return mappedCartItems(cart);
}