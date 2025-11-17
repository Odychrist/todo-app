import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Fill a valid email adress"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [6, "Password must be at least 6 characters long."],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
