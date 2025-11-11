import { Router } from "express";
import ProductsController from "../controllers/products/products.controller";

class ProductsRoutes {
  private route: Router;
  private productsController: ProductsController;
  constructor() {
    this.route = Router();
    this.productsController = new ProductsController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.get("/", this.productsController.getAllProducts);
    this.route.get("/:id", this.productsController.getProductById);
    this.route.get("/search", this.productsController.getProductByParams);
    this.route.post("/", this.productsController.createProduct);
    this.route.put("/:id", this.productsController.editProduct);
    this.route.delete("/:id", this.productsController.deleteProducts);
  }

  public getRouter() {
    return this.route;
  }
}

export default ProductsRoutes;
