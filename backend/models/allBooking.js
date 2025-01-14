import mongoose from "mongoose";

const { Schema } = mongoose;

// ALLBOOKING Schema keeps a record of all the bookings on the web app
const bookingSchema = new Schema({
  cab_name: {
    type: String,
  },
  cab_price: {
    type: Number,
  },
  cab_image: {
    type: String,
  },
  cab_type: {
    type: String,
  },
  cab_seats: {
    type: Number,
  },
  user_email: {
    type: String,
  },
  booking_time: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
export default mongoose.model("ALLBOOKING", bookingSchema);
