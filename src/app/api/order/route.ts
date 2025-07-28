import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/lib/mongoose";
import Order from "@/models/Order";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { email, items, totalAmount, shippingDetails } = body;

    if (!email || !items?.length || !totalAmount || !shippingDetails) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const newOrder = await Order.create({
      userId: user._id,
      items,
      totalAmount,
      shippingDetails,
    });

    return NextResponse.json({ message: "Order placed", order: newOrder });
  } catch (error) {
    console.error("Order POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
