import path from "path";
import dotenv from "dotenv";
import { connectDB } from "../src/lib/mongoose";
import Product from "../src/models/Product";

// Load environment variables from .env.local for this standalone script
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const sampleProducts = [
  {
    name: "Organic Chamomile Tea",
    description: "Soothing chamomile tea for relaxation and better sleep. Made from 100% organic chamomile flowers.",
    price: 299,
    image: "/herbal-product.jpg"
  },
  {
    name: "Lavender Essential Oil",
    description: "Pure lavender essential oil for aromatherapy and stress relief. 100% natural and therapeutic grade.",
    price: 599,
    image: "/herbal.avif"
  },
  {
    name: "Ginger Root Powder",
    description: "Premium ginger root powder for digestive health and immunity. Sourced from organic farms.",
    price: 199,
    image: "/herbal-product.jpg"
  },
  {
    name: "Eucalyptus Oil",
    description: "Natural eucalyptus oil for respiratory health and clear breathing. Pure and unadulterated.",
    price: 449,
    image: "/herbal.avif"
  },
  {
    name: "Turmeric Capsules",
    description: "High-potency turmeric capsules for joint health and inflammation. Contains 95% curcuminoids.",
    price: 799,
    image: "/herbal-product.jpg"
  },
  {
    name: "Peppermint Tea",
    description: "Refreshing peppermint tea for digestive comfort and mental clarity. Caffeine-free and organic.",
    price: 249,
    image: "/herbal.avif"
  },
  {
    name: "Aloe Vera Gel",
    description: "Pure aloe vera gel for skin health and hydration. 99% pure with no artificial additives.",
    price: 399,
    image: "/herbal-product.jpg"
  },
  {
    name: "Ashwagandha Powder",
    description: "Traditional ashwagandha powder for stress relief and energy. Ancient Ayurvedic herb.",
    price: 549,
    image: "/herbal.avif"
  }
];

async function addSampleProducts() {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");
    
    // Add sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Added ${products.length} sample products to database`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding sample products:", error);
    process.exit(1);
  }
}

addSampleProducts(); 