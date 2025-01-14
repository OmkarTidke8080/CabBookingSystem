import mongoose from "mongoose";

const { Schema } = mongoose;

// CAB Schema for all the types of cabs available for pickup
const cabSchema = new Schema({
  cab_name: {
    type: String,
  },
  cab_price: {
    type: Number,
  },
  // cab_image: {
  //   type: String,
  // },
  cab_type: {
    type: String,
  },
  cab_seats: {
    type: Number,
  },
});

// Export the model
export default mongoose.model("CABS", cabSchema);
