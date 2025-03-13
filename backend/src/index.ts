import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Fix: Explicitly define types for req & res
app.get("/", (req: Request, res: Response) => {
  res.send("API Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
