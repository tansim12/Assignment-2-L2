import express from "express";
import { productController } from "./Products.controllar";
const router = express.Router();

router.post("/products", productController.productPost);

export const productRouter = router;
