import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET(req: NextRequest) {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}
