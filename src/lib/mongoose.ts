// lib/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in .env.local");
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  return mongoose.connect(MONGODB_URI); // ← no extra options needed in Mongoose 7+
}
