import mongoose from "mongoose";
import ENV from "../config/env.js";

const { DB_URI, NODE_ENV } = ENV;

if (!DB_URI) {
  const error = new Error("Please define MONGO_DB URI");
  throw error;
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connect to database at ${NODE_ENV}`);
  } catch (error) {
    console.error("Error connecting in to database", error);
    process.exit(1);
  }
};

export default connectToDatabase;
