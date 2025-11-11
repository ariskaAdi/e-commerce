import { NextFunction, Request, Response } from "express";
import {
  createProductService,
  getAllProductsService,
} from "../../services/products/products.service";

class ProductsController {
  public async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await getAllProductsService();
      res.status(200).send({ succees: true, response });
    } catch (error) {
      next(error);
    }
  }

  public async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}
  public async getProductByParams(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  public async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = await createProductService(
        req.body,
        req.file as Express.Multer.File
      );
      res.status(200).send({ success: true, product });
    } catch (error) {
      next(error);
    }
  }
  public async editProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}
  public async deleteProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}
}

export default ProductsController;
