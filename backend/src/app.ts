import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import AuthRoutes from "./routes/auth.routes";
dotenv.config();

const port = process.env.PORT || 4000;

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.errorHandler();
  }

  private configure(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    const authRouter = new AuthRoutes();
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).send("<h1>Welcome To API Server</h1>");
    });
    this.app.use("/auth", authRouter.getRouter());
  }

  private errorHandler(): void {
    console.log("errorHandler");
  }

  public start() {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

export default App;
