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
  if (
    isExistData?.inventory.quantity === 0 &&
    isExistData?.inventory.inStock === false
  ) {
    const result = {
      success: false,
      message: `Insufficient quantity available in inventory`,
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
      if (calc === 0) {
        await ProductModel.updateOne(
          { _id: orderBody.productId },
          { "inventory.inStock": false }
        );
      }
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

const allOrdersDB = async (email: string) => {
  if (email) {
    const result = await ordersModel.aggregate([{ $match: { email: email } }]);   

    if (!result.length) {
      return {
        success: false,
        message: "Order not found",
      };
    } else {
      return result;
    }
  } else {
    const result = await ordersModel.find();
    return result;
  }
};

export const ordersService = {
  postOrdersDB,
  allOrdersDB,
};
