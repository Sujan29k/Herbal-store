"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaLeaf,
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaRocket,
} from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      localStorage.removeItem("guest");
      router.push("/dashboard");
    } else {
      alert("Invalid email or password");
    }
    setIsLoading(false);
  };

  const handleGuest = () => {
    localStorage.setItem("guest", "true");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/jadimart.png"
              alt="Jadimart Logo"
              width={280}
              height={84}
              className="h-16 w-auto"
              priority
            />
          </div>
          <p className="text-gray-600 text-lg">
            Choose how you&apos;d like to continue
          </p>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Start - Guest Option (Most Prominent) */}
          <div className="lg:order-2 bg-gradient-to-br from-lime-400 to-green-500 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="mb-6">
                <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <FaRocket className="text-4xl text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Quick Start</h2>
                <p className="text-lime-100 mb-6">
                  Start shopping immediately without creating an account
                </p>
              </div>

              <button
                onClick={handleGuest}
                className="w-full bg-white text-green-600 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl mb-4"
              >
                Continue as Guest
              </button>

              <div className="text-lime-100 text-sm">
                ✓ No registration required
                <br />
                ✓ Shop instantly
                <br />✓ Track orders with email
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="lg:order-1 bg-white rounded-3xl p-8 shadow-xl border border-green-100">
            <div className="text-center mb-6">
              <FaUserShield className="mx-auto text-green-500 text-3xl mb-3" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

              {/* Google Sign In */}
              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-200 border border-gray-300 hover:border-gray-400 flex items-center justify-center space-x-3 shadow-sm hover:shadow-md"
              >
                <Image src="/google.png" alt="Google" width={20} height={20} />
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>

          {/* Sign Up Promotion */}
          <div className="lg:order-3 bg-gradient-to-br from-green-100 to-lime-100 rounded-3xl p-8 border border-green-200">
            <div className="text-center">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center mb-4">
                  <FaLeaf className="text-2xl text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  New Customer?
                </h2>
                <p className="text-gray-600 mb-6">
                  Join our community and enjoy exclusive benefits
                </p>
              </div>

              <Link
                href="/signup"
                className="inline-block w-full bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-center"
              >
                Create Account
              </Link>

              <div className="mt-4 text-green-700 text-sm">
                ✓ Exclusive member discounts
                <br />
                ✓ Order history & tracking
                <br />✓ Personalized recommendations
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Image - Better Layout */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="relative group">
            <Image
              src="/herbal-product.jpg"
              alt="Natural herbal products"
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent rounded-2xl"></div>
          </div>
          <div className="relative group">
            <Image
              src="/herbal.avif"
              alt="Organic wellness"
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-lime-600/20 to-transparent rounded-2xl"></div>
          </div>
          <div className="relative group">
            <Image
              src="/herbal-product.jpg"
              alt="Premium herbs"
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
