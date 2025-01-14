import mongoose from "mongoose";

const { Schema } = mongoose;

// TEST schema for testing connection with MongoDB
const testSchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
});

export default mongoose.model("TEST", testSchema);
