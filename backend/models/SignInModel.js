import mongoose from "mongoose";

const { Schema } = mongoose;

const SignInSchema = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
);

export default mongoose.model("SignIn", SignInSchema);
