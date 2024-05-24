import { Schema, model } from "mongoose";
import { TOrdersInfo } from "./Orders.interface";
import { z } from "zod";
const ordersSchemaZod = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(1, { message: "Email is required" }),
  productId: z.string().min(1, { message: "Product ID is required" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
});

export default ordersSchemaZod;

