import express from "express";
import { productController } from "./Products.controllar";
const router = express.Router();

router.post("/products", productController.productPost);
router.get("/products", productController.allProductsGet);
router.get("/products/:productId", productController.oneProductsGet);
router.put("/products/:productId", productController.updateOneProduct);
router.delete("/products/:productId", productController.deleteOneProduct);

export const productRouter = router;
