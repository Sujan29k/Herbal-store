// app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Cart from "@/models/Cart";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { productId, userId } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json({ error: "Missing userId or productId" }, { status: 400 });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      const itemIndex = cart.items.findIndex((item: any) => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
      await cart.save();
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("🚨 Add to cart error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
