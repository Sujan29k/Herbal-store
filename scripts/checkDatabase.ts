import { connectDB } from "../src/lib/mongoose";
import Product from "../src/models/Product";

async function checkDatabase() {
  try {
    await connectDB();
    console.log("🔍 Connected to database, checking products...");

    const products = await Product.find({});
    console.log(`📦 Found ${products.length} products in database`);

    if (products.length > 0) {
      console.log("📋 Products found:");
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - Rs.${product.price}`);
      });
    } else {
      console.log("❌ No products found in database");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error checking database:", error);
    process.exit(1);
  }
}

checkDatabase();
