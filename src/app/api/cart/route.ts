// /app/api/cart/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, productId, quantity } = await req.json();

  if (!email || !productId || typeof quantity !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  let cart = await Cart.findOne({ userId: user._id });

  if (!cart) {
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    cart = await Cart.create({
      userId: user._id,
      items: [{ productId, quantity: quantity > 0 ? quantity : 1 }],
    });

    return NextResponse.json({ message: "Cart created", cart });
  }

  const existingItem = cart.items.find(
    (item: any) => item.productId.toString() === productId
  );

  if (existingItem) {
    const newQty = existingItem.quantity + quantity;

    if (newQty < 1) {
      cart.items = cart.items.filter(
        (item: any) => item.productId.toString() !== productId
      );
    } else {
      cart.items = cart.items.map((item: any) =>
        item.productId.toString() === productId
          ? { ...item.toObject(), quantity: newQty }
          : item
      );
    }
  } else if (quantity > 0) {
    cart.items.push({ productId, quantity });
  }

  cart.markModified("items");
  await cart.save();

  return NextResponse.json({ message: "Cart updated", cart });
}

export async function GET(req: NextRequest) {
  await connectDB();

  const email = req.nextUrl.searchParams.get("email");
  if (!email)
    return NextResponse.json({ error: "Missing email" }, { status: 400 });

  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const cart = await Cart.findOne({ userId: user._id }).populate("items.productId");

  return NextResponse.json({ items: cart?.items || [] });
}
