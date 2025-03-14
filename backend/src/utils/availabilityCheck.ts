import Booking from "../models/booking";

export const isSlotAvailable = async (date: Date, time: string) => {
  const existingBooking = await Booking.findOne({ date, time });
  return !existingBooking;
};
