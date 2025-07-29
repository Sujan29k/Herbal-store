import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import User from "@/models/User";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, items, totalAmount, shippingDetails } = body;

    if (!email || !items?.length || !totalAmount || !shippingDetails) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const newOrder = await Order.create({
      userId: user._id,
      items,
      totalAmount,
      shippingDetails,
    });

    // ===========================
    // SEND EMAIL TO ADMIN
    // ===========================
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL, // your Gmail
        pass: process.env.ADMIN_EMAIL_PASSWORD, // App password (not your Gmail password)
      },
    });

    const itemList = items
      .map(
        (it: any) =>
          `<li>Product ID: ${it.productId}, Quantity: ${it.quantity}</li>`
      )
      .join("");

    await transporter.sendMail({
      from: `"Herbal Store" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL, // Admin email
      subject: "New Order Placed",
      html: `
        <h2>New Order Received</h2>
        <p><strong>User:</strong> ${email}</p>
        <p><strong>Total:</strong> Rs. ${totalAmount}</p>
        <p><strong>Shipping:</strong> ${shippingDetails.name}, ${shippingDetails.phone}, ${shippingDetails.address}</p>
        <h3>Items:</h3>
        <ul>${itemList}</ul>
        <p><small>Order ID: ${newOrder._id}</small></p>
      `,
    });

    return NextResponse.json({ message: "Order placed", order: newOrder });
  } catch (error) {
    console.error("Order POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
