import { prisma } from "../config/dbConnect";
import { CustomError } from "../interfaces/errorClass";
import { createOrder } from "./orderService";

const createPayment = async (body: any, userId: number) => {

    const { cartId, ...rest } = body;
    const orderId = await createOrder(cartId, userId);
    console.log('orderId', orderId);
    if (!orderId) {
        throw new CustomError(400, 'Order not found');

    }
    console.log(rest, "rest");


    const payment = await prisma.paymentCheckOut.create({
        data: {
            userPayment: {
                connect: {
                    id: userId
                }
            },
            ...rest,
            Order: {
                connect: {
                    id: orderId
                }
            },

        }
    });

    console.log("payment");
    console.log(payment, "2342");


    return payment;
}


export const paymentService = {
    createPayment
}