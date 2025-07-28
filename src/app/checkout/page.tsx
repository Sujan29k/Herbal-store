"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
}

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch products either for "Buy Now" or "Cart" flow
  useEffect(() => {
    const fetchCartProducts = async () => {
      const productId = searchParams.get("productId");

      // -----------------------
      // BUY NOW FLOW
      // -----------------------
      if (productId) {
        const res = await fetch(`/api/products/${productId}`);
        const product = await res.json();

        // Default quantity = 1 for Buy Now
        setProducts([{ ...product, quantity: 1 }]);
        return;
      }

      // -----------------------
      // CART FLOW
      // -----------------------
      if (session?.user) {
        // Fetch cart items for logged-in users
        const res = await fetch(`/api/cart?email=${session.user.email}`);
        const data = await res.json();

        const productPromises = data.items.map(async (item: any) => {
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
        // Guest: use localStorage cart
        const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

        const productPromises = cartItems.map(async (item: any) => {
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
  }, [session, searchParams]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirmPurchase = async () => {
    if (!session) {
      alert("Please log in to complete your purchase.");
      return;
    }

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email || "",
          items: products.map((item) => ({
            productId: item._id,
            quantity: item.quantity || 1,
          })),
          totalAmount: products.reduce(
            (sum, item) => sum + item.price * (item.quantity || 1),
            0
          ),
          shippingDetails: form,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        router.push("/thankyou");
      } else {
        alert(data.error || "Failed to place order.");
      }
    } catch (error) {
      alert("Something went wrong while placing the order.");
      console.error(error);
    }
  };

  const total = products.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Checkout</h1>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Shipping Information</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleInputChange}
        />
        <br />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={form.address}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <h2>Order Summary</h2>
        {products.map((product) => (
          <div
            key={product._id}
            style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem" }}
          >
            <p>
              <strong>{product.name}</strong>
            </p>
            <p>Price: ₹{product.price}</p>
            <p>Quantity: {product.quantity || 1}</p>
          </div>
        ))}
        <p>
          <strong>Total:</strong> ₹{total.toFixed(2)}
        </p>
      </div>

      <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
    </div>
  );
}
