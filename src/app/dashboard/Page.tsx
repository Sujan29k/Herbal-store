"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductDetailsModal from "@/components/ProductDetailsModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaSearch, FaThLarge, FaList } from "react-icons/fa";
import Image from "next/image";

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
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
        console.log("Fetching products...");
        const res = await fetch("/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Products fetched successfully:", data.length);
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Set empty array as fallback
        setProducts([]);
        setFilteredProducts([]);
        // Show user-friendly error message
        alert("Failed to load products. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category (you can expand this based on your product categories)
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy]);

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

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="ml-4 text-lg text-gray-600">
              Loading amazing products...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          {session?.user && (session.user as any)?.role === "admin" && (
            <div className="mb-6">
              <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 rounded-xl p-4 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-3">
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Admin
                  </span>
                  <button
                    onClick={() => router.push("/admin/dashboard")}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm flex items-center space-x-2"
                  >
                    <span>⚙️</span>
                    <span>Go to Admin Panel</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Discover Our
            <span className="text-green-600"> Premium Collection</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Handpicked herbal products sourced from the finest organic farms
            around the world
          </p>
        </div>

        {/* Enhanced Filter/Search Bar */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {/* Search Input */}
            <div className="relative sm:col-span-2 lg:col-span-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm lg:text-base"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm lg:text-base"
            >
              <option value="all">All Categories</option>
              <option value="herb">Herbs</option>
              <option value="oil">Essential Oils</option>
              <option value="supplement">Supplements</option>
              <option value="tea">Herbal Teas</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm lg:text-base"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* View Mode Toggle & Cart Button */}
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  <FaThLarge />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  <FaList />
                </button>
              </div>

              <button
                onClick={() => router.push("/cart")}
                className="bg-green-600 hover:bg-green-700 text-white px-3 lg:px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2 text-sm lg:text-base"
              >
                <span>🛒</span>
                <span className="hidden sm:inline">Cart</span>
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <span className="text-gray-600 text-sm">
              Showing {filteredProducts.length} of {products.length} products
            </span>
            {filteredProducts.length !== products.length && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSortBy("name");
                }}
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 px-2 sm:px-0">
            {filteredProducts.map((product) => (
              <div key={product._id} className="h-full">
                <ProductCard
                  title={product.name}
                  price={product.price}
                  image={product.image}
                  rating={4.5}
                  onAddToCart={() => handleAddToCart(product)}
                  onBuyNow={() => handleBuyNow(product)}
                  onViewDetails={() => handleViewDetails(product)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 lg:space-y-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 hover:shadow-xl transition-shadow"
              >
                <div className="w-full sm:w-auto flex justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={96}
                    height={96}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl"
                  />
                </div>
                <div className="flex-1 w-full">
                  <h3
                    className="text-lg lg:text-xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-green-600 transition-colors"
                    onClick={() => handleViewDetails(product)}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-gray-600 mb-3 text-sm lg:text-base line-clamp-2 cursor-pointer hover:text-gray-800 transition-colors"
                    onClick={() => handleViewDetails(product)}
                    title="Click to view full description"
                  >
                    {product.description}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                    <span className="text-xl lg:text-2xl font-bold text-green-600">
                      Rs. {product.price}
                    </span>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <button
                        onClick={() => handleViewDetails(product)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm lg:text-base flex items-center justify-center space-x-2"
                      >
                        <span>🔍</span>
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm lg:text-base"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm lg:text-base"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filters"
                : "We're working on adding amazing products. Check back soon!"}
            </p>
            {(searchTerm || selectedCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSortBy("name");
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Product Details Modal */}
        <ProductDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          product={selectedProduct}
          onAddToCart={() =>
            selectedProduct && handleAddToCart(selectedProduct)
          }
          onBuyNow={() => selectedProduct && handleBuyNow(selectedProduct)}
        />
      </div>
    </div>
  );
}
