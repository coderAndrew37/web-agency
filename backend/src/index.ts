import cors from "cors";
import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";
import express, { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import { connectDB } from "./startup/db";
import setupRoutes from "./startup/routes";
import logger from "./utils/logger";

// Load environment variables
dotenv.config();

// Validate environment variables
const env = cleanEnv(process.env, {
  MONGO_URI: str(),
  FRONTEND_URL: str(),
  PORT: num({ default: 5000 }),
});

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration
const corsOptions = {
  origin: env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "x-csrf-token",
  ],
};

// Apply middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 100 : 10000,
});
app.use(limiter);

// Initialize Routes
setupRoutes(app);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`❌ Unexpected Error: ${err.message}`);
  res.status(500).json({ error: "Something went wrong. Try again later." });
});

// Start Server
const PORT = env.PORT;
const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  logger.info("Shutting down server...");

  mongoose.connection
    .close(false)
    .then(() => {
      logger.info("MongoDB connection closed due to app termination");
      server.close(() => {
        logger.info("Server closed");
        process.exit(0);
      });
    })
    .catch((err) => {
      logger.error("Error closing MongoDB connection:", err);
      process.exit(1);
    });
});

export default app;
