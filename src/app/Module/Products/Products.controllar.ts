import { Request, Response } from "express";
import ProductSchemaZod from "./Product.ZodValidation";
import { productService } from "./Product.service";
import {
  errorResponse,
  successResponse,
} from "../../Reuseable function/CustomResponse";

const productPost = async (req: Request, res: Response) => {
  try {
    console.log("hello");
    const productBody = req.body.product;
    const bodyParse = ProductSchemaZod.parse(productBody);
    const result = await productService.productPostDB(bodyParse);
    res
      .status(200)
      .send(successResponse(result, "Product created successfully"));
  } catch (error: any) {
    res.status(500).send(errorResponse(error));
  }
};

const allProductsGet = async (req: Request, res: Response) => {
  try {
    const result = await productService.getAllProductsDB();
    res
      .status(200)
      .send(successResponse(result, "Products fetched successfully!"));
  } catch (error) {
    res.status(500).send(errorResponse(error));
  }
};

export const productController = {
  productPost,
  allProductsGet,
};
