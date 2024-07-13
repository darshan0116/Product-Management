export interface cartItem{
    productId: number,
    quantity: number,
    cartId: number
}

export interface Cart {
    userId: number;
    cartId: number;
    cartItems: {
        id:number
        quantity: number;
        product: {
            productId: number;
            name: string;
            price: number;
            productImg: string; 
            stock: number;
        };
    }[];
}