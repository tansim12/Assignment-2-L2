import { TProduct } from "./Products.interface";
import ProductModel from "./Products.modal";

const productPostDB = async (productBody: TProduct) => {
  const result = await ProductModel.create(productBody);
  return result;
};

const getAllProductsDB = async () => {
  const result = await ProductModel.find();
  return result;
};
const getOneProductsDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};
const findIdAndUpdateDB = async (id: string, productBody: TProduct) => {
  const result = await ProductModel.findByIdAndUpdate(
    { _id: id },
    { $set: { ...productBody } },
    { new: true, upsert: true }
  );
  return result;
};
export const productService = {
  productPostDB,
  getAllProductsDB,
  getOneProductsDB,
  findIdAndUpdateDB,
};
