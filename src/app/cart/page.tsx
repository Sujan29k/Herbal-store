"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaArrowLeft,
} from "react-icons/fa";

interface CartItem {
  _id?: string;
  productId?: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  name?: string;
  price?: number;
  image?: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  // Fetch cart on page load or when session changes
  useEffect(() => {
    async function fetchCart() {
      try {
        if (session?.user) {
          // Logged-in user: fetch from DB
          const res = await fetch(`/api/cart?email=${session.user.email}`);
          const data = await res.json();
          console.log("Fetched DB cart:", data);
          setCartItems(data.items || []);
        } else {
          // Guest: fetch from localStorage
          const localCart = localStorage.getItem("cart");
          if (localCart) {
            const parsed = JSON.parse(localCart);
            console.log("Fetched local cart:", parsed);
            setCartItems(parsed);
          }
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [session]);

  // Change quantity of an item
  const handleQuantityChange = async (productId: string, delta: number) => {
    const updated = cartItems.map((item) => {
      const id = item.productId?._id || item._id;
      if (id === productId) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty < 1 ? 1 : newQty };
      }
      return item;
    });

    setCartItems(updated);

    if (session?.user) {
      // Update in DB
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          productId,
          quantity: delta,
        }),
      });
    } else {
      // Update in localStorage
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };

  // Delete an item from cart
  const handleDelete = async (productId: string) => {
    const updated = cartItems.filter(
      (item) => (item.productId?._id || item._id) !== productId
    );
    setCartItems(updated);

    if (session?.user) {
      // Remove from DB
      await fetch(
        `/api/cart?email=${session.user.email}&productId=${productId}`,
        { method: "DELETE" }
      );
    } else {
      // Remove from localStorage
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };

  // Compute total cost
  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.productId?.price ?? item.price ?? 0;
      return total + price * item.quantity;
    }, 0);
  };

  // Proceed to checkout
  const handleProceedToBuy = () => {
    router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              <FaArrowLeft />
              <span>Continue Shopping</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <FaShoppingBag className="text-green-600" />
            <span>Shopping Cart</span>
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Cart Items ({cartItems.length})
                </h2>
                <div className="space-y-6">
                  {cartItems.map((item) => {
                    const id = item.productId?._id || item._id || "";
                    const name = item.productId?.name || item.name || "";
                    const price = item.productId?.price || item.price || 0;
                    const image = item.productId?.image || item.image || "";

                    return (
                      <div
                        key={id}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="relative">
                          <Image
                            src={image}
                            alt={name}
                            width={80}
                            height={80}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg">
                            {name}
                          </h3>
                          <p className="text-green-600 font-semibold text-lg">
                            Rs. {price}
                          </p>
                          <p className="text-sm text-gray-600">
                            Subtotal: Rs. {(price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2 bg-white rounded-lg border">
                            <button
                              onClick={() => handleQuantityChange(id, -1)}
                              disabled={item.quantity <= 1}
                              className="p-2 text-gray-600 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <FaMinus />
                            </button>
                            <span className="w-12 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(id, 1)}
                              className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                            >
                              <FaPlus />
                            </button>
                          </div>

                          <button
                            onClick={() => handleDelete(id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">Rs. {getTotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">Rs. 0</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        Rs. {getTotal()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleProceedToBuy}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4"
                >
                  Proceed to Checkout
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    🔒 Secure checkout guaranteed
                  </p>
                </div>

                {/* Continue Shopping */}
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full mt-4 border border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
