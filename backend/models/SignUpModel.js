import mongoose from "mongoose";

const { Schema } = mongoose;

const SignUpSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { collection: "appUsers" }
);

export default mongoose.model("SignUp", SignUpSchema);
