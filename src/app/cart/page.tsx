"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const router = useRouter(); // ← import router

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);
  }, []);

  const handleProceedToBuy = () => {
    // Navigate to /checkout
    router.push("/checkout");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>Price: ₹{item.price}</p>
              </div>
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 object-cover rounded"
              />
            </div>
          ))}
          <button
            onClick={handleProceedToBuy}
            className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Proceed to Buy ({cartItems.length} item{cartItems.length > 1 && "s"}
            )
          </button>
        </div>
      )}
    </div>
  );
}
