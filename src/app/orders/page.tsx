"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaBox, FaShoppingCart, FaCalendarAlt, FaUser } from "react-icons/fa";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface OrderItem {
  productId: Product;
  quantity: number;
}

interface ShippingDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  shippingDetails: ShippingDetails;
  status: string;
  createdAt: string;
}

export default function UserOrders() {
  const { data: session } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // If user is logged in, use their email
    if (session?.user?.email) {
      setEmail(session.user.email);
      fetchOrders(session.user.email);
    } else {
      setLoading(false);
    }
  }, [session]);

  const fetchOrders = async (userEmail: string) => {
    try {
      const res = await fetch(
        `/api/user/orders?email=${encodeURIComponent(userEmail)}`
      );
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestOrdersSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setLoading(true);
      fetchOrders(email.trim());
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "confirmed":
        return "✅";
      case "shipped":
        return "🚚";
      case "delivered":
        return "📦";
      default:
        return "❓";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="ml-4 text-lg text-gray-600">
              Loading your orders...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
            <FaShoppingCart className="text-green-600" />
            <span>My Orders</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your order history and current status
          </p>
        </div>

        {/* Guest Email Form */}
        {!session && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <FaUser className="text-green-600" />
              <span>Check Your Orders</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Enter your email address to view your order history (including
              guest orders)
            </p>
            <form onSubmit={handleGuestOrdersSubmit} className="flex space-x-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View Orders
              </button>
            </form>
          </div>
        )}

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-wrap justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <FaCalendarAlt />
                        <span>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FaBox />
                        <span>{order.items.length} item(s)</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      Rs. {order.totalAmount.toLocaleString()}
                    </p>
                    <span
                      className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      <span className="mr-2">
                        {getStatusIcon(order.status)}
                      </span>
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Items Ordered
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <Image
                          src={item.productId?.image || "/placeholder.png"}
                          alt={item.productId?.name || "Product"}
                          width={60}
                          height={60}
                          className="w-15 h-15 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900 text-sm">
                            {item.productId?.name || "Unknown Product"}
                          </h5>
                          <p className="text-xs text-gray-600">
                            Qty: {item.quantity} × Rs.{" "}
                            {item.productId?.price || 0}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Shipping Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p>
                        <strong>Name:</strong> {order.shippingDetails.name}
                      </p>
                      <p>
                        <strong>Phone:</strong> {order.shippingDetails.phone}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Email:</strong> {order.shippingDetails.email}
                      </p>
                      <p>
                        <strong>Address:</strong>{" "}
                        {order.shippingDetails.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-600 mb-6">
              {session
                ? "You haven't placed any orders yet."
                : "No orders found for this email address."}
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
