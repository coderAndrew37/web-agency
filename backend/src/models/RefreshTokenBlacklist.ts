import mongoose, { Document } from "mongoose";

export interface IRefreshTokenBlacklist extends Document {
  token: string;
  expiresAt: Date;
}

const refreshTokenBlacklistSchema = new mongoose.Schema<IRefreshTokenBlacklist>(
  {
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true }
);

export default mongoose.model<IRefreshTokenBlacklist>(
  "RefreshTokenBlacklist",
  refreshTokenBlacklistSchema
);
