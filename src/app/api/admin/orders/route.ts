import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Order from "@/models/Order";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    // Populate both user email and product details inside items
    const orders = await Order.find()
      .populate("userId", "email")
      .populate("items.productId", "name price image") // <-- add this
      .sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
