import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import notFound from "./app/middlewares/notFound";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

dotenv.config();

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("Api is Running");
});

app.use(globalErrorHandler) // ✅ Always after routes

app.use(notFound);

export default app;