"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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

  useEffect(() => {
    async function fetchCart() {
      if (session?.user) {
        const res = await fetch(`/api/cart?email=${session.user.email}`);
        const data = await res.json();
        setCartItems(data.items || []);
      } else {
        const localCart = localStorage.getItem("cart");
        if (localCart) {
          const parsed = JSON.parse(localCart);
          setCartItems(parsed);
        }
      }
      setLoading(false);
    }

    fetchCart();
  }, [session]);

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
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };

  const handleDelete = async (productId: string) => {
    const updated = cartItems.filter(
      (item) => (item.productId?._id || item._id) !== productId
    );
    setCartItems(updated);

    if (session?.user) {
      await fetch(
        `/api/cart?email=${session.user.email}&productId=${productId}`,
        {
          method: "DELETE",
        }
      );
    } else {
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.productId?.price ?? item.price ?? 0;
      return total + price * item.quantity;
    }, 0);
  };

  const handleProceedToBuy = () => {
    router.push("/checkout");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => {
            const product = item.productId;
            const name = product?.name ?? item.name ?? "Product";
            const price = product?.price ?? item.price ?? 0;
            const image = product?.image ?? item.image ?? "";
            const id = product?._id ?? item._id ?? "";

            return (
              <div
                key={index}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{name}</h2>
                  <p>
                    Price: ₹{price} × {item.quantity} = ₹{price * item.quantity}
                  </p>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => handleQuantityChange(id, -1)}
                      disabled={item.quantity <= 1}
                      className="px-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(id, 1)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <img
                  src={image}
                  alt={name}
                  className="h-16 w-16 object-cover rounded"
                />
                <button
                  onClick={() => handleDelete(id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            );
          })}
          <div className="text-right font-bold text-xl mt-4">
            Total: ₹{getTotal()}
          </div>
          <button
            onClick={handleProceedToBuy}
            className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Proceed to Buy
          </button>
        </div>
      )}
    </div>
  );
}
