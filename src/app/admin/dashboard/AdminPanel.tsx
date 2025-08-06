"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBox,
  FaShoppingCart,
  FaDollarSign,
  FaUsers,
  FaCloudUploadAlt,
  FaEye,
} from "react-icons/fa";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface PopulatedProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface OrderItem {
  productId: PopulatedProduct;
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
  userId?: { email: string } | null;
  guestEmail?: string;
  userEmail?: string; // Added from API transformation
  isGuest?: boolean; // Added from API transformation
  items: OrderItem[];
  totalAmount: number;
  shippingDetails: ShippingDetails;
  status: string;
  createdAt: string;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "products" | "orders"
  >("dashboard");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  async function fetchOrders() {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data);
  }

  async function updateOrderStatus(orderId: string, newStatus: string) {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (res.ok) {
        alert(`✅ Order status updated to ${newStatus}`);
        fetchOrders(); // Refresh orders
      } else {
        alert("❌ Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("❌ Failed to update order status");
    }
  }

  async function deleteOrder(orderId: string) {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch("/api/admin/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (res.ok) {
        alert("✅ Order deleted successfully");
        fetchOrders(); // Refresh orders
      } else {
        alert("❌ Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("❌ Failed to delete order");
    }
  }

  function getStatusColor(status: string) {
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
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        price: parseFloat(form.price),
        description: form.description,
        image: form.image,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("✅ Product added successfully!");
      setForm({ name: "", price: "", description: "", image: "" });
      fetchProducts();
    } else {
      alert("❌ Failed to add product: " + data.error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your herbal store efficiently
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Online
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                {
                  id: "dashboard" as const,
                  label: "Dashboard",
                  icon: FaDollarSign,
                },
                { id: "products" as const, label: "Products", icon: FaBox },
                {
                  id: "orders" as const,
                  label: "Orders",
                  icon: FaShoppingCart,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Dashboard Overview */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-md bg-green-100">
                    <FaDollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      Rs.{" "}
                      {orders
                        .reduce((sum, order) => sum + order.totalAmount, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-md bg-blue-100">
                    <FaShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">
                      Total Orders
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {orders.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-md bg-purple-100">
                    <FaBox className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">
                      Total Products
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {products.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 rounded-md bg-orange-100">
                    <FaUsers className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">
                      Customers
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {
                        new Set(
                          orders.map(
                            (order) =>
                              order.userEmail || order.userId?.email || "Guest"
                          )
                        ).size
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Orders
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order._id.slice(-6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.userEmail || "Guest User"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Rs. {order.totalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Management */}
        {activeTab === "products" && (
          <div className="space-y-8">
            {/* Add Product Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                  <FaPlus />
                  <span>Add New Product</span>
                </h3>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter product name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (Rs.)
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter price"
                      value={form.price}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Enter product description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                    <FaCloudUploadAlt className="text-gray-400 text-xl" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Adding Product...</span>
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      <span>Add Product</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Products Grid */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  All Products ({products.length})
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={160}
                        className="w-full h-40 object-cover mb-3 rounded-lg"
                      />
                      <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-green-600 font-bold text-lg mb-3">
                        Rs. {product.price}
                      </p>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded transition-colors flex items-center justify-center space-x-1">
                          <FaEdit />
                          <span>Edit</span>
                        </button>
                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs py-2 px-3 rounded transition-colors flex items-center justify-center space-x-1">
                          <FaTrash />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Management */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                All Orders ({orders.length})
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Order #{order._id.slice(-8)}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {order.userEmail || "Guest Customer"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 text-lg">
                        Rs. {order.totalAmount}
                      </p>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">
                        Shipping Details
                      </h5>
                      <p className="text-sm text-gray-600">
                        {order.shippingDetails.name}
                        <br />
                        {order.shippingDetails.phone}
                        <br />
                        {order.shippingDetails.address}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">
                        Items Ordered
                      </h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>
                              {item.productId?.name || "Unknown Product"} ×{" "}
                              {item.quantity}
                            </span>
                            <span>Rs. {item.productId?.price || 0}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Order Management Actions */}
                  <div className="flex flex-wrap justify-between items-center pt-4 border-t border-gray-200 gap-4">
                    <p className="text-sm text-gray-500">
                      Ordered on {new Date(order.createdAt).toLocaleString()}
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Status Update Dropdown */}
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order._id, e.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>

                      {/* Delete Order Button - Only show for delivered orders */}
                      {order.status === "delivered" && (
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-1"
                        >
                          <FaTrash />
                          <span>Delete</span>
                        </button>
                      )}

                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-1">
                        <FaEye />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
