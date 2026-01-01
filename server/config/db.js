import mongoose from "mongoose";

export const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};
