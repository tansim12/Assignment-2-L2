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
export const productService = {
  productPostDB,
  getAllProductsDB,
};
