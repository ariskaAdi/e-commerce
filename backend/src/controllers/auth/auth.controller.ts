import { NextFunction, Request, Response } from "express";
import {
  loginService,
  registerService,
} from "../../services/auth/auth.service";

class AuthController {
  public async registerController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await registerService(req.body);
      res.status(201).send({
        success: true,
        message: "User registered successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  public async loginController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { ...user } = await loginService(req.body, res);
      res.status(200).send({
        success: true,
        message: "User logged in successfully",
        user: {
          email: user.email,
          name: user.name,
        },
        token: user.token,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
