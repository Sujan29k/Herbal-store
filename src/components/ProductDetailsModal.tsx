"use client";

import React from "react";
import Image from "next/image";
import {
  FaTimes,
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaLeaf,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onBuyNow,
}) => {
  if (!isOpen || !product) return null;

  const rating = 4.5; // You can make this dynamic later

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors duration-200"
          >
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square w-full bg-gray-50 rounded-2xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
              NEW
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${
                      i < Math.floor(rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600 font-medium">
                ({rating}) • 324 reviews
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">
                  Rs. {product.price}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  Rs. {Math.round(product.price * 1.2)}
                </span>
              </div>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                20% OFF
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <FaLeaf className="text-green-600" />
                <span>Product Description</span>
              </h3>
              <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 rounded-2xl p-6 lg:p-8 border-2 border-green-100 shadow-lg">
                <div className="relative">
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-500 rounded-full opacity-60"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full opacity-40"></div>
                  <p className="text-gray-800 leading-relaxed text-base lg:text-lg font-medium">
                    {product.description ||
                      "This premium herbal product is carefully crafted using the finest natural ingredients sourced from organic farms. Our products undergo rigorous quality testing to ensure purity, potency, and safety. Experience the power of nature's healing with this exceptional herbal remedy, designed to support your wellness journey naturally."}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-green-200">
                  <div className="flex items-center justify-between text-sm text-green-700">
                    <span className="flex items-center space-x-1">
                      <FaShieldAlt className="text-xs" />
                      <span>Quality Assured</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FaLeaf className="text-xs" />
                      <span>100% Natural</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                Key Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <FaLeaf className="text-green-600 text-xl" />
                  <span className="text-sm lg:text-base font-semibold text-gray-700">
                    100% Natural
                  </span>
                </div>
                <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <FaShieldAlt className="text-blue-600 text-xl" />
                  <span className="text-sm lg:text-base font-semibold text-gray-700">
                    Quality Tested
                  </span>
                </div>
                <div className="flex items-center space-x-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <FaTruck className="text-orange-600 text-xl" />
                  <span className="text-sm lg:text-base font-semibold text-gray-700">
                    Fast Delivery
                  </span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                Ingredients & Composition
              </h3>
              <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-lime-50 rounded-xl p-6 border border-green-200 shadow-sm">
                <div className="space-y-3">
                  <p className="text-gray-800 text-sm lg:text-base">
                    <strong className="text-green-700 text-lg">
                      Primary Ingredients:
                    </strong>
                    <span className="ml-2">
                      Organic herbs, natural extracts, pure essential oils
                    </span>
                  </p>
                  <p className="text-gray-800 text-sm lg:text-base">
                    <strong className="text-green-700 text-lg">
                      Purity Promise:
                    </strong>
                    <span className="ml-2">
                      Free from chemicals, preservatives, and synthetic
                      compounds
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                onClick={() => {
                  onAddToCart();
                  onClose();
                }}
                className="flex-1 bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <FaShoppingCart />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => {
                  onBuyNow();
                  onClose();
                }}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <FaBolt />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 bg-gray-50 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">SKU:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {product._id.slice(-6).toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Category:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    Herbal Products
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Stock:</span>
                  <span className="ml-2 font-medium text-green-600">
                    In Stock
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Shipping:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    2-3 Days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
