import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./startup/db";
import setupRoutes from "./startup/routes";
import logger from "./utils/logger";
dotenv.config();
const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// ✅ Initialize Routes
setupRoutes(app);

// ✅ Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "✅ API Running..." });
  logger.info("Health check endpoint hit.");
});

// ✅ Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`❌ Unexpected Error: ${err.message}`);
  res.status(500).json({ error: "Something went wrong. Try again later." });
});

// ✅ Start Server
const PORT: number = parseInt(process.env.PORT || "5000", 10);
app.listen(PORT, () => logger.info(`🚀 Server running on port ${PORT}`));

export default app;
