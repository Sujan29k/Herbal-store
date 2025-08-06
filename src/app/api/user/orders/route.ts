import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    let orders = [];

    // First, try to find orders for registered users
    const user = await User.findOne({ email });
    if (user) {
      orders = await Order.find({ userId: user._id })
        .populate("items.productId", "name price image")
        .sort({ createdAt: -1 });
    }

    // Also find guest orders for this email
    const guestOrders = await Order.find({ guestEmail: email })
      .populate("items.productId", "name price image")
      .sort({ createdAt: -1 });

    // Combine both arrays
    orders = [...orders, ...guestOrders];

    // Sort by creation date
    orders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
