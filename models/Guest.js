import mongoose from "mongoose";

const GuestSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

export default mongoose.models.Guest || mongoose.model("Guest", GuestSchema);
