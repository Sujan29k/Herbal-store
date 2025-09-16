"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo - Give it more space */}
          <div className="flex items-center flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-90 transition-opacity group"
            >
              <Image
                src="/jadimart.png"
                alt="Jadimart Logo"
                width={280}
                height={84}
                className="h-20 w-auto"
                priority
              />
            </Link>
          </div>
          {/* Desktop Navigation - Organized in sections */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Main Navigation Links */}
            <div className="flex items-center space-x-2">
              <Link
                href="/dash"
                className="text-gray-700 hover:text-emerald-600 px-5 py-3 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-emerald-50 hover:shadow-sm"
              >
                Products
              </Link>
              <Link
                href="/orders"
                className="text-gray-700 hover:text-emerald-600 px-5 py-3 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-emerald-50 hover:shadow-sm"
              >
                Orders
              </Link>
              <Link
                href="/cart"
                className="text-gray-700 hover:text-emerald-600 px-5 py-3 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-emerald-50 hover:shadow-sm flex items-center space-x-2"
              >
                <FaShoppingCart className="text-base" />
                <span>Cart</span>
              </Link>
              <Link
                href="/faq"
                className="text-gray-700 hover:text-emerald-600 px-5 py-3 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-emerald-50 hover:shadow-sm"
              >
                FAQ
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-emerald-600 px-5 py-3 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-emerald-50 hover:shadow-sm"
              >
                About
              </Link>
            </div>

            {/* Admin Panel - Separate section */}
            {session && (session.user as any)?.role === "admin" && (
              <div className="border-l border-gray-200 pl-6">
                <Link
                  href="/admin/dashboard"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-5 py-3 rounded-xl text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
                >
                  <span className="text-lg">⚙️</span>
                  <span>Admin Panel</span>
                </Link>
              </div>
            )}

            {/* User Section */}
            <div className="border-l border-gray-200 pl-6">
              {session ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-base font-semibold text-gray-700">
                      {session.user?.name || session.user?.email}
                    </div>
                    {(session.user as any)?.role === "admin" && (
                      <div className="text-sm text-amber-600 font-semibold">
                        Administrator
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-5 py-3 rounded-xl text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-emerald-600 px-5 py-3 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-emerald-50 hover:shadow-sm"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-5 py-3 rounded-xl text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
          {/* Medium Screen Navigation - Compact version */}
          <div className="hidden md:flex lg:hidden items-center space-x-4">
            <Link
              href="/dash"
              className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-emerald-50"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="text-gray-700 hover:text-emerald-600 p-3 rounded-lg transition-all duration-200 hover:bg-emerald-50"
            >
              <FaShoppingCart className="text-lg" />
            </Link>

            {session && (session.user as any)?.role === "admin" && (
              <Link
                href="/admin/dashboard"
                className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm font-semibold"
              >
                ⚙️ Admin
              </Link>
            )}

            {session ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 max-w-32 truncate">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-emerald-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-emerald-50"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>{" "}
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
              {/* Main Navigation */}
              <div className="space-y-2">
                <Link
                  href="/dash"
                  className="block px-6 py-4 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 font-semibold text-base transition-all duration-200 border border-transparent hover:border-emerald-200 hover:shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/orders"
                  className="block px-6 py-4 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 font-semibold text-base transition-all duration-200 border border-transparent hover:border-emerald-200 hover:shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center space-x-3 px-6 py-4 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 font-semibold text-base transition-all duration-200 border border-transparent hover:border-emerald-200 hover:shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaShoppingCart className="text-lg" />
                  <span>Cart</span>
                </Link>
                <Link
                  href="/faq"
                  className="block px-6 py-4 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 font-semibold text-base transition-all duration-200 border border-transparent hover:border-emerald-200 hover:shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="/about"
                  className="block px-6 py-4 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 font-semibold text-base transition-all duration-200 border border-transparent hover:border-emerald-200 hover:shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </div>

              {/* Admin Panel - Separate section */}
              {session && (session.user as any)?.role === "admin" && (
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center space-x-3 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg">⚙️</span>
                    <span>Admin Panel</span>
                  </Link>
                </div>
              )}

              {/* User Section */}
              {session ? (
                <div className="space-y-3 pt-4 border-t border-emerald-100">
                  <div className="px-6 py-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="text-emerald-700 text-base font-semibold">
                      {session.user?.name || session.user?.email}
                    </div>
                    {(session.user as any)?.role === "admin" && (
                      <div className="text-sm text-amber-600 font-semibold mt-1">
                        Administrator
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-4 border-t border-emerald-100">
                  <Link
                    href="/login"
                    className="block px-6 py-4 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 font-semibold text-base transition-all duration-200 border border-transparent hover:border-emerald-200 hover:shadow-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg"
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
