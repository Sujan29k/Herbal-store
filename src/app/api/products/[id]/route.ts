import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET(req: Request, context: any) {
  await connectDB();

  try {
    const { id } = context.params;

    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const serializedProduct = {
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt
        ? new Date(product.createdAt).toISOString()
        : null,
      updatedAt: product.updatedAt
        ? new Date(product.updatedAt).toISOString()
        : null,
    };

    return NextResponse.json(serializedProduct, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching product by id:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
