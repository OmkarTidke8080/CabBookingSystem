import mongoose from "mongoose";

const { Schema } = mongoose;

// USER Schema - email of the user, object user_cabs (array){source, destination, id, timestamp, price, etc}
const userSchema = new Schema({
  user_email: {
    type: String,
  },
  user_cabs: {
    type: [Object],
  },
});

export default mongoose.model("user", userSchema);
