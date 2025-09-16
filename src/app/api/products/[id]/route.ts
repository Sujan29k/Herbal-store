import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Product, { ProductDocument } from "@/models/Product";

interface RouteContext {
  params: { id: string };
}

export async function GET(req: Request, context: RouteContext) {
  await connectDB();

  try {
    const { id } = context.params;

    const product: ProductDocument | null = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const serializedProduct = {
      ...product,
      _id: (product._id as string | { toString(): string }).toString(),
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
