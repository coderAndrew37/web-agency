import nodemailer from "nodemailer";
import dotenv from "dotenv";
import logger from "../utils/logger";
import { IBooking } from "../models/booking";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const info = await transporter.sendMail({
      from: `"Strategy Call Booking" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    logger.info(`Email sent to ${to}`);
    return true;
  } catch (err) {
    logger.error(`Email send failed: ${(err as Error).message}`);
    return false;
  }
}

export async function notifyAdminNewBooking(booking: IBooking) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    logger.warn("Admin email not set in environment variables.");
    return;
  }

  const subject = `New Strategy Call Booking: ${booking.selectedPlan}`;
  const html = `
    <h2>New Strategy Call Request</h2>
    <p><strong>Client:</strong> ${booking.name} (${booking.email})</p>
    <p><strong>Selected Plan:</strong> ${booking.selectedPlan}</p>
    <h3>Project Details:</h3>
    <p>${booking.description}</p>
    <p><strong>Status:</strong> ${booking.status}</p>
    <p>Please contact the client within 24 hours to schedule the call.</p>
  `;

  await sendEmail(adminEmail, subject, html);
}
