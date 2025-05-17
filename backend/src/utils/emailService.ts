import nodemailer from "nodemailer";
import dotenv from "dotenv";
import logger from "../utils/logger";
import { IBooking } from "../models/booking";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "mail.sleeksites.co.ke",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  from?: string
) {
  try {
    const info = await transporter.sendMail({
      from: from || `"Sleek Sites" <${process.env.EMAIL_USER}>`,
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
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; border: 1px solid #eee;">
      <h2 style="color: #007BFF;">New Strategy Call Request</h2>
      <p><strong>Client:</strong> ${booking.name} (${booking.email})</p>
      <p><strong>Selected Plan:</strong> ${booking.selectedPlan}</p>
      <h3>Project Details:</h3>
      <p>${booking.description}</p>
      <p><strong>Status:</strong> ${booking.status}</p>
      <p>Please contact the client within 24 hours to schedule the call.</p>
    </div>
  `;

  await sendEmail(adminEmail, subject, html);
}

export async function sendWelcomeEmail(to: string) {
  const subject = `Welcome to Sleek Sites 🎉`;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; border: 1px solid #eee;">
      <h2 style="color: #007BFF;">Welcome to the Sleek Sites Newsletter!</h2>
      <p>We're thrilled to have you on board.</p>
      <p>Get ready for actionable insights, design trends, and marketing tips — straight to your inbox.</p>
      <p style="font-size: 16px;">Thanks for joining us,<br/><strong>The Sleek Sites Team</strong></p>
      <hr style="margin-top: 24px;"/>
      <p style="font-size: 12px; color: #888;">You’re receiving this email because you subscribed to our newsletter. If this wasn’t you, feel free to ignore it.</p>
    </div>
  `;

  return await sendEmail(
    to,
    subject,
    html,
    `"Sleek Sites Newsletter" <${process.env.NEWSLETTER_EMAIL}>`
  );
}

export async function sendContactAcknowledgement(to: string, name: string) {
  const subject = `👋 Thanks for contacting Sleek Sites!`;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; border: 1px solid #eee;">
      <h2 style="color: #007BFF;">Hey ${name},</h2>
      <p>Thank you for reaching out to Sleek Sites! We’ve received your message and our team will get back to you as soon as possible.</p>
      <p>If it’s urgent, feel free to reply to this email directly.</p>
      <br/>
      <p style="font-size: 16px;">Cheers,<br/><strong>The Sleek Sites Team</strong></p>
      <hr style="margin-top: 24px;"/>
      <p style="font-size: 12px; color: #888;">You’re receiving this email because you contacted us via our website. If this wasn’t you, feel free to ignore it.</p>
    </div>
  `;
  await sendEmail(
    to,
    subject,
    html,
    `"Sleek Sites Support" <${process.env.SUPPORT_EMAIL}>`
  );
}
