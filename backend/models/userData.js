import mongoose from "mongoose";

const { Schema } = mongoose;

const userData = new Schema({
  customerId: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  agreeToTerms: {
    type: Boolean,
  },
});

export default mongoose.model("userData", userData);
