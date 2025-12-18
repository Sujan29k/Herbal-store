"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBox,
  FaShoppingCart,
  FaChartLine,
  FaUsers,
  FaCloudUploadAlt,
  FaEye,
  FaHome,
  FaSignOutAlt,
  FaLeaf,
} from "react-icons/fa";
import { signOut } from "next-auth/react";

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
  userEmail?: string;
  isGuest?: boolean;
  items: OrderItem[];
  totalAmount: number;
  shippingDetails: ShippingDetails;
  status: string;
  createdAt: string;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders">("dashboard");
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "" });
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
      if (res.ok) fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
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
      if (res.ok) fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  }

  function getStatusColor(status: string) {
    const colors: Record<string, string> = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      confirmed: "bg-blue-50 text-blue-700 border-blue-200",
      shipped: "bg-purple-50 text-purple-700 border-purple-200",
      delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
    return colors[status] || "bg-gray-50 text-gray-700 border-gray-200";
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm((prev) => ({ ...prev, image: reader.result as string }));
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, price: parseFloat(form.price), description: form.description, image: form.image }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      setForm({ name: "", price: "", description: "", image: "" });
      fetchProducts();
    }
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
              <FaLeaf className="text-white text-lg" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800">JadiMart</h1>
              <p className="text-xs text-slate-500">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "dashboard" as const, label: "Dashboard", icon: FaChartLine },
            { id: "products" as const, label: "Products", icon: FaBox },
            { id: "orders" as const, label: "Orders", icon: FaShoppingCart },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <item.icon />
              <span className="font-medium">{item.label}</span>
              {item.id === "orders" && pendingOrders > 0 && (
                <span className={`ml-auto px-2 py-0.5 text-xs rounded-full ${activeTab === item.id ? "bg-white/20" : "bg-amber-100 text-amber-700"}`}>
                  {pendingOrders}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-1">
          <Link href="/dash" className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50">
            <FaHome className="text-slate-400" />
            <span className="font-medium">Back to Store</span>
          </Link>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600">
            <FaSignOutAlt className="text-slate-400" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-5">
          <h2 className="text-2xl font-bold text-slate-800 capitalize">{activeTab}</h2>
          <p className="text-slate-500 text-sm">
            {activeTab === "dashboard" && "Overview of your store performance"}
            {activeTab === "products" && "Manage your product inventory"}
            {activeTab === "orders" && "Track and manage customer orders"}
          </p>
        </header>

        <div className="p-8">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Total Revenue", value: `Rs. ${totalRevenue.toLocaleString()}`, icon: FaChartLine, color: "emerald" },
                  { label: "Total Orders", value: orders.length, icon: FaShoppingCart, color: "blue" },
                  { label: "Products", value: products.length, icon: FaBox, color: "purple" },
                  { label: "Customers", value: new Set(orders.map((o) => o.userEmail || "Guest")).size, icon: FaUsers, color: "amber" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                      <stat.icon className={`text-${stat.color}-600 text-xl`} />
                    </div>
                    <p className="text-slate-500 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
                  <h3 className="text-amber-100 mb-1">Pending</h3>
                  <p className="text-4xl font-bold">{pendingOrders}</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl p-6 text-white">
                  <h3 className="text-emerald-100 mb-1">Delivered</h3>
                  <p className="text-4xl font-bold">{deliveredOrders}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
                  <h3 className="text-blue-100 mb-1">Avg. Order</h3>
                  <p className="text-4xl font-bold">Rs. {orders.length ? Math.round(totalRevenue / orders.length) : 0}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-800">Recent Orders</h3>
                  <button onClick={() => setActiveTab("orders")} className="text-emerald-600 text-sm font-medium">View All →</button>
                </div>
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      {["Order", "Customer", "Amount", "Status", "Date"].map((h) => (
                        <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order._id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-800">#{order._id.slice(-6)}</td>
                        <td className="px-6 py-4 text-slate-600">{order.userEmail || "Guest"}</td>
                        <td className="px-6 py-4 font-semibold">Rs. {order.totalAmount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>{order.status}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Products */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-500 to-green-600">
                  <h3 className="font-semibold text-white flex items-center space-x-2"><FaPlus /><span>Add New Product</span></h3>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter product name" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Price (Rs.)</label>
                      <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Enter price" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Enter description" rows={3} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50 resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Product Image</label>
                    <label className="flex items-center justify-center px-4 py-6 border-2 border-dashed border-slate-300 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer transition-all">
                      <div className="text-center">
                        <FaCloudUploadAlt className="mx-auto text-3xl text-slate-400 mb-2" />
                        <p className="text-slate-600 font-medium">Click to upload image</p>
                      </div>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" required />
                    </label>
                    {form.image && <Image src={form.image} alt="Preview" width={80} height={80} className="mt-3 w-20 h-20 object-cover rounded-xl border" />}
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center space-x-2">
                    {loading ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" /> : <><FaPlus /><span>Add Product</span></>}
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">All Products ({products.length})</h3>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <div key={product._id} className="group bg-slate-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all border border-slate-100">
                      <div className="relative overflow-hidden">
                        <Image src={product.image} alt={product.name} width={300} height={200} className="w-full h-44 object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-slate-800 mb-1 line-clamp-1">{product.name}</h4>
                        <p className="text-slate-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-emerald-600 font-bold text-lg">Rs. {product.price}</span>
                          <div className="flex space-x-2">
                            <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><FaEdit className="text-sm" /></button>
                            <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><FaTrash className="text-sm" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">All Orders ({orders.length})</h3>
              </div>
              <div className="p-6 space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all bg-slate-50/50">
                    <div className="flex flex-wrap gap-4 justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold text-slate-800 text-lg">#{order._id.slice(-8)}</h4>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>{order.status}</span>
                        </div>
                        <p className="text-slate-500 text-sm mt-1">{order.userEmail || "Guest"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">Rs. {order.totalAmount}</p>
                        <p className="text-slate-400 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white rounded-xl p-4 border border-slate-200">
                        <h5 className="font-medium text-slate-800 mb-2">📦 Shipping</h5>
                        <div className="text-sm text-slate-600 space-y-1">
                          <p className="font-medium">{order.shippingDetails.name}</p>
                          <p>{order.shippingDetails.phone}</p>
                          <p>{order.shippingDetails.address}</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-slate-200">
                        <h5 className="font-medium text-slate-800 mb-2">🛒 Items</h5>
                        <ul className="text-sm text-slate-600 space-y-1">
                          {order.items.map((item, i) => (
                            <li key={i} className="flex justify-between">
                              <span>{item.productId?.name || "Unknown"} × {item.quantity}</span>
                              <span className="font-medium">Rs. {(item.productId?.price || 0) * item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                      <p className="text-sm text-slate-400">{new Date(order.createdAt).toLocaleString()}</p>
                      <div className="flex items-center gap-2">
                        <select value={order.status} onChange={(e) => updateOrderStatus(order._id, e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 bg-white">
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                        {order.status === "delivered" && (
                          <button onClick={() => deleteOrder(order._id)} className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200"><FaTrash /></button>
                        )}
                        <button className="p-2 bg-emerald-100 text-emerald-600 rounded-xl hover:bg-emerald-200"><FaEye /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
