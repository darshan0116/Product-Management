import { Cart } from "../interfaces/cartInterface";

const mappedCartItems = (cart : Cart) => {
    const cartItems = cart.cartItems;
    const newMapItems= cartItems.map((item) => {
        return {
            quantity: item.quantity,
            name: item.product.name,
            price: item.product.price,
            productImg: item.product.productImg,
            productId: item.product.productId,
            stocks: item.product.stock,
            subTotal: item.quantity * item.product.price,
            cartId: cart.cartId,
            userId: cart.userId
        }
    })

    return  newMapItems
}
export default mappedCartItems