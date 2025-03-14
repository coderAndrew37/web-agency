import express from "express";
import clientRoutes from "../routes/clients";
import bookingRoutes from "../routes/bookings";

export default function setupRoutes(app: express.Application) {
  app.use("/api/clients", clientRoutes);
  app.use("/api/bookings", bookingRoutes);
}
