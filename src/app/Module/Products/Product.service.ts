import { TProduct } from "./Products.interface";
import ProductModel from "./Products.modal";

const productPostDB = async (productBody: TProduct) => {
  const result = await ProductModel.create(productBody);
  return result;
};

const getAllProductsDB = async (searchValue: string) => {
  if (searchValue) {
    // const result = await ProductModel.find({
    //   $or: [
    //     { name: { $text: { $search: searchValue } } },
    //     { category: { $text: { $search: searchValue } } },
    //   ],
    // });
    const result = await ProductModel.find({ $text: { $search: searchValue } });
    return result;
  } else {
    const result = await ProductModel.find({});
    return result;
  }
};
const getOneProductsDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });

  if (!result) {
    return {
      success: false,
      message: "Product not found",
    };
  }
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

const deleteOneProductsDB = async (id: string) => {
  const result = await ProductModel.findOneAndDelete({ _id: id });
  if (!result) {
    return {
      success: false,
      message: "This Products not available !",
    };
  }

  return result;
};

export const productService = {
  productPostDB,
  getAllProductsDB,
  getOneProductsDB,
  findIdAndUpdateDB,
  deleteOneProductsDB,
};
