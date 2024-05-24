import express from "express";
import { productController } from "./Products.controllar";
const router = express.Router();

router.post("/products", productController.productPost);
router.get("/products", productController.allProductsGet);

export const productRouter = router;
