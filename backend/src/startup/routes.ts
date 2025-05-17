import express from "express";
import bookingRoutes from "../routes/bookings";
import newsletterRoutes from "../routes/newsletter";
import authRoutes from "../routes/authRoutes";
import passwordRoutes from "../routes/passwordRoutes";
import testimonialRoutes from "../routes/testimonialRoutes";
import adminRoutes from "../routes/adminRoutes";
import projectRoutes from "../routes/projectRoutes";
import contactRoutes from "../routes/contacts"; // ✅ ADD THIS

export default function setupRoutes(app: express.Application) {
  app.use("/api/bookings", bookingRoutes);
  app.use("/api/newsletter", newsletterRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/password", passwordRoutes);
  app.use("/api/testimonials", testimonialRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/contact", contactRoutes); // ✅ ADD THIS
}
