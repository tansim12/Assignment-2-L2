import { Request, Response } from "express";
import ProductSchemaZod from "./Product.ZodValidation";
import { productService } from "./Product.service";

const productPost = async (req: Request, res: Response) => {
  try {
    console.log("hello");
    const productBody = req.body.product;
    const bodyParse = ProductSchemaZod.parse(productBody);
    const result = await productService.productPostDB(bodyParse);
    res.status(200).send({
      success: true,
      message: "Product Create Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
      data: error,
    });
  }
};

export const productController = {
  productPost,
};
