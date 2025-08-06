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
  FaUserPlus,
  FaStar,
  FaGift,
} from "react-icons/fa";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    setIsLoading(true);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      alert("Account created! Please log in.");
      router.push("/login");
    } else {
      const data = await res.json();
      alert(data.error || "Signup failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Pane */}
          <div className="lg:w-1/2 bg-gradient-to-br from-emerald-600 to-green-600 p-8 lg:p-12 text-white flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 to-green-600/90"></div>
            <div className="relative z-10 text-center">
              <div className="mb-8">
                <Image
                  src="/herbal.avif"
                  alt="Herbal products"
                  width={300}
                  height={300}
                  className="rounded-2xl shadow-2xl mx-auto"
                />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Join Our Natural Community
              </h2>
              <p className="text-emerald-100 text-lg mb-6">
                Create your account to start your wellness journey with our
                premium herbal products.
              </p>

              {/* Benefits List */}
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <FaGift className="text-emerald-200" />
                  <span className="text-emerald-100">
                    Premium natural products
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaStar className="text-emerald-200" />
                  <span className="text-emerald-100">
                    Expert wellness guidance
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUserPlus className="text-emerald-200" />
                  <span className="text-emerald-100">
                    Exclusive member discounts
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-full"></div>
          </div>

          {/* Right Pane */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl">
                  <FaLeaf className="text-white text-2xl" />
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  HERBAL STORE
                </h1>
              </div>
            </div>

            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>

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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white"
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
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Create Account Button */}
              <button
                onClick={handleSignup}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>

              {/* Google Sign Up */}
              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-200 border border-gray-300 hover:border-gray-400 flex items-center justify-center space-x-3 shadow-sm hover:shadow-md"
              >
                <Image src="/google.png" alt="Google" width={20} height={20} />
                <span>Sign up with Google</span>
              </button>

              {/* Sign In Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
