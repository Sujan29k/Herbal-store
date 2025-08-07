import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, items, totalAmount, shippingDetails, isGuest } = body;

    if (!email || !items?.length || !totalAmount || !shippingDetails) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    let userId = null;

    // For registered users, find the user and use their ID
    if (!isGuest) {
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      userId = user._id;
    }
    // For guest users, we'll create the order without a userId

    const newOrder = await Order.create({
      userId: userId, // null for guest users
      guestEmail: isGuest ? email : undefined, // Store guest email separately
      items,
      totalAmount,
      shippingDetails,
    });

    // ===========================
    // SEND EMAILS (ASYNC - DON'T WAIT)
    // ===========================
    // Send emails in background without blocking the response
    setImmediate(async () => {
      try {
        // Fetch product details to get actual product names
        interface OrderItem {
          productId: string;
          quantity: number;
        }

        const productDetails = await Promise.all(
          items.map(async (item: OrderItem) => {
            const product = await Product.findById(item.productId);
            return {
              name: product?.name || "Unknown Product",
              price: product?.price || 0,
              quantity: item.quantity,
              total: (product?.price || 0) * item.quantity,
            };
          })
        );

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASSWORD,
          },
        });

        // Prepare product list for emails
        const adminItemList = productDetails
          .map(
            (item) =>
              `<li style="margin: 8px 0; padding: 12px; background: #ffffff; border-radius: 6px; border-left: 4px solid #16a34a;">
                <strong>${item.name}</strong><br>
                <span style="color: #6b7280;">Quantity: ${item.quantity} × Rs. ${item.price} = Rs. ${item.total}</span>
              </li>`
          )
          .join("");

        const customerItemList = productDetails
          .map(
            (item) =>
              `<li style="margin: 8px 0; padding: 12px; background: #f8fafc; border-radius: 6px;">
                <strong style="color: #1f2937;">${item.name}</strong><br>
                <span style="color: #6b7280;">Quantity: ${item.quantity} × Rs. ${item.price} = Rs. ${item.total}</span>
              </li>`
          )
          .join("");

        // ===================
        // SEND EMAIL TO ADMIN
        // ===================
        await transporter.sendMail({
          from: `"Jadimart Store" <${process.env.ADMIN_EMAIL}>`,
          to: process.env.ADMIN_EMAIL,
          subject: "🛍️ New Order Placed - Jadimart",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
              <div style="background: linear-gradient(135deg, #16a34a, #22c55e); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                <h1 style="margin: 0; font-size: 28px;">🛍️ New Order Alert!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">A new order has been placed on Jadimart</p>
              </div>
              
              <div style="padding: 30px; background: #f8fafc;">
                <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
                  <h2 style="color: #16a34a; margin-top: 0;">👤 Customer Information</h2>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; color: #374151;"><strong>Name:</strong></td><td style="color: #6b7280;">${
                      shippingDetails.name
                    }</td></tr>
                    <tr><td style="padding: 8px 0; color: #374151;"><strong>Email:</strong></td><td style="color: #6b7280;">${email} ${
            isGuest ? "(Guest)" : "(Registered)"
          }</td></tr>
                    <tr><td style="padding: 8px 0; color: #374151;"><strong>Phone:</strong></td><td style="color: #6b7280;">${
                      shippingDetails.phone
                    }</td></tr>
                    <tr><td style="padding: 8px 0; color: #374151;"><strong>Address:</strong></td><td style="color: #6b7280;">${
                      shippingDetails.address
                    }</td></tr>
                  </table>
                </div>

                <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
                  <h2 style="color: #16a34a; margin-top: 0;">📦 Ordered Items</h2>
                  <ul style="list-style: none; padding: 0; margin: 0;">${adminItemList}</ul>
                  <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #16a34a; text-align: right;">
                    <span style="font-size: 20px; font-weight: bold; color: #16a34a;">Total: Rs. ${totalAmount}</span>
                  </div>
                </div>

                <div style="background: #16a34a; color: white; padding: 15px; border-radius: 8px; text-align: center;">
                  <p style="margin: 0; font-size: 12px;">Order ID: ${
                    newOrder._id
                  }</p>
                  <p style="margin: 5px 0 0 0; font-size: 12px;">Jadimart Admin Dashboard</p>
                </div>
              </div>
            </div>
          `,
        });

        // ======================
        // SEND EMAIL TO CUSTOMER
        // ======================
        await transporter.sendMail({
          from: `"Jadimart Store" <${process.env.ADMIN_EMAIL}>`,
          to: email,
          subject:
            "🎉 Order Confirmation - Thank You for Shopping with Jadimart!",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
              <div style="background: linear-gradient(135deg, #16a34a, #22c55e); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                <h1 style="margin: 0; font-size: 28px;">🎉 Order Confirmed!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for choosing Jadimart</p>
              </div>
              
              <div style="padding: 30px; background: #f8fafc;">
                <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
                  <h2 style="color: #16a34a; margin-top: 0;">Hello ${shippingDetails.name}! 👋</h2>
                  <p style="color: #374151; line-height: 1.6;">
                    We're excited to confirm that your order has been successfully placed! 
                    Our team is now preparing your premium herbal products with utmost care.
                  </p>
                </div>

                <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
                  <h2 style="color: #16a34a; margin-top: 0;">📦 Your Order Details</h2>
                  <ul style="list-style: none; padding: 0; margin: 0;">${customerItemList}</ul>
                  <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #16a34a;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                      <span style="color: #6b7280;">Subtotal:</span>
                      <span style="color: #374151;">Rs. ${totalAmount}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                      <span style="color: #6b7280;">Shipping:</span>
                      <span style="color: #16a34a; font-weight: 600;">FREE</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #16a34a; padding-top: 10px; border-top: 1px solid #e5e7eb;">
                      <span>Total Paid:</span>
                      <span>Rs. ${totalAmount}</span>
                    </div>
                  </div>
                </div>

                <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
                  <h2 style="color: #16a34a; margin-top: 0;">� Shipping Information</h2>
                  <p style="color: #374151; margin-bottom: 15px;"><strong>Delivery Address:</strong></p>
                  <div style="background: #f8fafc; padding: 15px; border-radius: 8px; color: #374151;">
                    ${shippingDetails.name}<br>
                    ${shippingDetails.phone}<br>
                    ${shippingDetails.address}
                  </div>
                  <p style="color: #6b7280; margin-top: 15px; font-size: 14px;">
                    📅 <strong>Estimated Delivery:</strong> 2-3 business days<br>
                    📱 You'll receive tracking information via SMS and email once your order ships.
                  </p>
                </div>

                <div style="background: #16a34a; color: white; padding: 20px; border-radius: 8px; text-align: center;">
                  <h3 style="margin: 0 0 10px 0;">Need Help?</h3>
                  <p style="margin: 0; font-size: 14px;">
                    📧 Email: <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #ffffff; text-decoration: underline;">${process.env.ADMIN_EMAIL}</a><br>
                    📞 Phone: +977-9876543210
                  </p>
                  <p style="margin: 15px 0 5px 0; font-size: 12px; opacity: 0.8;">Order ID: ${newOrder._id}</p>
                </div>

                <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
                  <p>Thank you for supporting natural wellness with Jadimart! 🌿</p>
                </div>
              </div>
            </div>
          `,
        });

        console.log(
          "✅ Order notification emails sent successfully to admin and customer"
        );
      } catch (emailError) {
        console.error(
          "❌ Failed to send order notification emails:",
          emailError
        );
        // Don't throw error - email failure shouldn't affect order creation
      }
    });

    // Return success immediately without waiting for email
    return NextResponse.json({
      message: "Order placed successfully!",
      order: newOrder,
      success: true,
    });
  } catch (error) {
    console.error("Order POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
