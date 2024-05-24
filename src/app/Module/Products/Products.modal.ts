import { Schema, model, connect } from "mongoose";
import {
  TInventoryObject,
  TProduct,
  TVariantsObject,
} from "./Products.interface";

const VariantsObjectSchema = new Schema<TVariantsObject>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});
const InventoryObjectSchema = new Schema<TInventoryObject>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const ProductSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  tags: { type: [String], required: true },
  variants: { type: [VariantsObjectSchema], required: true },
  inventory: { type: InventoryObjectSchema, required: true },
});
