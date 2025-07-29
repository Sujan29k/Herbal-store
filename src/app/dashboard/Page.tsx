"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
}

export default function UserDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      const isGuest = localStorage.getItem("guest") === "true";
      setIsLoggedIn(!isGuest);
    } else {
      setIsLoggedIn(false);
    }
  }, [session]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch {
        console.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: Product) => {
    if (isLoggedIn && session?.user?.email) {
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product._id,
            email: session.user.email,
            quantity: 1,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          console.error("Error adding to cart:", data);
          alert("❌ Failed to add to cart: " + data.error);
          return;
        }

        alert(`✅ "${product.name}" added to cart`);
      } catch (err) {
        console.error("Error adding to cart:", err);
        alert("❌ Failed to add to cart");
      }
    } else {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const index = existingCart.findIndex(
        (item: Product) => item._id === product._id
      );

      if (index > -1) {
        existingCart[index].quantity = (existingCart[index].quantity || 1) + 1;
      } else {
        existingCart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));
      alert(`✅ "${product.name}" added to cart`);
    }
  };

  const handleBuyNow = (product: Product) => {
    if (!isLoggedIn) {
      alert(
        "You are continuing as a guest. Log in at checkout to save your order history."
      );
    }
    router.push(`/checkout?productId=${product._id}`);
  };

  const handleLogout = async () => {
    localStorage.removeItem("guest");
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Explore Herbal Products 🌿</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/cart")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            🛒 View Cart
          </button>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              title={product.name}
              price={product.price}
              image={product.image}
              onAddToCart={() => handleAddToCart(product)}
              onBuyNow={() => handleBuyNow(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
