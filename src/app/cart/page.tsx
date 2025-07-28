"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface GuestCartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  _id?: string;
  productId?: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  // For guest fallback
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
        try {
          const res = await fetch(`/api/cart?email=${session.user.email}`);
          const data = await res.json();
          setCartItems(data.items || []);
        } catch {
          console.error("Failed to fetch cart");
        }
      } else {
        const localItems: GuestCartItem[] = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );
        const transformed = localItems.map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
        }));
        setCartItems(transformed);
      }
      setLoading(false);
    }

    fetchCart();
  }, [session]);

  const handleDelete = async (productId: string) => {
    if (session?.user) {
      await fetch(
        `/api/cart?email=${session.user.email}&productId=${productId}`,
        {
          method: "DELETE",
        }
      );
      setCartItems((prev) =>
        prev.filter((item) => item.productId?._id !== productId)
      );
    } else {
      const updated = cartItems.filter((item) => item._id !== productId);
      localStorage.setItem("cart", JSON.stringify(updated));
      setCartItems(updated);
    }
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
            const name = product?.name || item.name;
            const price = product?.price || item.price;
            const image = product?.image || item.image;
            const id = product?._id || item._id;

            return (
              <div
                key={index}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{name}</h2>
                  <p>Price: ₹{price}</p>
                </div>
                <img
                  src={image}
                  alt={name}
                  className="h-16 w-16 object-cover rounded"
                />
                <button
                  onClick={() => handleDelete(id!)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            );
          })}
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
