import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import schedule from "node-schedule";
import { cleanEnv, str, num } from "envalid";
import logger from "./utils/logger";
import { sendReminder } from "./utils/reminderService";
import Booking from "./models/booking";
import setupRoutes from "./startup/routes";
import { connectDB } from "./startup/db";

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

// ✅ Connect to MongoDB
connectDB();

// CORS configuration
const corsOptions = {
  origin: env.FRONTEND_URL || "http://localhost:5173", // Explicitly allow frontend
  credentials: true, // Allow cookies & authentication
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
};

// Apply middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// ✅ Initialize Routes
setupRoutes(app);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// Schedule a reminder 1 hour before the call
schedule.scheduleJob("0 * * * *", async () => {
  logger.info("Running reminder job...");
  const bookings = await Booking.find({
    date: { $gte: new Date() },
    status: "Confirmed",
  });

  bookings.forEach((booking) => {
    const callTime = new Date(booking.date);
    callTime.setHours(parseInt(booking.time.split(":")[0]));
    callTime.setMinutes(parseInt(booking.time.split(":")[1]));

    const reminderTime = new Date(callTime.getTime() - 60 * 60 * 1000); // 1 hour before
    if (reminderTime > new Date()) {
      schedule.scheduleJob(reminderTime, () => {
        logger.info(`Sending reminder for booking ${booking._id}`);
        sendReminder(booking._id.toString()); // Convert ObjectId to string
      });
    }
  });
});

// ✅ Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`❌ Unexpected Error: ${err.message}`);
  res.status(500).json({ error: "Something went wrong. Try again later." });
});

// ✅ Start Server
const PORT = env.PORT;
const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  logger.info("Shutting down server...");

  mongoose.connection
    .close(false) // Pass `false` to avoid force-closing the connection
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

// Export app for testing
export default app;
