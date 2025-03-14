import { google } from "googleapis";
import path from "path";
import logger from "./logger";

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../../booking-system.json"), // Path to your credentials file
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({ version: "v3", auth });

export const addToGoogleCalendar = async (
  eventName: string,
  date: Date,
  time: string,
  clientEmail: string
) => {
  try {
    const event = {
      summary: eventName,
      start: { dateTime: `${date.toISOString().split("T")[0]}T${time}:00Z` },
      end: { dateTime: `${date.toISOString().split("T")[0]}T${time}:30Z` }, // 30-minute event
      attendees: [{ email: clientEmail }],
    };

    const res = await calendar.events.insert({
      calendarId: "your-calendar-id@group.calendar.google.com", // Replace with your shared calendar ID
      requestBody: event,
    });

    logger.info(`✅ Event added to Google Calendar: ${res.data.htmlLink}`);
    return res.data;
  } catch (err) {
    logger.error(
      `❌ Error adding event to Google Calendar: ${(err as Error).message}`
    );
    throw new Error("Failed to add event to Google Calendar");
  }
};
