import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./startup/db";
import setupRoutes from "./startup/routes";
import logger from "./utils/logger";
import schedule from "node-schedule";
import { sendReminder } from "./utils/reminderService";
import Booking from "./models/booking";

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

// Schedule a reminder 1 hour before the call
schedule.scheduleJob("0 * * * *", async () => {
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
      schedule.scheduleJob(reminderTime, () =>
        sendReminder(booking._id.toString())
      ); // Convert ObjectId to string
    }
  });
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
