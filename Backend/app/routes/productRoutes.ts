import { Router } from "express";
import { upload } from "../middleware/fileUpload";
import { isAuthenticate } from "../middleware/isAuthenticate";
import { productController } from "../controller/productController";

const productRouter = Router();

productRouter.get("/allProducts", productController.getAllProducts);
productRouter.get("/:productId", productController.getSingleProduct);
productRouter.post(
  "/create",
  isAuthenticate,
  upload.single("productImg"),
  productController.createProduct
);

productRouter.delete(
  "/delete/:productId",
  isAuthenticate,
  productController.deleteProduct
);
productRouter.put(
  "/update/:productId",
  isAuthenticate,
  upload.single("productImg"),
  productController.updateProduct
);

export default productRouter;
