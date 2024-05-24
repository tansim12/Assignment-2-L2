import { Request, Response } from "express";
import ordersSchemaZod from "./Orders.ZodValidation";
import {
  errorResponse,
  successResponse,
} from "../../Reuseable function/CustomResponse";
import { ordersService } from "./Orders.service";
const postOrder = async (req: Request, res: Response) => {
  try {
    const orderBody = req.body;
    const parseBodyZod = ordersSchemaZod.parse(orderBody);
    const result = await ordersService.postOrdersDB(parseBodyZod);
    res
      .status(200)
      .send(successResponse(result, "Order created successfully!"));
  } catch (error) {
    res.status(500).send(errorResponse(error));
  }
};

export const ordersController = {
  postOrder,
};
