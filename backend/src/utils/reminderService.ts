import nodemailer from "nodemailer";
import Booking from "../models/booking";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendReminder = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) return;

  const emailContent = `
    <h2>Reminder: Upcoming Call</h2>
    <p>Hi ${
      booking.clientName
    }, this is a reminder for your call scheduled on:</p>
    <p><strong>Date:</strong> ${new Date(booking.date).toDateString()}</p>
    <p><strong>Time:</strong> ${booking.time}</p>
    <p><strong>Platform:</strong> ${booking.platform}</p>
    <p>We look forward to speaking with you! 🚀</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: booking.clientEmail,
    subject: "Reminder: Upcoming Call",
    html: emailContent,
  });
};
