"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
}

function CheckoutPageContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchCartProducts = async () => {
      const productId = searchParams.get("productId");

      // BUY NOW FLOW
      if (productId) {
        const res = await fetch(`/api/products/${productId}`);
        const product = await res.json();
        setProducts([{ ...product, quantity: 1 }]);
        return;
      }

      // CART FLOW
      if (session?.user) {
        const res = await fetch(`/api/cart?email=${session.user.email}`);
        const data = await res.json();

        interface CartItem {
          productId: { _id: string };
          quantity: number;
        }

        const productPromises = data.items.map(async (item: CartItem) => {
          const res = await fetch(`/api/products/${item.productId._id}`);
          const product = await res.json();
          return {
            ...product,
            quantity: item.quantity,
          };
        });

        const productList = await Promise.all(productPromises);
        setProducts(productList);
      } else {
        const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

        interface LocalCartItem {
          _id: string;
          quantity?: number;
        }

        const productPromises = cartItems.map(async (item: LocalCartItem) => {
          const res = await fetch(`/api/products/${item._id}`);
          const product = await res.json();
          return {
            ...product,
            quantity: item.quantity || 1,
          };
        });

        const productList = await Promise.all(productPromises);
        setProducts(productList);
      }
    };

    fetchCartProducts();
  }, [searchParams, session]);

  // Pre-fill email for logged-in users
  useEffect(() => {
    if (session?.user?.email) {
      setForm((prev) => ({
        ...prev,
        email: session.user?.email || "",
      }));
    }
  }, [session]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // Check email requirement for guest users
    if (!session && !form.email.trim()) {
      alert("Email is required for checkout.");
      return false;
    }

    if (!form.name.trim()) {
      alert("Name is required.");
      return false;
    }
    if (!form.address.trim()) {
      alert("Address is required.");
      return false;
    }
    if (!form.phone.trim()) {
      alert("Phone number is required.");
      return false;
    }
    return true;
  };

  const handleConfirmPurchase = async () => {
    if (!validateForm()) return;

    // For guest users, use the email from the form
    const userEmail = session?.user?.email || form.email;

    if (!userEmail) {
      alert("Please provide your email address.");
      return;
    }

    setIsProcessing(true); // Start loading

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          items: products.map((item) => ({
            productId: item._id,
            quantity: item.quantity || 1,
          })),
          totalAmount: products.reduce(
            (sum, item) => sum + item.price * (item.quantity || 1),
            0
          ),
          shippingDetails: form,
          isGuest: !session, // Flag to indicate guest purchase
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Clear cart immediately
        localStorage.removeItem("cart");

        // Show success message
        alert(
          "🎉 Order placed successfully! You will receive a confirmation email shortly."
        );

        // Redirect to thank you page immediately
        router.push("/thankyou");
      } else {
        alert(data.error || "Failed to place order. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong while placing the order. Please try again.");
      console.error("Order error:", error);
    } finally {
      setIsProcessing(false); // Stop loading
    }
  };

  const total = products.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">
            Complete your order and get your herbal products delivered
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                1
              </span>
              Shipping Information
              {!session && (
                <span className="ml-3 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Guest Checkout
                </span>
              )}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                  {!session && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder={
                    session
                      ? "Enter your email"
                      : "Enter your email (required for order confirmation)"
                  }
                  value={form.email}
                  onChange={handleInputChange}
                  disabled={!!session?.user?.email}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    session?.user?.email
                      ? "bg-gray-100 border-gray-200 text-gray-600"
                      : !session
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300"
                  }`}
                />
                {session?.user?.email && (
                  <p className="text-sm text-gray-500 mt-1">
                    Using your account email
                  </p>
                )}
                {!session && (
                  <p className="text-sm text-gray-600 mt-1">
                    Your email will be used for order confirmation and updates
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Address
                </label>
                <textarea
                  name="address"
                  placeholder="Enter your complete shipping address"
                  value={form.address}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                2
              </span>
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-green-600 font-medium">
                      Rs. {product.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty: {product.quantity || 1}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      Rs. {(product.price * (product.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">Rs. {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    Rs. {total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmPurchase}
              disabled={isProcessing}
              className={`w-full mt-8 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform shadow-lg hover:shadow-xl ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:scale-105"
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing Order...</span>
                </div>
              ) : (
                "Complete Purchase"
              )}
            </button>

            {/* Security Notice */}
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700 text-center">
                🔒 Your information is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutPageContent />
    </Suspense>
  );
}
