import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import { hash } from "bcryptjs";

async function createAdminUser() {
  try {
    await connectDB();

    const adminEmail = "admin@jadimart.com";
    const adminPassword = "admin123";
    const adminName = "Admin User";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin user already exists!");
      return;
    }

    // Hash password
    const hashedPassword = await hash(adminPassword, 12);

    // Create admin user
    const adminUser = await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      isOAuth: false,
    });

    console.log("Admin user created successfully!");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);
    console.log("Role:", adminUser.role);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

createAdminUser();
