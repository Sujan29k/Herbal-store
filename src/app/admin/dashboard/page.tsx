'use client';

import { useState, useEffect } from 'react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function AdminDashboard() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/admin/add-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        price: parseFloat(form.price),
        description: form.description,
        image: form.image,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert('✅ Product added successfully!');
      setForm({ name: '', price: '', description: '', image: '' });
      fetchProducts();
    } else {
      alert('❌ Failed to add product: ' + data.error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border p-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white p-2 px-4 rounded"
        >
          {loading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded p-4 shadow hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-700 font-semibold mt-1">Rs. {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
