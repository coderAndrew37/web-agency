import nodemailer from "nodemailer";
import dotenv from "dotenv";
import logger from "./logger"; // ✅ Use Winston for logging

dotenv.config();

// ✅ Configure Secure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // 🔹 Your email
    pass: process.env.EMAIL_PASS, // 🔹 App password (not regular password)
  },
});

// ✅ Function to Send Email
export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const info = await transporter.sendMail({
      from: `"Your Agency" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    logger.info(`📧 Email sent to ${to} | Message ID: ${info.messageId}`);
  } catch (err) {
    logger.error(`❌ Email send failed: ${(err as Error).message}`);
  }
}

// ✅ Send Admin Notification for New Client
export async function notifyAdminNewClient(
  clientName: string,
  clientEmail: string
) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    logger.warn("⚠️ Admin email not set in environment variables.");
    return;
  }

  const subject = `🚀 New Client Onboarded: ${clientName}`;
  const html = `
    <h2>New Client Signed Up</h2>
    <p><strong>Name:</strong> ${clientName}</p>
    <p><strong>Email:</strong> ${clientEmail}</p>
    <p>Check the admin dashboard for details.</p>
  `;

  await sendEmail(adminEmail, subject, html);
}
