import { prisma } from "../config/dbConnect";
import { CustomError } from "../interfaces/errorClass";
import { ProductInterface } from "../interfaces/productInterface";

export const createProduct = async (productData: ProductInterface, userId: number) => {
    const { name, price, productDesc, stock, productImg } = productData;

    const findProduct = await prisma.product.findFirst({
        where: { name }
    });

    if (findProduct) {
        throw new CustomError(400, 'Product already exists');
    }

    let base64Image;

    if (productImg && productImg.buffer) {
        base64Image = `data:${productImg.mimetype};base64,${productImg.buffer.toString('base64')}`;
    }

    const createdProduct = await prisma.product.create({
        data: {
            name,
            price,
            productDesc,
            stock,
            productImg: base64Image as string,
            createdBy: userId,
        }
    });

    return createdProduct;
};

export const updateProduct = async (productData: ProductInterface, productId: number) => {
    const { name, price, productDesc, stock, productImg } = productData;

    const findProduct = await prisma.product.findFirst({
        where: {
            NOT: { productId },
            name
        }
    });

    if (findProduct) {
        throw new CustomError(400, 'Product already exists');
    }

    let base64Image;

    if (productImg && productImg.buffer) {
        base64Image = `data:${productImg.mimetype};base64,${productImg.buffer.toString('base64')}`;
    }

    const updatedProduct = await prisma.product.update({
        where: { productId },
        data: {
            name,
            price,
            productDesc,
            stock,
            productImg: base64Image as string,
        }
    });

    return updatedProduct;
};

export const getAllProducts = () => {
    return prisma.product.findMany();
};

export const deleteProduct = async (productId: number) => {
    const findProduct = await prisma.product.findFirst({
        where: { productId }
    });
    if (!findProduct) {
        throw new CustomError(400, 'Product not found');
    }
    return prisma.product.delete({
        where: { productId }
    });
};

export const getSingleProduct = async (productId: number) => {
    const product = await prisma.product.findFirst({
        where: { productId }
    });
    if (!product) {
        throw new CustomError(400, 'Product not found');
    }
    return product;
};

export const productService = {
    createProduct,
    getAllProducts,
    deleteProduct,
    getSingleProduct,
    updateProduct
};
