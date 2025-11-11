import * as dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import AuthRoutes from "./routes/auth.routes";
import logger from "./utils/logger";
import ProductsRoutes from "./routes/products.routes";
dotenv.config();

const port: string | number = process.env.PORT || 4000;

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.errorHandler();
  }

  private configure(): void {
    const allowedOrigins = [
      "http://localhost:5434",
      "https://property-renting-web-app.vercel.app",
    ];
    this.app.use(
      cors({
        origin: allowedOrigins,
        credentials: true,
      })
    );
    this.app.use(express.json());
  }

  private routes(): void {
    const authRouter = new AuthRoutes();
    const productsRouter = new ProductsRoutes();
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).send("<h1>Welcome To API Server</h1>");
    });
    this.app.use("/auth", authRouter.getRouter());
    this.app.use("/products", productsRouter.getRouter());
  }

  private errorHandler(): void {
    this.app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        logger.error(
          `${req.method} ${req.path} ${error.message} ${JSON.stringify(error)}`
        );
        res.status(error.rc || 500).send(error);
      }
    );
  }

  public start() {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log("MAILER_SENDER:", process.env.MAILER_SENDER);
      console.log("MAILER_KEY exists:", !!process.env.MAILER_KEY);
    });
  }
}

export default App;
