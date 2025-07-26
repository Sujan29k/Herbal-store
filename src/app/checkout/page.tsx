"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export default function CheckoutPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  // Load Buy Now product or Cart
  useEffect(() => {
    async function load() {
      if (productId) {
        // Buy Now flow
        try {
          const res = await fetch(`/api/products/${productId}`);
          const product = await res.json();
          setProducts([product]);
        } catch (err) {
          console.error("Failed to fetch product");
        }
      } else {
        // Cart flow
        const items = JSON.parse(localStorage.getItem("cart") || "[]");
        setProducts(items);
      }

      setLoading(false);
    }

    load();
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill in all fields.");
      return;
    }

    const total = products.reduce((sum, item) => sum + item.price, 0);

    alert(
      `✅ Order placed!\n\nName: ${form.name}\nTotal: ₹${total}\n\n(You can integrate email/SMS API here.)`
    );

    // Optionally clear cart
    localStorage.removeItem("cart");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {loading ? (
        <p>Loading items...</p>
      ) : products.length === 0 ? (
        <p>No items to checkout.</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {products.map((item, index) => (
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
            <p className="text-right font-semibold">
              Total: ₹{products.reduce((sum, item) => sum + item.price, 0)}
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <textarea
              name="address"
              placeholder="Shipping Address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Confirm Purchase
            </button>
          </div>
        </>
      )}
    </div>
  );
}
