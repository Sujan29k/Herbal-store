import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

export default function FooterMain() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Brand Section */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            <Image
              src="/jadimart.png"
              alt="Jadimart Logo"
              width={200}
              height={60}
              className="h-14 w-auto"
            />
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Your trusted source for natural herbal products and traditional
            remedies from Jadimart. Promoting wellness through nature&apos;s
            finest ingredients.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Facebook"
              className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-110"
            >
              <FaFacebook className="text-xl" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="p-3 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-110"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-400 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-110"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="p-3 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-110"
            >
              <FaWhatsapp className="text-xl" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 hover:pl-2"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 hover:pl-2"
              >
                Our Products
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 hover:pl-2"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 hover:pl-2"
              >
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-6">Support</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 hover:pl-2"
              >
                Customer Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 hover:pl-2"
              >
                Shipping Info
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 hover:pl-2"
              >
                Returns
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 hover:pl-2"
              >
                Feedback Form
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Info</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
              <p className="font-semibold text-emerald-700 mb-1">Location</p>
              <p className="text-gray-600 text-sm">Kalikanagar, Butwal</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
              <p className="font-semibold text-emerald-700 mb-1">Phone</p>
              <p className="text-gray-600 text-sm">061-470457, 470463</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
              <p className="font-semibold text-emerald-700 mb-1">Email</p>
              <p className="text-gray-600 text-sm">pramod123abcdz@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
