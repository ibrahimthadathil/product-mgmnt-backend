import bcrypt from "bcrypt";
import { User } from "@/models/userModel"; 
import dotenv from "dotenv";

dotenv.config();

const initAdmin = async () => {
  try {

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Credentials for first admin
    const adminEmail = process.env.ADMIN_EMAIL || "admin@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const adminUsername = process.env.ADMIN_USERNAME || "Admin";

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      username: adminUsername,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully");
    console.log("📨 Email:", adminEmail);
    console.log("🔑 Password:", adminPassword);

  } catch (error) {
    console.error("❌ Error initializing admin:", error);
    process.exit(1);
  }
};

export default initAdmin