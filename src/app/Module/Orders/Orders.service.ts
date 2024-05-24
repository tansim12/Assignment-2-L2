import ProductModel from "../Products/Products.modal";
import { TOrdersInfo } from "./Orders.interface";
import ordersModel from "./Orders.model";

const postOrdersDB = async (orderBody: TOrdersInfo) => {

  const isExist = await ProductModel.findById({_id:orderBody.productId});
  if (!isExist) {
    return {
      success:false,
      message:"This Product is not available"
    };
  }
  
  // If the product exists, create the order
  const result = await ordersModel.create(orderBody);
  return result;
};


export const ordersService = {
  postOrdersDB,
};
