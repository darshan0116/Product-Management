import { NextFunction, Request, Response } from "express";
import { CustomError } from "../interfaces/errorClass";
import { requestExtends } from "../interfaces/reqInterface";
import { defaultResponses } from "../utils/defaultResponse";
import { productService } from "../services/productServices";
import { validationHelper } from "../helper/reqValidation";

const getAllProducts = async (req: requestExtends, res: Response, next: NextFunction) => {
    try {
        const allProducts = await productService.getAllProducts();
        defaultResponses.allDefaultResponse(res, allProducts, "all products", req.id);
    } catch (error) {
        console.error("Error in getAllProducts:", error);
        next(error);
    }
}

const getSingleProduct = async (req: requestExtends, res: Response, next: NextFunction) => {
    try {
        const product = await productService.getSingleProduct(Number(req.params.productId));
        defaultResponses.allDefaultResponse(res, product, "single product", req.id);
    } catch (error) {
        console.error("Error in getSingleProduct:", error);
        next(error);
    }
}

const createProduct = async (req: requestExtends, res: Response, next: NextFunction) => {
    try {
        await validationHelper(req);
        if (!req.file) {
            throw new CustomError(400, 'Image is required');
        }
        const productData = {
            ...req.body,
            price: parseFloat(req.body.price),
            stock: parseInt(req.body.stock),
            productImg: req.file
        };
        console.log("Product Data:", productData);
        const createProductInfo = await productService.createProduct(productData, req.user.id);
        defaultResponses.allDefaultResponse(res, createProductInfo, "created Product details", req.id);
    } catch (error) {
        console.error("Error in createProduct:", error);
        next(error);
    }
}

const updateProduct = async (req: requestExtends, res: Response, next: NextFunction) => {
    try {
        await validationHelper(req);
        if (!req.file) {
            throw new CustomError(400, 'Image is required');
        }
        const productData = {
            ...req.body,
            price: parseFloat(req.body.price),
            stock: parseInt(req.body.stock),
            productImg: req.file
        };
        const updateProductInfo = await productService.updateProduct(productData, Number(req.params.productId));
        defaultResponses.allDefaultResponse(res, updateProductInfo, "updated product details", req.id);
    } catch (error) {
        console.error("Error in updateProduct:", error);
        next(error);
    }
}

const deleteProduct = async (req: requestExtends, res: Response, next: NextFunction) => {
    try {
        const deleteProductInfo = await productService.deleteProduct(Number(req.params.productId));
        defaultResponses.allDefaultResponse(res, deleteProductInfo, "deleted product", req.id);
    } catch (error) {
        console.error("Error in deleteProduct:", error);
        next(error);
    }
}

export const productController = {
    createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct
}
