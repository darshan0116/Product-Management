import { prisma } from "../config/dbConnect";
import { CustomError } from "../interfaces/errorClass";
import { ProductInterface } from "../interfaces/productInterface";

export const createProduct = async (productData: ProductInterface, userId: number) => {
  const { name, price, productDesc, stock, productImg, category } = productData;

  console.log("Product Data:", productData);

  try {
    const findProduct = await prisma.product.findFirst({
      where: {
        name: name
      }
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
        category,
        createdProduct: {
          connect: {
            id: userId
          }
        }
      }
    });

    return createdProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, 'Internal Server Error');
  }
};

export const updateProduct = async (productData: ProductInterface, productId: number) => {
  const { name, price, productDesc, stock, productImg, category } = productData;

  try {
    const findProduct = await prisma.product.findFirst({
      where: {
        NOT: {
          productId: productId
        },
        name: name
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
      where: {
        productId: productId
      },
      data: {
        name,
        price,
        productDesc,
        stock,
        productImg: base64Image as string,
        category,
      }
    });

    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, 'Internal Server Error');
  }
};

export const getAllProducts = () => {
  const products = prisma.product.findMany({});
  console.log(products);
  return products
};

export const deleteProduct = async (productId: number) => {
  try {
    const findProduct = await prisma.product.findFirst({
      where: {
        productId: productId
      }
    });

    if (!findProduct) {
      throw new CustomError(400, 'Product not found');
    }

    return prisma.product.delete({
      where: {
        productId: productId
      }
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, 'Internal Server Error');
  }
};

export const getSingleProduct = async (productId: number) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        productId: productId
      }
    });

    if (!product) {
      throw new CustomError(400, 'Product not found');
    }

    return product;
  } catch (error) {
    console.error("Error getting product:", error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, 'Internal Server Error');
  }
};

export const productService = {
  createProduct,
  getAllProducts,
  deleteProduct,
  getSingleProduct,
  updateProduct
};
