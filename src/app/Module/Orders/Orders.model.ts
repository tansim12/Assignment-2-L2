import { Schema, model } from "mongoose";
import { TOrdersInfo } from "./Orders.interface";

const ordersSchema = new Schema<TOrdersInfo>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const ordersModel = model<TOrdersInfo>("Order", ordersSchema);

export default ordersModel
