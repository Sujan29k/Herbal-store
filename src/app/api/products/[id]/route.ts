import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Product, { ProductDocument } from "@/models/Product";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    const { id } = params;

    // When using .lean(), we get a plain object with _id as ObjectId
    const product = await Product.findById(id).lean() as ProductDocument | null;

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Serialize safe fields
    const serializedProduct = {
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt
        ? new Date(product.createdAt).toISOString()
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
