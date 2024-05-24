import express from "express";
import { ordersController } from "./Orders.controller";

const router = express.Router();

router.post("/orders", ordersController.postOrder);

export const OrdersRoute = router;
