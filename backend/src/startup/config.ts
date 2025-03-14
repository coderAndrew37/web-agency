import dotenv from "dotenv";

dotenv.config();

export const config = {
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/web-agency",
  port: process.env.PORT || 5000,
};
