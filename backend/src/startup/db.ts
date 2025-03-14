import mongoose from "mongoose";
import logger from "../utils/logger"; // ✅ Import Logger

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.info("✅ MongoDB Connected Successfully");
  } catch (error) {
    logger.error("❌ DB Connection Error:", error);
    process.exit(1); // Exit process with failure
  }
};
