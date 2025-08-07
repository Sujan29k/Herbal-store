"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaHome, FaShoppingBag } from "react-icons/fa";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="relative mb-8">
            <div className="bg-green-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-6xl text-green-600" />
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-800 rounded-full w-12 h-12 flex items-center justify-center animate-bounce">
              <span className="text-2xl">🎉</span>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Thank you for choosing our herbal products! We&apos;ve sent a
            confirmation email with your order details. Our team is now
            preparing your order with care and you&apos;ll receive tracking
            information shortly.
          </p>

          {/* Order Details */}
          <div className="bg-green-50 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/delivery.png"
                alt="Delivery"
                width={120}
                height={120}
                className="rounded-xl"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What happens next?
            </h3>
            <ul className="text-gray-600 space-y-2 text-left max-w-md mx-auto">
              <li className="flex items-center space-x-3">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  1
                </span>
                <span>Confirmation email sent to your inbox</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  2
                </span>
                <span>Products carefully packaged</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  3
                </span>
                <span>Shipped within 24-48 hours</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  4
                </span>
                <span>Tracking details sent via email & SMS</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <FaHome />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/dashboard"
              className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaShoppingBag />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Need help? Contact us at{" "}
              <a
                href="mailto:support@herbalstore.com"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                support@herbalstore.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:+1234567890"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                +123 456 7890
              </a>
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-6 flex items-center justify-center space-x-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-xl">
                ⭐
              </span>
            ))}
            <span className="ml-2 text-gray-600 text-sm">
              Trusted by 10,000+ happy customers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
