import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();
    console.log("🔍 Fetching products from database...");

    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    console.log(`📦 Found ${products.length} products in database`);

    if (products.length > 0) {
      console.log("📋 Sample product:", {
        id: products[0]._id,
        name: products[0].name,
        price: products[0].price,
      });
    }

    // Ensure proper serialization for Vercel
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const serializedProducts = products.map((product: any) => ({
      _id: product._id.toString(),
      name: product.name,
      description: product.description || "",
      price: product.price,
      image: product.image,
      createdAt: product.createdAt.toISOString(),
    }));

    console.log(
      `✅ Returning ${serializedProducts.length} serialized products`
    );

    return NextResponse.json(serializedProducts, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("❌ Products API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
