import express from "express";
import clientRoutes from "../routes/clients";

export default function setupRoutes(app: express.Application) {
  app.use("/api/clients", clientRoutes);
}
