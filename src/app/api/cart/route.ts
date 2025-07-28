import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Cart from "@/models/Cart";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, productId } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    let cart = await Cart.findOne({ userId: user._id });

    if (!cart) {
      cart = await Cart.create({
        userId: user._id,
        items: [{ productId, quantity: 1 }],
      });
    } else {
      const existingItem = cart.items.find(
        (item: any) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }

      await cart.save();
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email });
    const cart = await Cart.findOne({ userId: user._id }).populate(
      "items.productId"
    );
    return NextResponse.json({ items: cart?.items || [] });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const productId = searchParams.get("productId");

  if (!email || !productId) {
    return NextResponse.json(
      { error: "Missing email or productId" },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ email });
    const cart = await Cart.findOne({ userId: user._id });

    if (cart) {
      cart.items = cart.items.filter(
        (item: any) => item.productId.toString() !== productId
      );
      await cart.save();
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
