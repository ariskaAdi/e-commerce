import { Router } from "express";
import AuthController from "../controllers/auth/auth.controller";

class AuthRoutes {
  private route: Router;
  private authController: AuthController;

  constructor() {
    this.route = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.post("/register", this.authController.registerController);
    this.route.post("/login", this.authController.loginController);
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default AuthRoutes;
