import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  guestId: String,
  date: String,
  time: String,
});

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
