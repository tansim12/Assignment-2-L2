import { Request, Response } from "express";
import ProductSchemaZod from "./Product.ZodValidation";
import { productService } from "./Product.service";
import {
  errorResponse,
  successResponse,
} from "../../Reuseable function/CustomResponse";

const productPost = async (req: Request, res: Response) => {
  try {
    const productBody = req.body;
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
    let searchValue = req.query.searchTerm as string;
    if (searchValue) {
      searchValue = searchValue.trim();
    }
    const result = await productService.getAllProductsDB(searchValue);
    res
      .status(200)
      .send(successResponse(result, "Products fetched successfully!"));
  } catch (error) {
    res.status(500).send(errorResponse(error));
  }
};

const oneProductsGet = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;

    const result = await productService.getOneProductsDB(id);
    res
      .status(200)
      .send(successResponse(result, "Products fetched successfully!"));
  } catch (error) {
    res.status(500).send(errorResponse(error));
  }
};
const updateOneProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const updateBody = req.body;
    const result = await productService.findIdAndUpdateDB(id, updateBody);
    res
      .status(200)
      .send(successResponse(result, "Products fetched successfully!"));
  } catch (error) {
    res.status(500).send(errorResponse(error));
  }
};

const deleteOneProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await productService.deleteOneProductsDB(id);
    res
      .status(200)
      .send(successResponse(null, "Product deleted successfully!"));
  } catch (error) {
    res.status(500).send(errorResponse(error));
  }
};
export const productController = {
  productPost,
  allProductsGet,
  oneProductsGet,
  updateOneProduct,
  deleteOneProduct,
};
