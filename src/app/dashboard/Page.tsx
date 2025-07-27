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
}

export default function UserDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { data: session } = useSession();
  const isLoggedIn =
    session?.user &&
    typeof window !== "undefined" &&
    localStorage.getItem("guest") !== "true";

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

  const handleAddToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`✅ "${product.name}" added to cart`);
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
