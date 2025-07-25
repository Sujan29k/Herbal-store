import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, price, description, image } = body;

  if (!name || !price || !image) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await connectDB();

  try {
    const product = await Product.create({ name, price, description, image });
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
