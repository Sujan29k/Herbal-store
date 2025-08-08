// /app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, productId, quantity } = await req.json();

    console.log("POST /api/cart ->", { email, productId, quantity });

    if (!email || !productId || typeof quantity !== "number") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

  const user = await User.findOne({ email });
  if (!user) {
    console.log("User not found for email:", email);
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

    console.log("Cart created:", cart);
    return NextResponse.json({ message: "Cart created", cart });
  }

  interface CartItem {
    productId: string;
    quantity: number;
  }

  const existingItem = cart.items.find(
    (item: CartItem) => item.productId.toString() === productId
  );

  if (existingItem) {
    const newQty = existingItem.quantity + quantity;
    console.log("Updating existing item qty:", newQty);

    if (newQty < 1) {
      cart.items = cart.items.filter(
        (item: CartItem) => item.productId.toString() !== productId
      );
    } else {
      existingItem.quantity = newQty;
    }
  } else if (quantity > 0) {
    console.log("Adding new item to cart");
    cart.items.push({ productId, quantity });
  }

    cart.markModified("items");
    await cart.save();

    console.log("Cart updated:", cart);
    return NextResponse.json({ message: "Cart updated", cart });
  } catch (error) {
    console.error("Cart API error:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();

  const email = req.nextUrl.searchParams.get("email");
  console.log("GET /api/cart for email:", email);

  if (!email)
    return NextResponse.json({ error: "Missing email" }, { status: 400 });

  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const cart = await Cart.findOne({ userId: user._id }).populate(
    "items.productId"
  );

  console.log("Fetched cart:", cart);
  return NextResponse.json({ items: cart?.items || [] });
}
