import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import notFound from "./app/middlewares/notFound";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import { router } from "./app/routes";
import { envVars } from "./app/config/env";

dotenv.config();

const app: Application = express();

// middlewares
app.use(cors({
  origin: envVars.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


// baseURL/api/v1
app.use("/api/v1", router);

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("WalletX API is Running");
});

app.use(globalErrorHandler) // ✅ Always after routes

app.use(notFound);

export default app;