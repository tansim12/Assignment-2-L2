import ProductModel from "../Products/Products.modal";
import { TOrdersInfo } from "./Orders.interface";
import ordersModel from "./Orders.model";

const postOrdersDB = async (orderBody: TOrdersInfo) => {
  const customerOrderQuantity = orderBody.quantity;
  const isExistData = await ProductModel.findById({ _id: orderBody.productId });

  // is exist data validation
  if (!isExistData) {
    const result = {
      success: false,
      message: "This Product is not available",
    };
    return result;
  }

  // when real product quantity is 0 then update stock out and isStock = false 
  if (isExistData?.inventory.quantity === 0) {
   await ProductModel.updateOne(
      { _id: orderBody.productId },
      { "inventory.inStock": false }
    );

    const result = {
      success: false,
      message: `You can't order. Stock Out`,
    };
    return result;
  }

  // validate products quantity and customerOrderQuantity
  if (
    customerOrderQuantity <= isExistData?.inventory.quantity &&
    isExistData?.inventory.quantity > 0
  ) {
    const calc = isExistData?.inventory.quantity - customerOrderQuantity;
    const updateQuantity = await ProductModel.updateOne(
      { _id: orderBody.productId },
      { "inventory.quantity": calc }
    );

    if (updateQuantity.modifiedCount > 0) {
      const result = await ordersModel.create(orderBody);
      return result;
    }
  } else {
    const result = {
      success: false,
      message: `You can't order more then ${isExistData?.inventory.quantity}`,
    };
    return result;
  }
};

export const ordersService = {
  postOrdersDB,
};
