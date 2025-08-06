"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { FaLeaf, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-3 text-2xl font-black text-green-600 hover:text-green-700 transition-colors group"
            >
              <div className="p-2 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                <FaLeaf className="text-2xl text-green-600" />
              </div>
              <span className="bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">
                HerbalStore
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-emerald-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-emerald-50"
              >
                Products
              </Link>
              <Link
                href="/orders"
                className="text-gray-700 hover:text-emerald-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-emerald-50"
              >
                Orders
              </Link>
              <Link
                href="/cart"
                className="text-gray-700 hover:text-emerald-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-emerald-50 flex items-center space-x-2"
              >
                <FaShoppingCart />
                <span>Cart</span>
              </Link>
              <Link
                href="/faq"
                className="text-gray-700 hover:text-emerald-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-emerald-50"
              >
                FAQ
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-emerald-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-emerald-50"
              >
                About Us
              </Link>

              {session ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 text-sm font-medium bg-gray-100 px-3 py-2 rounded-lg">
                    Welcome, {session.user?.name || session.user?.email}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-emerald-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-emerald-50"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="relative p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {isMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-lg z-50">
            <div className="px-4 pt-4 pb-6 space-y-3 bg-gradient-to-b from-white to-emerald-50/30">
              <Link
                href="/dashboard"
                className="block px-4 py-3 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 font-medium transition-all duration-200 border border-transparent hover:border-emerald-200 hover:shadow-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/orders"
                className="block px-4 py-3 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 font-medium transition-all duration-200 border border-transparent hover:border-emerald-200 hover:shadow-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Orders
              </Link>
              <Link
                href="/cart"
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 font-medium transition-all duration-200 border border-transparent hover:border-emerald-200 hover:shadow-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaShoppingCart />
                <span>Cart</span>
              </Link>
              <Link
                href="/faq"
                className="block px-4 py-3 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 font-medium transition-all duration-200 border border-transparent hover:border-emerald-200 hover:shadow-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/about"
                className="block px-4 py-3 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 font-medium transition-all duration-200 border border-transparent hover:border-emerald-200 hover:shadow-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>

              {session ? (
                <div className="space-y-3 pt-3 border-t border-emerald-100">
                  <div className="px-4 py-2 text-emerald-700 text-sm font-medium bg-emerald-50 rounded-lg">
                    Welcome, {session.user?.name || session.user?.email}
                  </div>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-3 border-t border-emerald-100">
                  <Link
                    href="/login"
                    className="block px-4 py-3 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 font-medium transition-all duration-200 border border-transparent hover:border-emerald-200 hover:shadow-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
