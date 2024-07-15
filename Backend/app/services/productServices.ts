import { prisma } from "../config/dbConnect";
import { CustomError } from "../interfaces/errorClass";

import { ProductInterface } from "../interfaces/productInterface";



export const createProduct = async (productData: ProductInterface, userId: number) => {
    const { name, price, productDesc, stock, productImg } = productData;

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
        createdProduct: {
          connect: {
            id: userId
          }
        }
      }
    });
  
    return createdProduct;
  };
  export const updateProduct = async (productData: ProductInterface, productId:number) => {
    const { name, price, productDesc, stock, productImg } = productData;
    
    const findProduct = await prisma.product.findFirst({
      where: {
        NOT: {
          productId: productId
        },
        name: name
      }
    });
  
    if (findProduct) {
      throw new CustomError(400, 'Product already Exist');
    }

    let base64Image;
  
    if (productImg && productImg.buffer) {
        // Convert buffer to base64
        base64Image = `data:${productImg.mimetype};base64,${productImg.buffer.toString('base64')}`;
      }
  
    const updatedProduct = await prisma.product.update({
      where:{
          productId:productId
      },
      data: {
        name,
        price,
        productDesc,
        stock,
        productImg:base64Image as string,
       
      }
    });
  
    return updatedProduct;
  };
const getAllProducts =()=>{
    
    return prisma.product.findMany({});

}
const deleteProduct = async (productId:number)=>{

    const findProduct = await prisma.product.findFirst({
        where:{
            productId:productId
        }
    });
    if(!findProduct){
       throw new CustomError(400, 'Product not found');
    }
    return prisma.product.delete({
        where:{
            productId:productId
        }
    });
}
const  getSingleProduct = (productId:number)=>{
const product = prisma.product.findFirst({
    where:{
        productId:productId
    }
});
if (!product) {
    throw new CustomError(400, 'Product not found');
}
    return product;
}

export const productService = {
    createProduct,
    getAllProducts,
    deleteProduct,
    getSingleProduct,
    updateProduct
}