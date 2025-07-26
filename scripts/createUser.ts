
import mongoose from "mongoose";
import User from "@/models/User"; // adjust the import based on your folder
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("✅ Connected to MongoDB");

  const hashedPassword = await bcrypt.hash("password123", 10);

  const newUser = new User({
    name: "Test User",
    email: "test@example.com",
    password: hashedPassword,
    role: "user",
  });

  await newUser.save();
  console.log("✅ User created successfully");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
