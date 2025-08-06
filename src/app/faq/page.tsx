"use client";
import React, { useState } from "react";
import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaLeaf } from "react-icons/fa";

const faqs = [
  {
    question: "What is HerbalStore?",
    answer:
      "HerbalStore is your trusted source for premium herbal products, offering a curated selection of natural remedies and wellness essentials.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Simply browse our products, add your favorites to the cart, and proceed to checkout. You can order as a guest or create an account for order tracking.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit/debit cards and digital wallets. Your payment information is securely processed.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our support team via the Contact page or email us at support@herbalstore.com. We’re here to help!",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-16 px-4 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-green-200/30 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-lime-200/30 rounded-full blur-3xl -z-10" />

      {/* Hero Section */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <span className="p-4 bg-gradient-to-r from-green-400 to-lime-500 rounded-full shadow-lg">
            <FaQuestionCircle className="text-white text-4xl" />
          </span>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Find answers to common questions about our products, ordering process, and more.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-green-100 pb-4 last:border-b-0">
            <button
              className="w-full flex items-center justify-between text-left focus:outline-none"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <div className="flex items-center space-x-3">
                <FaLeaf className="text-green-500 text-lg" />
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
              </div>
              {openIndex === idx ? (
                <FaChevronUp className="text-green-500 text-xl" />
              ) : (
                <FaChevronDown className="text-green-500 text-xl" />
              )}
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === idx ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-700 text-base pl-8 pr-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;